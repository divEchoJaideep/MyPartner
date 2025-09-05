import * as React from 'react';
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import {Container, Header, Content} from '../../components';
import {Images} from '../../theme';
import TextInput from '../../components/SignUpLogIn/TextInput';
import CommanText from '../../components/CommanText';
import DatePickerInput from '../../components/DatePickerInput';
import ProfilePhoto from '../../components/ProfilePhoto';
import {navigate} from '../../navigation/ReduxNavigation';
import CommanBtnScreen from '../../components/CommanBtn';
import styles from './Styles/ProfileEditStyle';
import {userList} from '../../assets/data';

function UserPermissions({navigation}) {
  const renderItem = ({item}) => (
    <View>
      <TouchableOpacity
        style={styles.govermentIdContactList}
        onPress={() => navigation.navigate(item.pageName)}>
        <Text style={styles.govermentIdContactText}>{item.text}</Text>
        <Image
          source={Images.ViewAllArrow}
          resizeMode="contain"
          style={styles.rightArrowImg}
        />
      </TouchableOpacity>
    </View>
  );
  return (
    <>
      <Container>
        <Header
          transparent
          hasBackBtn
          title="User Permissions"
          onBackPress={() => navigation.goBack()}
        />
        <Content hasHeader contentContainerStyle={styles.container}>
          {/* <ProfilePhoto source={0} /> */}
          <View>
            <FlatList data={userList} renderItem={renderItem} bounces={false} />
          </View>
          {/*         
          <CommanBtnScreen
            btnText="Save Changes"
            commanBtnStyle={styles.profileSaveChangeBtn}
            onBtnPress={() => navigation.goBack()}
          /> */}

          <CommanBtnScreen
            btnText="Save Changes"
            commanBtnTextStyle={styles.commanBtnTextStyle}
            commanBtnStyle={styles.btnStyle}
            onBtnPress={() => navigation.goBack()}
          />
        </Content>
      </Container>
    </>
  );
}

export default UserPermissions;
