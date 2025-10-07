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
import { Images } from '../../theme';
import styles from './Styles/styles';
import { useSelector } from 'react-redux';
import ImagesUpload from '../../api/imagesUpload';
import PostStatusUpload from '../../api/PostStatusUpload';
import GetMyStatus from '../../api/GetMyStatus';
import { useFocusEffect } from '@react-navigation/native';
import DeleteMyStatus from '../../api/DeleteMyStory';
import Toast from 'react-native-toast-message';

const MyStoryUpload = ({ source = [], onChange }) => {
    const token = useSelector(state => state.auth.token);

    const [mediaList, setMediaList] = React.useState([]);
    const [uploadedMedia, setUploadedMedia] = React.useState([]);
    const [storyList, setStoryList] = React.useState([]);
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

            const files = await ImagePicker.openPicker({
                mediaType: 'any',
                multiple: true,
            });

            if (files.length > remainingSlots) {
                Toast.show({
                    type: 'error',
                    text1: 'Limit Exceeded',
                    text2: `You can only add ${remainingSlots} more item(s).`,
                });
            }

            const newItems = files.slice(0, remainingSlots);
            const updatedList = [...mediaList, ...newItems];
            setMediaList(updatedList);

            const formattedItems = newItems.map(file => ({
                uri: file.path,
                name: file.filename || 'story_upload',
                type: file.mime,
                caption: '',
            }));

            // Start Loading while uploading
            setLoading(true);

            const uploadedPaths = [];

            for (let item of formattedItems) {
                const result = await ImagesUpload({
                    token,
                    uploadImage: {
                        uri: item.uri,
                        name: item.name,
                        type: item.type,
                    },
                });

                if (result?.data?.path) {
                    uploadedPaths.push(result.data.path);
                }
            }

            setUploadedMedia(prev => [...prev, ...uploadedPaths]);
            onChange?.(formattedItems);
        } catch (error) {
            // console.log('Media picking/upload error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePostStatus = async () => {
        try {
            if (mediaList.length === 0) {
                Alert.alert('No media selected', 'Please add at least one image or video.');
                return;
            }

            setLoading(true);

            const formattedMedia = mediaList.map((file, index) => ({
                uri: file.path,
                name: file.filename || `story_upload_${index}`,
                type: file.mime,
            }));

            const response = await PostStatusUpload({
                token,
                mediaList: formattedMedia,
            });

            if (response?.success) {
                Toast.show({
                    type: 'success',
                    text1: 'Status Posted',
                    text2: response.message || 'Status posted successfully.',
                });
                setMediaList([]);
                setUploadedMedia([]);
                fetchStories();
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: response?.message || 'Something went wrong',
                });
            }
        } catch (error) {
            // console.log('PostStatusUpload error:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeMedia = index => {
        const updatedList = mediaList.filter((_, i) => i !== index);
        const updatedUploads = uploadedMedia.filter((_, i) => i !== index);
        setMediaList(updatedList);
        setUploadedMedia(updatedUploads);
        onChange?.(
            updatedList.map(file => ({
                uri: file.path,
                name: file.filename || 'story_upload',
                type: file.mime,
                caption: '',
            }))
        );
    };

    const removeAllMedia = () => {
        setMediaList([]);
        setUploadedMedia([]);
        onChange?.([]);
    };

    const fetchStories = async () => {
        setLoading(true);
        const response = await GetMyStatus(token);
        if (response?.success && Array.isArray(response.data)) {
            setStoryList(response.data);
        }
        setLoading(false);
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchStories();
            return () => { };
        }, [])
    );

    const handleDeleteStory = async id => {
        Alert.alert('Confirm', 'Delete this story?', [
            { text: 'Cancel' },
            {
                text: 'Delete',
                onPress: async () => {
                    try {
                        setLoading(true);
                        const response = await DeleteMyStatus(id, token);
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
                        // console.log('DeleteMyStatus failed:', error);
                    } finally {
                        setLoading(false);
                    }
                },
            },
        ]);
    };

    const combinedList = [
        ...storyList.map(item => ({ ...item, type: 'uploaded' })),
        ...mediaList.map((item, index) => ({
            ...item,
            id: `media_${index}`,
            path: item.path,
            mime: item.mime,
            type: 'selected',
        })),
    ];

    const renderItem = ({ item, index }) => {
        const isVideo = item.mime?.startsWith?.('video');

        return (
            <View style={{ marginRight: 10 }}>
                <TouchableOpacity
                    onPress={() => handleDeleteStory(item.id)}
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
                        resizeMode="cover"
                    />
                )}
            </View>
        );
    };

    return (
        <View style={styles.fullScreenContainer}>
            {loading && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        zIndex: 10,
                    }}>
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
                <Text style={styles.totalText}>
                    Total Status : {combinedList.length}
                </Text>
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
                    keyExtractor={(item, index) => `${item.id || item.path}_${index}`}
                    renderItem={renderItem}
                    style={{ marginTop: 20, marginLeft: 20 }}
                    showsHorizontalScrollIndicator={false}
                />
            )}
        </View>
    );
};

export default MyStoryUpload;
