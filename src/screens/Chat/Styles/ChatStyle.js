import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';
import {isIphoneX} from '../../../libs/Utils';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width

const styles = EStyleSheet.create({
  container: {
  width:screenWidth,
   flex:1,
  },
  searchInputStyle: { 
    width: '100% - 40rem',
    marginBottom: '23rem',
  },
  chatListLink: {
    paddingHorizontal: '20rem',
    paddingTop: '4rem',
    paddingBottom: '14rem',
    marginBottom: '17rem',
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
    flexDirection: 'row',
  },
  chatListUserImg: {
    width: '48rem',
    height: '48rem',
    borderRadius: '12rem',
  },
  chatListLinkText: {
    paddingLeft: '19rem',
  },
  chatListLinkNameText: {
    lineHeight: '21rem',
    color: Colors.black,
    marginBottom: '4rem',
    fontSize: Fonts.size.medium,
    ...Fonts.style.boldText,
  },
  chatListLinkLastSeenText: {
    lineHeight: '18rem',
    color: Colors.darkGray,
    fontSize: Fonts.size.tiny,
    '@media ios': {
      ...Fonts.style.normalText,
    },
    '@media android': {
      ...Fonts.style.normalText,
    },
  },
  pageContent: {
    paddingVertical: '10rem',
    paddingHorizontal: '6rem',
    flex: 1,
    width: '100%',
  },
  chatDetailContent: {
    backgroundColor: Colors.white,
    marginTop: '-10rem',
    borderRadius: '6rem',
    padding: '10rem',
    paddingTop: '6rem',
    marginBottom: '10rem',
  },
  chatDetailText: {
    flexDirection: 'row',
    paddingTop: '4rem',
  },
  msgBg: {
    backgroundColor: Colors.white,
    borderTopStartRadius: '12rem',
    borderTopEndRadius: '12rem',
    borderBottomEndRadius: '12rem',
    borderBottomStartRadius: 0,
    borderWidth: '1rem',
    borderColor: Colors.lightGray,
    overflow: 'hidden',
    maxWidth: '335rem',
    width: '100%',
    padding: '10rem',
  },
  replayMsgBg: {
    backgroundColor: Colors.lighterGray,
    borderLeftWidth: '4rem',
    borderColor: Colors.pink,
    padding: '8rem',
    borderTopLeftRadius: '4rem',
    borderTopEndRadius: '12rem',
    borderBottomLeftRadius: '4rem',
    borderBottomEndRadius: '12rem',
  },
  replayMsgUserName: {
    fontSize: '10rem',
    lineHeight: '15rem',
    color: Colors.pink,
    '@media ios': {
      ...Fonts.style.textInputText,
    },
    '@media android': {
      ...Fonts.style.buttonText,
    },
  },
  replayMsgUserText: {
    lineHeight: '21rem',
    color: Colors.black,
    marginTop: '4rem',
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  messageText: {
    marginVertical: '4rem',
    color: Colors.black,
    lineHeight: '21rem',
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  messageTimeText: {
    fontSize: '10rem',
    lineHeight: '15rem',
    color: Colors.darkerGray,
    ...Fonts.style.normalText,
  },
  msgSeenText: {
    color: Colors.white,
    fontSize: '10rem',
    lineHeight: '15rem',
    paddingRight: '10rem',
    ...Fonts.style.normalText,
  },
  
  chatInputContainerStyle: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: Colors.lightGray,
    marginHorizontal: '15rem',
    marginVertical: '10rem',
    position: 'relative',
    borderRadius: '25rem',
    paddingLeft: '0rem',
    lineHeight: '15rem',
    paddingRight: '80rem',
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  inputBorderView: {
    borderWidth: '1rem',
    borderColor: Colors.lightGray,
    height: '100%',
    position: 'absolute',
    width: '100% - 95rem',
    top: '22rem',
    left: '15rem',
    borderRadius: '25rem',
  },
  chatInputBgContainerStyle: {
    backgroundColor: Colors.white,
    width: '100%',
    paddingTop: '22rem',
     paddingBottom: '20rem',
    borderTopLeftRadius: '40rem',
    borderTopRightRadius: '40rem',
    paddingLeft: '17rem',
    paddingRight: '35rem',
    shadowOffset: {
      width: '1rem',
      height: '1rem',
    },
    shadowOpacity: '1rem',
    shadowRadius: '40rem',
    elevation: '40rem',
    shadowColor: Colors.boxShadowLighterBlack,
  },
  chatSendBtnContainer: {
    width: '40rem',
    height: '40rem',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '-85rem',
    marginLeft: '20rem',
    top: '-3rem',
    borderRadius: '50rem',
  },
  chatSendBtnImg: {
    width: '18rem',
    height: '18rem',
  },
  chatContainer: {
    '@media ios': {
      // marginBottom: isIphoneX() ? '95rem' : '112rem',
    },
    '@media android': {
      marginBottom: 0,
    },
    flex:1,
     width: screenWidth,
  },
  dateRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '5rem',
    marginBottom: '10rem',
  },
  dateRowLins: {
    height: '1rem',
    width: '100%',
    flex: 1,
    backgroundColor: Colors.gray,
  },
  dateRowLeftLine: {
    marginLeft: '20rem',
  },
  dateRowRightLine: {
    marginRight: '20rem',
  },
  dateTextStyle: {
    color: Colors.darkerGray,
    lineHeight: '18rem',
    fontSize: Fonts.size.tiny,
    ...Fonts.style.lightText,
  },
  dateTextContainerStyle: {
    marginTop: 0,
    marginBottom: 0,
    paddingHorizontal: '16rem',
  },
  chatMsgTimeText: {
    fontSize: '10rem',
    lineHeight: '15rem',
    ...Fonts.style.normalText,
  },
  bubbleTextStyle: {
    padding: '10rem',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  textInputStyle: {
    color: Colors.black,
    paddingTop: '8rem',
    ...Fonts.style.normalText,
  },
  unreadDot: {
  backgroundColor: Colors.pink,
  minWidth: 20,
  height: 20,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 8,
  paddingHorizontal: 5,
},
unreadDotText: {
  color: Colors.white,
  fontSize: 12,
  fontWeight: 'bold',
},
blockedContainer:{
  justifyContent:"center",
  alignItems:"center",
},
modalOverlay: {
  position: 'absolute',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContainer: {
  width: '80%',
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 20,
  alignItems: 'center',
},
modalTitle: {
  fontSize: 18,
  fontWeight: '600',
  marginBottom: 20,
  color: Colors.black,
},
modalBtn: {
  width: '100%',
  paddingVertical: 12,
  marginVertical: 6,
  backgroundColor: Colors.lightGray,
  borderRadius: 8,
  alignItems: 'center',
},
modalBtnText: {
  fontSize: 16,
  color: Colors.black,
},
cancelBtn: {
  backgroundColor: Colors.white,
  borderWidth: 1,
  borderColor: Colors.red,
},

});

export default styles;
