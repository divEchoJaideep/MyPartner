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
  cancellationPolicyTextContent: {
    paddingBottom: '15rem',
    borderBottomWidth: 2,
    borderColor: Colors.gray,
    marginBottom: '37rem',
  },
  cancellationPolicyText: {
    color: Colors.darkGray,
    lineHeight: '18rem',
    ...Fonts.style.normalText,
    fontSize: Fonts.size.tiny,
  },
  cancellationPolicyMoreBtn: {
    width: '90rem',
  },
  cancellationPolicyMoreText: {
    color: Colors.pink,
    lineHeight: '18rem',
    ...Fonts.style.buttonText,
    fontSize: Fonts.size.tiny,
  },
});

export default styles;
