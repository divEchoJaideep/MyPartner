import * as React from 'react';
import {View} from 'react-native';
import {Container, Content, Header} from '../../components';
import {languageSelectList} from '../../assets/data';
import RadioButton from '../../components/RadioButton';
import SearchInput from '../../components/SearchInput/Index';
import styles from './Styles/EmergencyContactStyle';

function SelectLanguageScreen({navigation}) {
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Select Preferred Language"
        onBackPress={() => navigation.goBack()}
      />
      <SearchInput
        searchInputStyle={styles.searchInputStyle}
        placeholder="Search language"
      />
      <Content contentContainerStyle={styles.container}>
        <View style={styles.languageListContent}>
          <RadioButton
            data={languageSelectList}
            radioTextStyle={styles.radioTextStyle}
            radioBoxStyle={styles.radioBoxStyle}
          />
        </View>
      </Content>
    </Container>
  );
}

export default SelectLanguageScreen;
