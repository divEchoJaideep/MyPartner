import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    paddingTop: '23rem',
    paddingHorizontal: '20rem',
  },
  bookHistoryContainer: {
    paddingBottom: '100rem',
    paddingTop: 0,
  },
  bookActiveContainer: {
    paddingTop: 0,
  },
  categoryPropartyImgStyle: {
    width: '95rem',
    height: '95rem',
  },
  categoryRightContentStyle: {
    width: '100% - 177rem',
  },
  indicatorStyle: {
    height: '1rem',
    backgroundColor: Colors.pink,
    borderRadius: '1rem',
  },
  tabBarStyle: {
    backgroundColor: Colors.transparent,
    marginHorizontal: '20rem',
    elevation: 0,
  },
  labelStyle: {
    color: Colors.darkGray,
    textTransform: 'capitalize',
    margin: 0,
    textAlign: 'center',
    ...Fonts.style.buttonText,
    fontSize: Fonts.size.medium,
  },
  tabStyle: {
    padding: 0,
  },
  tabViewStyle: {
    flex: 1,
    width: '100%',
  },
  amountTransactionIdRow: {
    paddingBottom: '23rem',
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
    marginHorizontal: '-20rem',
    paddingHorizontal: '20rem',
  },
  amountText: {
    lineHeight: '21rem',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: '8rem',
    ...Fonts.style.normalText,
    fontSize: Fonts.size.medium,
  },
  transactionIdText: {
    lineHeight: '18rem',
    color: Colors.darkGray,
    textAlign: 'center',
    fontSize: Fonts.size.tiny,
    ...Fonts.style.textInputText,
  },
  paymentOptionList: {
    paddingTop: '33rem',
  },
  paymentPrivacyPolicyText: {
    color: Colors.darkGray,
    lineHeight: '18rem',
    textAlign: 'center',
    marginTop: '13rem',
    fontSize: Fonts.size.tiny,
    ...Fonts.style.textInputText,
    marginBottom: '15rem',
  },
  paymentPrivacyPolicyLinkText: {
    color: Colors.pink,
    fontSize: Fonts.size.tiny,
    ...Fonts.style.buttonText,
  },
  paymentCardTypeImgs: {
    marginTop: '19rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '-17rem',
  },
  paymentCardTypeImg: {
    marginHorizontal: '17rem',
  },
  paymentCardVisaImg: {
    width: '42.08rem',
    height: '13.65rem',
  },
  paymentCardMasterImg: {
    width: '25.45rem',
    height: '20rem',
  },
  paymentCardRentalImg: {
    width: '25.89rem',
    height: '25rem',
  },
});

export default styles;
