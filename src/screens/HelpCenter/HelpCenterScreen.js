import * as React from 'react';
import {View, Text} from 'react-native';
import {Container, Header, Content} from '../../components';
import {helpCenterArticleList, helpCenterTopicList} from '../../assets/data';
import SearchInput from '../../components/SearchInput/Index';
import {navigate} from '../../navigation/ReduxNavigation';
import CommanBtnScreen from '../../components/CommanBtn';
import CommanHeading from '../../components/CommanHeading';
import HelpCenterList from '../../components/HelpCenterList';
import styles from './Styles/HelpCenterStyle';

function HelpCenterScreen({navigation}) {
  return (
    <>
      <Container>
        <Header
          transparent
          hasBackBtn
          title="Help Center"
          onBackPress={() => navigation.goBack()}
        />
        <SearchInput
          searchInputStyle={styles.searchInputStyle}
          placeholder="Search help articles"
        />
        <Content hasHeader contentContainerStyle={styles.container}>
          <View>
            <CommanHeading
              headingText
              heading="Recommended articles"
              navigation={navigate}
            />
            <HelpCenterList
              helpCenterArticleList
              helpCenterArticleTextImg
              helpCenterList={helpCenterArticleList}
              navigation={navigate}
            />
            <CommanHeading
              headingText
              heading="Browse all topics"
              navigation={navigate}
              commanHeadingContainerStyle={styles.allTopicHeadingStyle}
            />
            <HelpCenterList
              helpCenterTopicList
              helpCenterTopicTextImg
              helpCenterList={helpCenterTopicList}
              navigation={navigate}
            />
            <View style={styles.stillHelpBottomTextBtn}>
              <Text style={styles.stillHelpBottomText}>Still need help?</Text>
              <CommanBtnScreen
                btnText="Contact us"
                commanBtnStyle={styles.contactUsBtn}
              />
            </View>
          </View>
        </Content>
      </Container>
    </>
  );
}

export default HelpCenterScreen;
