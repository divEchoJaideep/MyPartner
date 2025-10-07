import * as React from 'react';
import { Text } from 'react-native';
import { Container, Header, Content } from '../../components';
import { navigate } from '../../navigation/ReduxNavigation';
import CommanHeading from '../../components/CommanHeading';
import styles from './Styles/TermsofServiceStyle';

function PrivacyPolicy({ navigation }) {
  return (
    <>
      <Container paddingBottomContainer={true}>
        <Header
          transparent
          hasBackBtn
          title="Privacy Policy"
          onBackPress={() => navigation.goBack()}
        />
        <Content hasHeader contentContainerStyle={styles.container}>
          {/* <CommanHeading
            headingText
            heading="Terms of service for non-indian users"
            navigation={navigate}
          /> */}

          {/* <Text style={styles.termsServiceText}>
          </Text>
          <Text style={styles.termsServiceTextLink}>elemen</Text> vel, */}

          {/* <Text style={styles.heading}>Terms of Use</Text> */}
          <Text style={styles.subHeading}>Effective Date: 19/11/24</Text>
          <Text style={styles.section}>1.  Introduction</Text>
          <Text style={styles.paragraph}> At <Text style={styles.bullet}>Partnermy.com,</Text> we are committed to safeguarding your privacy and ensuring that your
            personal information is protected. This Privacy Policy explains how we collect, use, store, and
            protect your personal data in compliance with the <Text style={styles.bullet}>Information Technology Act, 2000 (IT Act) </Text> and the Information Technology Act, 2000 and the
            <Text style={styles.bullet}>Indian Penal Code (IPC),</Text> and in accordance with applicable privacy laws and rules in India.</Text>
          <Text style={styles.paragraph}> By using the <Text style={styles.bullet}>Partner/Partnermy.com </Text> dating and matrimonial mobile application (the "App"), you consent to the
            practices described in this Privacy Policy</Text>
          <Text style={styles.section}>2.  Information We Collect</Text>
          <Text style={styles.paragraph}> We may collect the following types of personal information from you:</Text>
          <Text style={styles.bullet}>a. Personal Information Provided by You:</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Account Information:</Text> When you register or create a profile, we collect details like your
            name, email address, phone number, gender, date of birth, marital status, etc</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Profile Information: </Text> We collect Information such as photos, bio, preferences, occupation,
            education, religion, language, location, and other data that helps us provide
            matchmaking and other services.</Text>
          <Text style={styles.paragraph}><Text style={styles.bullet}>● Communications:</Text> Any messages, photos, or other content you share via the App,
            including private conversations.</Text>
          <Text style={styles.bullet}>b. Information Collected Automatically:</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Usage Data :</Text> We automatically collect data on your usage of the App, including IP
            address, device type, operating system, browser type, and interactions within the App.</Text>
          <Text style={styles.paragraph}><Text style={styles.bullet}>● Location Data:</Text> With your consent, we may collect location information to provide you
            with location-based matchmaking</Text>
          <Text style={styles.paragraph}><Text style={styles.bullet}>● Cookies and Similar Technologies:</Text> We use cookies and similar technologies to
            enhance your experience and analyze how you use our App.
          </Text>
          <Text style={styles.section}>3. How WeUseYour Information</Text>
          <Text style={styles.paragraph}> We use the collected information for the following purposes:</Text>
          <Text style={styles.paragraph}> ● Tocreate and manage your account and profile.</Text>
          <Text style={styles.paragraph}> ● Toprovide personalized matchmaking and recommendations based on your preferences
            and activity.</Text>
          <Text style={styles.paragraph}>● To communicate with you, including sending updates, notifications, and marketing
            material (you can opt out of marketing communications at any time).</Text>
          <Text style={styles.paragraph}> ● Toimprove the functionality, features, and security of the App.</Text>
          <Text style={styles.paragraph}> ● Toprevent fraud, abuse, or illegal activities within the App, and to comply with the Indian
            Penal Code.</Text>
          <Text style={styles.paragraph}>  ● To ensure legal compliance and meet obligations under the <Text style={styles.bullet}>Information Technology
            Act, 2000, </Text>and other applicable laws.</Text>
          <Text style={styles.section}> 4. Disclosure of Information</Text>
          <Text style={styles.paragraph}>  We do not sell, rent, or trade your personal information to third parties. However, we may share
            your data in the following situations</Text>
          <Text style={styles.paragraph}><Text style={styles.bullet}>● With Service Providers:</Text> We may share your information with trusted third-party
            vendors who provide services such as cloud hosting, analytics, customer support, and
            marketing. These providers are required to protect your data.</Text>
          <Text style={styles.paragraph}><Text style={styles.bullet}> ● For Legal Compliance:</Text> If required by law, or in response to legal requests (such as a
            court order), we may disclose your information in compliance with the <Text style={styles.bullet}>Information
              Technology Act, 2000,</Text> and the <Text style={styles.bullet}>Indian Penal Code</Text></Text>
          <Text style={styles.paragraph}><Text style={styles.bullet}> ● Business Transfers:</Text> If we undergo a merger, acquisition, or sale of assets, your
            personal information may be transferred as part of the transaction. We will notify you of
            any such change.</Text>
          <Text style={styles.paragraph}><Text style={styles.bullet}> ● With Other Users (as part of the service): </Text> As a dating and matrimonial platform, your
            profile information (except sensitive personal data like contact details) will be visible to
            other users within the App for matchmaking purposes</Text>
          <Text style={styles.section}> 5. Data Retention</Text>
          <Text style={styles.paragraph}> We retain your personal data for as long as necessary to fulfill the purposes outlined in this
            Privacy Policy, or as required by law under the <Text style={styles.bullet}>Information Technology Act, 2000 </Text>and <Text style={styles.bullet}> Indian
              Penal Code </Text>. If you wish to delete your account, you may request this through the App. Upon
            account deletion, your personal data will be removed from our active databases, subject to legal
            and operational requirements.</Text>
          <Text style={styles.section}> 6. Your Rights and Choices</Text>
          <Text style={styles.paragraph}> Under the <Text style={styles.bullet}>Information Technology Act, 2000 </Text>and the  <Text style={styles.bullet}>SPDI Rules</Text>, you have the following
            rights concerning your personal information:</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Access and Correction:</Text> You can request access to the personal data we hold about
            you, and request corrections or updates to that information</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Deletion </Text>: You may request the deletion of your account and personal data, subject to
            applicable legal exceptions.</Text>
          <Text style={styles.paragraph}><Text style={styles.bullet}> ● Opt-Out of Marketing:</Text> You can opt out of receiving promotional emails or push
            notifications at any time by following the instructions provided</Text>
          <Text style={styles.paragraph}><Text style={styles.bullet}> ● Withdraw Consent:</Text> You may withdraw your consent for the processing of certain types
            of personal information. Withdrawal of consent may affect your ability to use certain
            features of the App.</Text>
          <Text style={styles.section}> 7. Data Security</Text>
          <Text style={styles.paragraph}>  We employ reasonable security measures, including encryption, secure storage, and access
            control, to protect your personal data from unauthorized access, disclosure, alteration, or
            destruction. However, no method of data transmission over the internet is completely secure,
            and we cannot guarantee absolute security.</Text>
          <Text style={styles.section}>8. Children’s Privacy</Text>
          <Text style={styles.paragraph}>  The App is not intended for use by individuals under the age of 18. We do not knowingly collect
            or solicit personal information from minors. If we learn that we have inadvertently collected
            information from a child under 18, we will take steps to delete that data promptly</Text>
          <Text style={styles.section}> 9. International Data Transfers</Text>
          <Text style={styles.paragraph}> If you are using the App from outside India, please note that your data may be transferred to
            and processed in India, where our servers are located. By using the App, you consent to the
            transfer of your data to India in accordance with this Privacy Policy</Text>
          <Text style={styles.section}> 10. Compliance with Indian Laws</Text>
          <Text style={styles.paragraph}> Weadhere to the privacy and data protection principles outlined in the<Text style={styles.bullet}> Information Technology
            Act, 2000,</Text> including its rules for handling sensitive personal data and information (SPDI Rules),
            as well as provisions in the<Text style={styles.bullet}> Indian Penal Code</Text> related to data breaches and privacy violations.
            Violations of the privacy policy or the misuse of the App may result in legal consequences as
            per the applicable Indian laws</Text>
          <Text style={styles.section}> 11. Updates to This Privacy Policy</Text>
          <Text style={styles.paragraph}>  We may update this Privacy Policy from time to time to reflect changes in our practices or for
            other operational, legal, or regulatory reasons. Any material changes will be communicated to
            you via the App, and the "Effective Date" will be updated accordingly</Text>
        </Content>
      </Container>
    </>
  );
}

export default PrivacyPolicy;
