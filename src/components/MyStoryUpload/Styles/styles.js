import { Dimensions, StyleSheet } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        // backgroundColor: '#000',
    },
    centeredContainer: {
        flex: 1,
        paddingTop: 30,
        //justifyContent: 'center',
        // alignItems: 'center',
    },
    myStoryBackGround: {
        flex: 1,
        padding: 20,
        // justifyContent: 'center',
        //alignItems: 'center',
        width: ScreenWidth,
    },
    heading: {
        fontSize: 22,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 20,
    },
    pickBox: {
        alignItems: 'center',
        width: ScreenWidth - 40,
        backgroundColor: '#111',
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 20
    },
    icon: {
        width: 40,
        height: 40,
        tintColor: '#ccc',
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        color: '#ccc',
    },
    topToolbar: {
        position: 'absolute',
        top: 40,
        left: 15,
        right: 15,
        zIndex: 10,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    toolbarRight: {
        flexDirection: 'row',
        gap: 12,
    },
    iconText: {
        fontSize: 22,
        color: '#fff',
        marginHorizontal: 6,
    },
    mediaContainer: {
        flex: 1,
    },
    fullMedia: {
        width: '100%',
        height: '100%',
    },
    bottomOverlay: {
        position: 'absolute',
        bottom: 60,
        left: 15,
        right: 70,
        flexDirection: 'row',
        alignItems: 'center',
    },
    captionInputOverlay: {
        flex: 1,
        height: 45,
        backgroundColor: '#000000aa',
        borderRadius: 12,
        paddingHorizontal: 15,
        color: '#fff',
    },
    postFAB: {
        position: 'absolute',
        right: -55,
        height: 45,
        width: 45,
        borderRadius: 30,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
    },
    swipeHint: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        fontSize: 12,
        color: '#aaa',
    },
    //     pickBox: {
    //   borderWidth: 1,
    //   borderColor: '#ccc',
    //   borderRadius: 10,
    //   padding: 20,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    // icon: {
    //   width: 40,
    //   height: 40,
    //   tintColor: '#888',
    // },
    // label: {
    //   marginTop: 8,
    //   color: '#444',
    //   fontSize: 14,
    // },
    mediaList: {
        width: ScreenWidth - 40,
        height: '85%',
        borderRadius: 10,
        borderWidth: 0,

    },
    totalText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    totalWrap: {
        paddingTop: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    singleDeletBtnWrap: {
        width: 30,
        height: 30,
        backgroundColor: '#000',
        borderRadius: 20,
        justifyContent: "center",
        alignSelf: 'flex-end',
        marginBottom: -30,
        zIndex: 100,
    },
    singleDeletBtn: {
        color: '#fff',
        textAlign: "center"
    },
    //      topContainer:{
    //     height:ScreenHeight/10 + 30,
    //     backgroundColor:'red'
    //   },
});

export default styles;
