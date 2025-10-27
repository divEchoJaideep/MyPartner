import { StyleSheet, Dimensions } from 'react-native';
import {Colors, Fonts} from '../../../theme';


const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  bottomContainer:{
    paddingHorizontal: 20,
    
  },
  ChatBTNWrap:{
    // backgroundColor:"#aaa",
    zIndex:99,
    position:"absolute",
    bottom:20,
    padding:20,
    borderRadius:60,
    justifyContent:"center",
    alignSelf:'flex-end',
    marginRight:20,
  },
  ChatBTN:{
    width:40,
    height:40,

  },
  imageWrapper: {
    alignItems: 'center',
    width:width,
    // marginBottom: -20,
  },
  profileImage: {
    marginHorizontal:-20,
    width: width   ,
    height: height * 0.5,
    borderRadius: 5,
    borderWidth: 0,
    borderColor: Colors.primary || '#ff6b81',
  },

  nameText: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 10,
    color: Colors.black,
  },
  subText: {
    fontSize: 16,
    color: Colors.gray,
    marginTop: 4,
  },
  infoBox: {
    backgroundColor: Colors.white,
    width: '100%',
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {

    fontSize: 16,
    color: Colors.black,
    marginBottom: 6,
    // textAlign:'left',
  },
  card:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  CardLableWrap:{
    width:'40%',
    alignItems:'flex-start',
  },
  CardTextWrap:{
    width:'60%',
    alignItems:'flex-end',
  },
});

