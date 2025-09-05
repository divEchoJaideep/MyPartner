import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Container, Content, Header } from '../../components';
import CommanText from '../../components/CommanText';
import { Images } from '../../theme';
import CommanBtnScreen from '../../components/CommanBtn';
import styles from './Styles/ProfileStyle';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { hobbiesList, selectedHobbies } from '../../actions/AppAction';
import UpdateHobbies from '../../api/updateHobbies';
import Error from '../../components/Error';
import GetInterests from '../../api/GetInterests';
import Loading from '../../components/Loading';
import { GetProfileDropdown } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InterestScreen = props => {
  // console.log('props screnstate: ', props);
  const navigation = useNavigation();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  console.log('selectedOptions :', hobbies);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState();
  console.log('selectedOptions: ', selectedOptions);
  useEffect(() => {
    getInterests();
  }, []);

  const getInterests = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('UserToken');
      const res = await GetProfileDropdown(token);

      if (res.success) {

        setHobbies(res.data?.hobbies_list || []);
        setLoading(false);
        // console.log("Dropdown Data:", res.data?.highest_education_list);
      } else {
        setLoading(false);

        // console.log("Error:", res.message);
      }
    } catch (err) {
      setLoading(false);

      // console.log("API Error:", err);
    }
  };

  const NextStep = async () => {
    // if (selectedOptions.length === 0) {
    //   // setError('Please slect at leat one Hobies.');
    //   return;
    // }

    const response = await UpdateHobbies({
      data: selectedOptions,
      token: props.token,
    });
    console.log('response hobbies : ', response);
    if (!response.success) {
      setError(response.message);
      return;
    }
    await props.selectedHobbies(selectedOptions);

    navigation.navigate('Social');
  };

  const handleOptionPress = option => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      if (selectedOptions.length < 5) {
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedOptions.includes(item.id) && styles.selectedOption,
        ]}
        onPress={() => {
          handleOptionPress(item.id);
        }}>
        <Text
          style={[
            styles.optionButtonText,
            selectedOptions.includes(item.id) && styles.selectedOption,
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Hobbies & Interest"
        onBackPress={() => navigation.goBack()}
      />
      <Content hasHeader contentContainerStyle={styles.container}>
        <Error error={error} />
        <Loading loading={loading} />
        <View style={styles.bigTextView}>
          <CommanText
            commanText="Select a few of your interests and let everyone know what you're passionate about."
            commanTextstyle={styles.commanTextstyle}
          />
        </View>
        <View>
          <FlatList
            data={hobbies}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            pagingEnabled
            scrollEnabled={false}
            numColumns={2}
          // columnWrapperStyle={{justifyContent: 'space-between'}}

          />
          {/* <View style={styles.optionsContainer}>
          <View style={styles.hobbiesView}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOptions.includes('Photography') &&
                  styles.selectedOption,
              ]}
              onPress={() => handleOptionPress('Photography')}>
              <Text
                style={[
                  styles.optionButtonText,
                  selectedOptions.includes('Photography') &&
                    styles.selectedOption,
                ]}>
                Photography
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOptions.includes('Shopping') && styles.selectedOption,
              ]}
              onPress={() => handleOptionPress('Shopping')}>
              <Text
                style={[
                  styles.optionButtonText,
                  selectedOptions.includes('Shopping') && styles.selectedOption,
                ]}>
                Shopping
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.hobbiesView}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOptions.includes('Karaoke') && styles.selectedOption,
              ]}
              onPress={() => handleOptionPress('Karaoke')}>
              <Text
                style={[
                  styles.optionButtonText,
                  selectedOptions.includes('Karaoke') && styles.selectedOption,
                ]}>
                Karaoke
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOptions.includes('Yoga') && styles.selectedOption,
              ]}
              onPress={() => handleOptionPress('Yoga')}>
              <Text
                style={[
                  styles.optionButtonText,
                  selectedOptions.includes('Yoga') && styles.selectedOption,
                ]}>
                Yoga
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.hobbiesView}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOptions.includes('Cooking') && styles.selectedOption,
              ]}
              onPress={() => handleOptionPress('Cooking')}>
              <Text
                style={[
                  styles.optionButtonText,
                  selectedOptions.includes('Cooking') && styles.selectedOption,
                ]}>
                Cooking
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOptions.includes('Tennis') && styles.selectedOption,
              ]}
              onPress={() => handleOptionPress('Tennis')}>
              <Text
                style={[
                  styles.optionButtonText,
                  selectedOptions.includes('Tennis') && styles.selectedOption,
                ]}>
                Tennis
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.hobbiesView}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOptions.includes('Run') && styles.selectedOption,
              ]}
              onPress={() => handleOptionPress('Run')}>
              <Text
                style={[
                  styles.optionButtonText,
                  selectedOptions.includes('Run') && styles.selectedOption,
                ]}>
                Run
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOptions.includes('Swimming') && styles.selectedOption,
              ]}
              onPress={() => handleOptionPress('Swimming')}>
              <Text
                style={[
                  styles.optionButtonText,
                  selectedOptions.includes('Swimming') && styles.selectedOption,
                ]}>
                Swimming
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.hobbiesView}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOptions.includes('Art') && styles.selectedOption,
              ]}
              onPress={() => handleOptionPress('Art')}>
              <Text
                style={[
                  styles.optionButtonText,
                  selectedOptions.includes('Art') && styles.selectedOption,
                ]}>
                Art
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOptions.includes('Travelling') && styles.selectedOption,
              ]}
              onPress={() => handleOptionPress('Travelling')}>
              <Text
                style={[
                  styles.optionButtonText,
                  selectedOptions.includes('Travelling') &&
                    styles.selectedOption,
                ]}>
                Travelling
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.hobbiesView}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOptions.includes('Extreme') && styles.selectedOption,
              ]}
              onPress={() => handleOptionPress('Extreme')}>
              <Text
                style={[
                  styles.optionButtonText,
                  selectedOptions.includes('Extreme') && styles.selectedOption,
                ]}>
                Extreme
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOptions.includes('Music') && styles.selectedOption,
              ]}
              onPress={() => handleOptionPress('Music')}>
              <Text
                style={[
                  styles.optionButtonText,
                  selectedOptions.includes('Music') && styles.selectedOption,
                ]}>
                Music
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.hobbiesView}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOptions.includes('Drink') && styles.selectedOption,
              ]}
              onPress={() => handleOptionPress('Drink')}>
              <Text
                style={[
                  styles.optionButtonText,
                  selectedOptions.includes('Drink') && styles.selectedOption,
                ]}>
                Drink
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOptions.includes('Video games') &&
                  styles.selectedOption,
              ]}
              onPress={() => handleOptionPress('Video games')}>
              <Text
                style={[
                  styles.optionButtonText,
                  selectedOptions.includes('Video games') &&
                    styles.selectedOption,
                ]}>
                Video games
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}

          <CommanBtnScreen
            btnText="Next"
            commanBtnTextStyle={styles.commanBtnTextStyle}
            commanBtnStyle={styles.btnStyle}
            onBtnPress={() => NextStep()}
          />
        </View>
        {/* </View> */}
      </Content>
    </Container>
  );
};
function mapStateToProps(state) {
  // console.log('state: ', state.hobbies.hobbies_list);
  return {
    // token: state.auth.user.access_token,
    // hobbiles_list: state.hobbies.hobbies_list,
    // //update hobbies
    // selected_hobbies: state.updateHobbies.selected_hobbies,
  };
}

const mapDispatchToProps = dispatch => ({
  hobbiesList: data => dispatch(hobbiesList(data)),
  //update hobbies
  selectedHobbies: data => dispatch(selectedHobbies(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(InterestScreen);
