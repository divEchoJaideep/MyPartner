import * as React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {Container, Header, Content} from '../../components';
import {navigate} from '../../navigation/ReduxNavigation';
import CommanHeading from '../../components/CommanHeading';
import styles from './Styles/FeedbackStyle';
import {Images} from '../../theme';

function FeedbackScreen({navigation}) {
  return (
    <>
      <Container>
        <Header
          transparent
          hasBackBtn
          title="Feedback"
          onBackPress={() => navigation.goBack()}
        />
        <Content hasHeader contentContainerStyle={styles.container}>
          <CommanHeading
            headingText
            heading="How are we doing?"
            navigation={navigate}
          />
          <Text style={styles.feedbackPeregraphText}>
            We’re always working to improve the ready rental experience, so we’d
            love to hear what’s working and how we can do better.
          </Text>
          <Text style={styles.feedbackPeregraphText}>
            <Text style={styles.feedbackPeregraphHeadingText}>
              This isn’t a way to contact us, though.{'\n'}
            </Text>
            We can’t respond to feedback or bug reports individually. If you
            question or need help resolving a problem, you’ll find answers in
            our{' '}
            <Text style={styles.feedbackPeregraphTextLink}>Help Center</Text>,
            you can{' '}
            <Text style={styles.feedbackPeregraphTextLink}>contact us.</Text>
          </Text>
          <CommanHeading
            headingText
            heading="What would you like to do?"
            navigation={navigate}
            commanHeadingContainerStyle={styles.likeDoHeading}
          />
          <TouchableOpacity style={styles.likeDoLinks}>
            <Image
              source={Images.FeedBackIcon}
              resizeMode="contain"
              style={styles.topicImg}
            />
            <Text style={styles.likeDoLinkText}>Give product feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.likeDoLinks}>
            <Image
              source={Images.reportBug}
              resizeMode="contain"
              style={styles.topicImg}
            />
            <Text style={styles.likeDoLinkText}>Report a bug</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    </>
  );
}

export default FeedbackScreen;
