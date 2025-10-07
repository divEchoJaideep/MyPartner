import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get("screen");

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: '20rem',
    flex:1
    
  },
  profileEditContent: {
    backgroundColor: Colors.lightWhite,
    borderRadius: '12rem',
    paddingVertical: '13rem',
    paddingLeft: '15rem',
    paddingRight: '22rem',
    marginBottom: '13rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContent: {
    width: '44rem',
    height: '44rem',
    backgroundColor: '#FDE7E7',
    borderRadius: '40rem',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: '40rem',
  },
  userNameEmailText: {
    paddingLeft: '12rem',
    width:'85%',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  userNameText: {
    color: Colors.darkGray,
    lineHeight: '24rem',
    fontSize: Fonts.size.regular,
    '@media ios': {
      ...Fonts.style.textInputText,
    },
    '@media android': {
      ...Fonts.style.buttonText,
    },
  },
  userEmailText: {
    color: Colors.pink,
    lineHeight: '18rem',
    fontSize: Fonts.size.tiny,
    ...Fonts.style.normalText,
  },
  userEditIcon: {
    marginLeft: 'auto',
  },
  userEditImage: {
    marginVertical:'auto',
    width: '15rem',
    height: '15rem',
  },
  profileLinkList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '15rem',
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
  },
  
  profileLinkText: {
    lineHeight: '21rem',
    color: Colors.black,
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  profileLinkImg: {
    marginLeft: 'auto',
    width: '14rem',
    height: '14rem',
  },
  profileLinkListContent: {
    paddingHorizontal: '20rem',
  },
  // profileText: {
  //   fontSize: Fonts.size.h2,
  //   fontWeight: 'bold',
  //   color: 'black',
  //   alignSelf: 'center',
  // },
  bigText: {
    fontSize: Fonts.size.h2,
    color: Colors.black,
    alignSelf: 'center',
  },
  inputView: {
    marginVertical: '20rem',
  },
  twoBtnStyle:{
    width: (width - 60) / 2,
    backgroundColor: Colors.pink,
  },
  btnBg:{
    backgroundColor: Colors.black,
  },
  btnStyle: {
    // marginVertical: 'auto',
    backgroundColor:Colors.pink
  },
  commanBtnTextStyle:{
    color:Colors.white
  },
  commanText: {
    marginHorizontal: 37,
  },
  // interest Style
  bigTextView: {
    marginVertical: '30rem',
  },
 
  btnView: {
    // marginVertical: 'auto',
    marginHorizontal: '30rem',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '20rem',
    paddingTop: '40rem',
    paddingBottom: '20rem',
  },
  backButton: {
    padding: '10rem',
  },

  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '20rem',
  },
  optionButton: {
    padding: '10rem',
    margin: '10rem',
    borderWidth: '1rem',
    borderColor: Colors.pink,
    borderRadius: 10,
  },
  selectedOption: {
    backgroundColor: Colors.pink,
    color: Colors.white,
  },
  optionButtonText: {
    fontSize: Fonts.size.h4,
    color: Colors.black,
  },
  commanTextstyle:{
    marginTop:10
  },
  birthdayText: {
    textAlign: 'left',
  },
  addEducationText: {
    fontSize: Fonts.size.h3,
    color: Colors.black,
    textAlign: 'left',
    marginVertical: '10rem',
    marginHorizontal: '10rem',
  },
  inputStyle: {
    marginTop: '10rem',
    // height: '50rem',
    // width: '155rem',
  },
  hobbiesView: {
    flexDirection: 'row',
  },
  physicalInputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  physicalInputInnerView: {
    marginLeft: '10rem',
  },
  physicalInputStyle: {
    marginTop: '10rem',
    height: '50rem',
    width: '155rem',
  },
  detailBigText: {
    textAlign: 'left',
    fontSize: Fonts.size.h4,
    marginVertical: '5rem',
  },
  detailsViewContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: '20rem',
  },
  detailsView: {
    // flex: 1,
    width: '100%',
    // height: '100%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: '20rem',
    borderTopRightRadius: '20rem',
    //paddingTop: '80rem',
    // marginTop: -20,
  },
  detailsText: {
    textAlign: 'left',
    marginVertical: '2rem',
  },
  profileImg: {
    width: '100%',
    height: '410rem',
    resizeMode: 'cover',
  },
  bottomBtnView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: '330rem',
    position: 'absolute',
    alignItems: 'center',
  },
  bottomBtnTouch: {
    width: '70rem',
    height: '70rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '30rem',
    backgroundColor: Colors.white,
    borderWidth: '1rem',
    borderColor: Colors.lightGray,
  },
  bottomBtnImg: {
    width: '50rem',
    height: '50rem',
  },
  bottomBtnCenterTouch: {
    width: '90rem',
    height: '90rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '30rem',
    backgroundColor: Colors.white,
    borderWidth: '1rem',
    borderColor: Colors.lightGray,
  },
  detailsBigTextView: {
    flexDirection: 'row',
  },
  detailsTextView: {
    padding: '10rem',
    backgroundColor: '#f2f2f2',
    borderRadius: '5rem',
    marginRight: '10rem',
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50rem',
    width: '120rem',
    marginBottom: '5rem',
  },
  itemContainer: {
    marginVertical: '10rem',
    marginHorizontal: '5rem',
  },
  button: {
    padding: '10rem',
    borderRadius: '5rem',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '100rem',
    minHeight: '50rem',
  },
  openButton: {
    backgroundColor: 'lightblue',
  },
  closedButton: {
    backgroundColor: 'lightgrey',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  verticalContent: {
    marginTop: '10rem',
    padding: '10rem',
    backgroundColor: '#f0f0f0',
    borderRadius: '5rem',
  },
  contentText: {
    marginVertical: '5rem',
  },
  backIcon: {
    width: '30rem',
    height: '30rem',
  },
  // tableContainer: {
  //   // flex: 1,
  //   backgroundColor: Colors.white,
  //   borderRadius: '12rem',
  //   paddingVertical: '10rem',
  //   paddingHorizontal: '22rem',
  //   color: Colors.black,
  //   marginBottom: '20rem',
  //   // height: '40rem',
  // },
  // header: {
  //   flexDirection: 'row',
  //   backgroundColor: '#f1f1f1',
  //   paddingVertical: '10rem',
  //   borderBottomWidth: '1rem',
  //   borderBottomColor: '#ccc',
  // },
  // row: {
  //   flexDirection: 'row',
  //   paddingVertical: '10rem',
  //   borderBottomWidth: '1rem',
  //   borderBottomColor: '#eee',
  //   paddingLeft: '60rem',
  // },
  // cell: {
  //   flex: '1rem',
  //   textAlign: 'left',
  //   paddingHorizontal: '5rem',
  //   paddingVertical: '10rem',
  // },
  // side: {
  // flexDirection: 'row',
  //   backgroundColor: '#f1f1f1',
  //   paddingVertical: '10rem',
  //   borderBottomWidth: '1rem',
  //   borderBottomColor: '#ccc',
  // },
  sibilingInput: {
    width: '20rem',
    height: '20rem',
  },
  indiaTextStyle: {
    backgroundColor: Colors.white,
    borderRadius: '12rem',
    paddingVertical: '10rem',
    paddingHorizontal: '22rem',
    color: Colors.black,
    marginBottom: '20rem',
    height: '40rem',
    textAlign: 'left',
    marginTop: '5rem',
    fontSize: Fonts.size.medium,
    '@media ios': {
      ...Fonts.style.normalText,
    },
    '@media android': {
      ...Fonts.style.textInputText,
    },
  },
  //family info sibling table
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    paddingLeft: '10rem',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
  cellHeader: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
  cellInput: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default styles;