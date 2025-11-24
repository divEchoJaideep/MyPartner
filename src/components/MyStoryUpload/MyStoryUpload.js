import * as React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    Dimensions,
    FlatList,
    Alert,
    ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import { Colors, Images } from '../../theme';
import styles from './Styles/styles';
import { useSelector } from 'react-redux';
import GetMyStatus from '../../api/GetMyStatus';
import DeleteMyStatus from '../../api/DeleteMyStory';
import Toast from 'react-native-toast-message';
import { postStatus } from '../../api/api';

const MyStoryUpload = ({ source = [], onChange }) => {
    const token = useSelector(state => state.auth.token);

    const [mediaList, setMediaList] = React.useState([]);
    const [storyList, setStoryList] = React.useState([]);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    const pickMedia = async () => {
        try {
            const totalUsed = storyList.length + mediaList.length;
            const remainingSlots = 6 - totalUsed;

            if (remainingSlots <= 0) {
                Toast.show({
                    type: 'error',
                    text1: 'Limit Exceeded',
                    text2: 'You can only add up to 6 items total.',
                });
                return;
            }

            let files = await ImagePicker.openPicker({
                mediaType: 'any',
                cropping: true,
                compressImageQuality: 0.8,
            });

            if (!Array.isArray(files)) files = [files];
            const limitedFiles = files.slice(0, remainingSlots);

            const formattedItems = limitedFiles.map(file => ({
                uri: file.path,
                name: file.filename || 'story_upload',
                type: file.mime,
                caption: '',
            }));

            setMediaList(prev => {
                const newList = [...prev, ...formattedItems];
                onChange?.(newList);
                return newList;
            });
        } catch (error) {
            console.log('❌ pickMedia error:', error);
        }
    };

    const handlePostStatus = async () => {
        if (mediaList.length === 0) {
            Alert.alert('No media selected', 'Please add at least one image or video.');
            return;
        }

        setLoading(true);

        try {
            for (let i = 0; i < mediaList.length; i++) {
                const file = mediaList[i];

                const formData = new FormData();
                formData.append('gallery_images[]', {
                    uri: file.uri,
                    name: file.name || `story_upload_${i}`,
                    type: file.type,
                });

                const headers = `Bearer ${token}`;
                const response = await postStatus(formData, headers);

                if (response?.success) {
                    Toast.show({
                        type: 'success',
                        text1: 'Status Posted',
                        text2: `File ${i + 1} uploaded successfully`,
                    });
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Upload Error',
                        text2: response?.message || `File ${i + 1} failed`,
                    });
                }
            }

            setMediaList([]);
            fetchStories();
        } catch (error) {
            console.log('❌ handlePostStatus error:', error);
            Toast.show({
                type: 'error',
                text1: 'Upload Failed',
                text2: 'Something went wrong',
            });
        } finally {
            setLoading(false);
        }
    };

    const removeMedia = index => {
        setMediaList(prev => {
            const updated = prev.filter((_, i) => i !== index);
            onChange?.(updated);
            return updated;
        });
    };

    const removeAllMedia = () => {
        setMediaList([]);
        onChange?.([]);
    };

    const fetchStories = async () => {
        setLoading(true);
        try {
            const response = await GetMyStatus(token);
            if (response?.success && Array.isArray(response.data)) {
                setStoryList(response.data);
            }
        } catch (error) {
            console.log('❌ fetchStories error:', error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchStories();
    }, []);

    const handleDeleteStory = async item => {
        if (item.type === 'selected') {
            removeMedia(mediaList.findIndex(i => i.uri === item.uri));
            return;
        }

        Alert.alert('Confirm', 'Delete this story?', [
            { text: 'Cancel' },
            {
                text: 'Delete',
                onPress: async () => {
                    setLoading(true);
                    try {
                        const response = await DeleteMyStatus(item.id, token);
                        if (response?.success) {
                            Toast.show({
                                type: 'success',
                                text1: 'Status Deleted',
                                text2: response.message || 'Status deleted successfully.',
                            });
                            fetchStories();
                        } else {
                            Toast.show({
                                type: 'error',
                                text1: 'Error',
                                text2: response?.message || 'Something went wrong',
                            });
                        }
                    } catch (error) {
                        console.log('❌ DeleteMyStatus error:', error);
                    } finally {
                        setLoading(false);
                    }
                },
            },
        ]);
    };

    const combinedList = [
        ...storyList.map(item => ({
            ...item,
            type: 'uploaded',
            key: `uploaded_${item.id}`, 
        })),
        ...mediaList.map(item => ({
            ...item,
            type: 'selected',
            key: `selected_${item.uri}`, 
        })),
    ];

    const renderItem = ({ item }) => {
        const isVideo = item.type?.startsWith('video');

        return (
            <View style={styles.listContainer}>
                <TouchableOpacity
                    onPress={() => handleDeleteStory(item)}
                    style={styles.singleDeletBtnWrap}
                >
                    <Text style={styles.singleDeletBtn}>X</Text>
                </TouchableOpacity>

                {isVideo ? (
                    <Video
                        source={{ uri: item.uri || item.path }}
                        style={{ width: 100, height: 130, borderRadius: 8 }}
                        resizeMode="cover"
                    />
                ) : (
                    <Image
                        source={{ uri: item.uri || item.image_url || item.path }}
                        style={styles.mediaList}
                        resizeMode='contain'
                    />
                )}
            </View>
        );
    };

    return (
        <View style={styles.fullScreenContainer}>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={{ color: '#fff', marginTop: 10 }}>Please wait...</Text>
                </View>
            )}

            {storyList.length + mediaList.length < 6 ? (
                <TouchableOpacity onPress={pickMedia} style={styles.pickBox}>
                    <Image source={Images.AddIcon} style={styles.icon} />
                    <Text style={styles.label}>Add to Story</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={removeAllMedia} style={styles.pickBox}>
                    <Text style={styles.label}>Remove All Selected</Text>
                </TouchableOpacity>
            )}

            <View style={styles.totalWrap}>
                <Text style={styles.totalText}>Total Status : {combinedList.length}</Text>
                {mediaList.length > 0 && (
                    <TouchableOpacity
                        onPress={handlePostStatus}
                        style={{ marginRight: 20, alignSelf: 'center' }}
                    >
                        <Text style={{ color: 'blue', fontWeight: 'bold' }}>Send</Text>
                    </TouchableOpacity>
                )}
            </View>

            {combinedList.length > 0 && (
                <FlatList
                    horizontal
                    data={combinedList}
                    keyExtractor={item => item.key}
                    renderItem={renderItem}
                   // style={{ marginTop: 20, marginLeft: 20 }}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20,gap:40 }}
                    pagingEnabled
                    onMomentumScrollEnd={e => {
                        const index = Math.round(
                            e.nativeEvent.contentOffset.x / Dimensions.get('window').width
                        );
                        setCurrentIndex(index);
                    }}
                    getItemLayout={(data, index) => ({
                        length: Dimensions.get('window').width,
                        offset: Dimensions.get('window').width * index,
                        index,
                    })}
                />
            )}

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                {combinedList.map((_, index) => (
                    <View
                        key={index}
                        style={{
                            width: currentIndex === index ? 20 : 8,
                            height: 8,
                            borderRadius: 4,
                            marginHorizontal: 4,
                            marginBottom: 30,
                            backgroundColor: currentIndex === index ? Colors.pink : 'gray',
                        }}
                    />
                ))}
            </View>
        </View>
    );
};

export default MyStoryUpload;
