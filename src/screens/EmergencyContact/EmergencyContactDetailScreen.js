import * as React from 'react';
import {Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import {Container, Content, Header} from '../../components';
import CommanBtn from '../../components/CommanBtn';
import {profileInputList} from '../../assets/data';
import TextInput from '../../components/SignUpLogIn/TextInput';
import CommanText from '../../components/SignUpLogIn/CommanText';
import {navigate} from '../../navigation/ReduxNavigation';
import styles from './Styles/EmergencyContactStyle';
import {Images} from '../../theme';

function EmergencyContactDetailScreen({navigation}) {
  const renderItem = ({item}) => (
    <View>
      <CommanText
        commanText={item.labelText}
        commanTextstyle={styles.inputLabelText}
      />
      <TextInput
        defaultInput
        navigation={navigate}
        inputStyle={styles.profileInputStyle}
        placeholder={item.labelText}
        type={item.inputType}
      />
    </View>
  );
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Emergency Contact"
        onBackPress={() => navigation.goBack()}
      />
      <Content contentContainerStyle={styles.container}>
        <View>
          <FlatList
            data={profileInputList}
            renderItem={renderItem}
            bounces={false}
          />
          <View>
            <CommanText
              commanText="Preferred language"
              commanTextstyle={styles.inputLabelText}
            />
            <TouchableOpacity
              style={styles.languageSelectBtn}
              onPress={() => navigation.navigate('SelectLanguage')}>
              <Text style={styles.languageSelectBtnText} numberOfLines={1}>
                English
              </Text>
              <Image
                source={Images.ViewAllArrow}
                resizeMode="contain"
                style={styles.languageSelectBtnArrow}
              />
            </TouchableOpacity>
          </View>
        </View>
        <CommanBtn btnText="Save" commanBtnStyle={styles.addNowBtn} />
      </Content>
    </Container>
  );
}

export default EmergencyContactDetailScreen;
