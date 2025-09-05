import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Container, Content, Header} from '../../components';
import CommanText from '../../components/CommanText';
import {Images} from '../../theme';
import styles from './Styles';
import CommanBtnScreen from '../../components/CommanBtn';

const OrientationScreen = props => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionPress = option => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      if (selectedOptions.length < 3) {
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  };
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        textRight
        onBackPress={() => navigation.goBack()}
      />
      <Content hasHeader contentContainerStyle={styles.container}>
        <View style={styles.bigTextView}>
          <CommanText
            commanText="My Sexual orientation is "
            commanTextstyle={styles.bigText}
          />
          <CommanText
            commanText="Select Upto 3"
            commanTextstyle={{marginTop: 10}}
          />
        </View>
        <View style={styles.optionsContainer}>
          <CommanBtnScreen
            commanBtnStyle={[
              styles.optionButton,
              selectedOptions.includes('Straight') && styles.selectedOption,
            ]}
            onBtnPress={() => handleOptionPress('Straight')}
            btnText="Straight"
            commanBtnTextStyle={[
              styles.optionButtonText,
              selectedOptions.includes('Straight') && styles.selectedOption,
            ]}
          />
          <CommanBtnScreen
            commanBtnStyle={[
              styles.optionButton,
              selectedOptions.includes('Gay') && styles.selectedOption,
            ]}
            onBtnPress={() => handleOptionPress('Gay')}
            btnText="Gay"
            commanBtnTextStyle={[
              styles.optionButtonText,
              selectedOptions.includes('Gay') && styles.selectedOption,
            ]}
          />
          <CommanBtnScreen
            commanBtnStyle={[
              styles.optionButton,
              selectedOptions.includes('Lesbian') && styles.selectedOption,
            ]}
            onBtnPress={() => handleOptionPress('Lesbian')}
            btnText="Lesbian"
            commanBtnTextStyle={[
              styles.optionButtonText,
              selectedOptions.includes('Lesbian') && styles.selectedOption,
            ]}
          />
          <CommanBtnScreen
            commanBtnStyle={[
              styles.optionButton,
              selectedOptions.includes('Bisexual') && styles.selectedOption,
            ]}
            onBtnPress={() => handleOptionPress('Bisexual')}
            btnText="Bisexual"
            commanBtnTextStyle={[
              styles.optionButtonText,
              selectedOptions.includes('Bisexual') && styles.selectedOption,
            ]}
          />
          <CommanBtnScreen
            commanBtnStyle={[
              styles.optionButton,
              selectedOptions.includes('Asexual') && styles.selectedOption,
            ]}
            onBtnPress={() => handleOptionPress('Asexual')}
            btnText="Asexual"
            commanBtnTextStyle={[
              styles.optionButtonText,
              selectedOptions.includes('Asexual') && styles.selectedOption,
            ]}
          />
          <CommanBtnScreen
            commanBtnStyle={[
              styles.optionButton,
              selectedOptions.includes('Pansexual') && styles.selectedOption,
            ]}
            onBtnPress={() => handleOptionPress('Pansexual')}
            btnText="Pansexual"
            commanBtnTextStyle={[
              styles.optionButtonText,
              selectedOptions.includes('Pansexual') && styles.selectedOption,
            ]}
          />
        </View>

        <View style={styles.btnView}>
          <CommanText
            commanText="Show my orientation on my profile"
            commanTextstyle={{marginBottom: 10}}
          />
          <CommanBtnScreen
            commanBtnStyle={styles.commanBtnStyle}
            btnText="Choose another"
          />
        </View>
        {/* </View> */}
      </Content>
    </Container>
  );
};

export default OrientationScreen;
