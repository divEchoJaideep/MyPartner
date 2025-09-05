import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors, Fonts} from '../../../theme';

const styles = EStyleSheet.create({
  searchSuggestions: {
    width: '100%',
    paddingHorizontal: '20rem',
    height: '100% - 138rem',
    paddingBottom: '35rem',
  },
  searchInputStyle: {
    marginHorizontal: 'auto',
    width: '100% - 40rem',
    marginBottom: '10rem',
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  },
  suggestionsList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: '15rem',
    marginBottom: '23rem',
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
    paddingHorizontal: '3rem',
  },
  suggestionsSearchIcon: {
    width: '14rem',
    height: '14rem',
  },
  suggestionsSearchText: {
    paddingLeft: '18rem',
    lineHeight: '24rem',
    color: Colors.darkGray,
    fontSize: Fonts.size.regular,
    ...Fonts.style.normalText,
  },
  suggestionsListContainer: {
    marginBottom: '-23rem',
  },
});

export default styles;
