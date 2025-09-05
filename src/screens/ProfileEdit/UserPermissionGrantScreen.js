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
// import {userPermissionList} from '../../assets/data';
import CheckBox from '@react-native-community/checkbox';
import {userPermissionList} from '../../assets/data';

const SubHeading = ({subHeading, onCheckboxChange}) => (
  <View style={styles.subHeadingContainer}>
    <Text style={styles.subHeadingText}>{subHeading.title}</Text>
    <CheckBox
      value={subHeading.checked}
      onValueChange={() => onCheckboxChange(subHeading.id)}
      style={styles.checkbox}
    />
  </View>
);

const Heading = ({heading, subHeadings, onCheckboxChange}) => (
  <View style={styles.headingContainer}>
    <Text style={styles.headingText}>{heading}</Text>
    <FlatList
      data={subHeadings}
      renderItem={({item}) => (
        <SubHeading subHeading={item} onCheckboxChange={onCheckboxChange} />
      )}
      keyExtractor={item => item.id}
      bounces={false}
    />
  </View>
);

function UserPermissionGrant({navigation}) {
  const [permissions, setPermissions] = React.useState(userPermissionList);

  const handleCheckboxChange = subHeadingId => {
    setPermissions(prevPermissions =>
      prevPermissions.map(heading => ({
        ...heading,
        subHeadings: heading.subHeadings.map(subHeading =>
          subHeading.id === subHeadingId
            ? {...subHeading, checked: !subHeading.checked}
            : subHeading,
        ),
      })),
    );
  };

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
          <View>
            <FlatList
              data={permissions}
              renderItem={({item}) => (
                <Heading
                  heading={item.heading}
                  subHeadings={item.subHeadings}
                  onCheckboxChange={handleCheckboxChange}
                />
              )}
              keyExtractor={item => item.id}
              bounces={false}
            />
          </View>

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

export default UserPermissionGrant;
