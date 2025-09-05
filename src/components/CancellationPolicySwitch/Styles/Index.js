import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  cancellationPolicyHeading: {
    marginBottom: 0,
  },
  cancellationPolicyHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '33rem',
    paddingBottom: '23rem',
  },
  cancellationPolicySwitchBtn: {
    marginLeft: 'auto',
    height: '10rem',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cancellationPolicySwitchLine: {
    width: '15rem',
    height: '2rem',
    backgroundColor: Colors.darkGray,
    borderRadius: '2rem',
  },
  cancellationPolicySwitchLineActive: {
    width: '15rem',
    height: '2rem',
    backgroundColor: Colors.pink,
    borderRadius: '2rem',
  },
  cancellationPolicySwitchRound: {
    borderWidth: 1.5,
    borderColor: Colors.darkGray,
    borderRadius: '10rem',
    width: '10rem',
    height: '10rem',
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: Colors.white,
  },
  cancellationPolicySwitchRoundActive: {
    borderWidth: 1.5,
    borderColor: Colors.pink,
    borderRadius: '10rem',
    width: '10rem',
    height: '10rem',
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: Colors.white,
  },
  cancellationPolicyTextContent: {
    paddingBottom: '15rem',
    borderBottomWidth: 2,
    borderColor: Colors.gray,
    marginBottom: '37rem',
  },
  cancellationPolicyText: {
    color: Colors.darkGray,
    lineHeight: '18rem',
    fontSize: Fonts.size.tiny,
    ...Fonts.style.normalText,
  },
  cancellationPolicyMoreBtn: {
    width: '90rem',
  },
  cancellationPolicyMoreText: {
    color: Colors.pink,
    lineHeight: '18rem',
    fontSize: Fonts.size.tiny,
    ...Fonts.style.buttonText,
  },
});

export default styles;
