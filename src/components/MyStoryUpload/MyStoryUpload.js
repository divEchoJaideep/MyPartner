import * as React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    Dimensions,
    FlatList,
    Alert,
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

const MyStoryUpload = ({ source = [], onChange }) => {
    const token = useSelector((state) => state.auth.user.access_token);

    const [mediaList, setMediaList] = React.useState([]);
    const [uploadedMedia, setUploadedMedia] = React.useState([]);
    const [storyList, setStoryList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const pickMedia = async () => {
        try {
            const totalUsed = storyList.length + mediaList.length;
            const remainingSlots = 6 - totalUsed;

            if (remainingSlots <= 0) {
                Alert.alert('Limit Exceeded', 'You can only add up to 6 items total.');
                return;
            }

            const files = await ImagePicker.openPicker({
                mediaType: 'any',
                multiple: true,
            });

            if (files.length > remainingSlots) {
                Alert.alert('Limit Exceeded', `You can only add ${remainingSlots} more item(s).`);
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
            console.error('Media picking/upload error:', error);
        }
    };

    const handlePostStatus = async () => {
        try {
            if (mediaList.length === 0) {
                Alert.alert('No media selected', 'Please add at least one image or video.');
                return;
            }

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
                Alert.alert('Success', 'Status posted successfully!');
                removeAllMedia();
                fetchStories();
            } else {
                Alert.alert('Failed', response?.message || 'Failed to post status');
            }
        } catch (error) {
            console.error('Status post error:', error);
            Alert.alert('Error', 'Something went wrong while posting status.');
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
        } else {
            console.log('Error loading stories:', response.message);
        }
        setLoading(false);
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchStories();
            return () => { };
        }, [])
    );

    const handleDeleteStory = async (id) => {
        console.log('Deleting story with ID:', id);
        console.log('Using token:', token);

        Alert.alert('Confirm', 'Delete this story?', [
            { text: 'Cancel' },
            {
                text: 'Delete',
                onPress: async () => {
                    try {
                        const response = await DeleteMyStatus(id, token);
                        console.log('DeleteMyStatus response:', response);

                        if (response?.success) {
                            Alert.alert('Deleted', 'Status deleted successfully');
                            fetchStories();
                        } else {
                            Alert.alert('Error', response?.message || 'Failed to delete');
                        }
                    } catch (error) {
                        console.error('DeleteMyStatus failed:', error);
                        Alert.alert('Error', 'Something went wrong while deleting the story.');
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
                    onPress={() =>
                        //item.type === 'uploaded'
                        handleDeleteStory(item.id)
                        // : removeMedia(index - storyList.length)
                    }
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
                <View>

                    <Text style={styles.totalText}>
                        Total Status : {combinedList.length}
                    </Text>
                </View>
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
                    pagingEnabled
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
