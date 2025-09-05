import * as React from 'react';
import {View} from 'react-native';
import {Container, Content, Header} from '../../components';
import {countrySelectList} from '../../assets/data';
import RadioButton from '../../components/RadioButton';
import SearchInput from '../../components/SearchInput/Index';
import styles from './Styles/SelectCountryStyle';

function SelectCountryScreen({navigation}) {
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Change country or region"
        onBackPress={() => navigation.goBack()}
      />
      <SearchInput
        searchInputStyle={styles.searchInputStyle}
        placeholder="Search country or region"
      />
      <Content contentContainerStyle={styles.container}>
        <View style={styles.languageListContent}>
          <RadioButton data={countrySelectList} />
        </View>
      </Content>
    </Container>
  );
}

export default SelectCountryScreen;
