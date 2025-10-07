import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    paddingBottom: '15rem',
    paddingHorizontal: '20rem',
  },
  termsServiceText: {
    lineHeight: '21rem',
    color: Colors.darkGray,
    marginBottom: '8rem',
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText,
  },
  termsServiceTextLink: {
    color: Colors.pink,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subHeading: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
    color: "#555",
  },
  section: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
    color: "#222",
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
    marginBottom: 10,
    textAlign: "justify",
  },
  bullet:{
    fontSize: 15,
    lineHeight: 22,
    fontWeight:'bold',
    color: "#333",
    marginBottom: 10,
    textAlign: "justify",
  },
});

export default styles;
