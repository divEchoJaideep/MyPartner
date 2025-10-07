import * as React from 'react';
import { Text } from 'react-native';
import { Container, Header, Content } from '../../components';
import { navigate } from '../../navigation/ReduxNavigation';
import CommanHeading from '../../components/CommanHeading';
import styles from './Styles/TermsofServiceStyle';

function TermsofServiceScreen({ navigation }) {
  return (
    <>
      <Container paddingBottomContainer={true}>
        <Header
          transparent
          hasBackBtn
          title="Terms of Use"
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

          <Text style={styles.paragraph}>
            These Terms of Use ("Agreement") govern your use of the
            Partner/Partnermy.com dating and matrimonial mobile application and
            website ("Service"). By accessing or using the Service, you agree to
            comply with and be bound by this Agreement. If you do not agree to these
            terms, please do not use the Service.
          </Text>

          <Text style={styles.section}>1. Acceptance of Terms</Text>
          <Text style={styles.paragraph}>
            By using the Partner/Partnermy.com app and services, you acknowledge
            that you have read, understood, and agree to comply with the terms and
            conditions set forth herein, as well as all applicable laws, including
            the Indian Penal Code (IPC) and the Information Technology Act, 2000
            ("IT Act"). These terms are enforceable under Indian law.
          </Text>

          <Text style={styles.section}>2. Eligibility</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bullet}>● Age Requirement: </Text>You must be at least 18 years of age to use the
            Partner/Partnermy.com Service. By using the Service, you confirm that
            you are of legal age to form a binding contract under applicable law.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bullet}>● Account Registration:</Text> To use the Service, you must register for an
            account and provide accurate, up-to-date, and complete information
            during the registration process. You are responsible for maintaining the
            confidentiality of your account information.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bullet}>● Prohibited Uses:</Text> The Service is intended solely for personal,
            non-commercial use. You agree not to impersonate any person or entity,
            use the Service for unlawful purposes, or engage in activities that
            disrupt or interfere with the functioning of the Service.
          </Text>
          <Text style={styles.section}> 3. Account Registration and Profile</Text>
          <Text style={styles.paragraph}>
            To access the full features of the App, you must create an account. You agree to:
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bullet}>● Provide accurate and complete information during the registration
              process.</Text>
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bullet}>● Maintain the confidentiality of your account information and password.</Text>
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bullet}>● Provide accurate and complete information during the registration
              process.</Text>
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bullet}>● Maintain the confidentiality of your account information and password.</Text>
          </Text>
          <Text style={styles.paragraph}>
            We reserve the right to suspend or terminate your account if we suspect that any information
            provided is false, incomplete, or violates the Terms
          </Text>
          <Text style={styles.section}> 4. User Content</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bullet}>● Responsibility for Content: </Text>
            You are solely responsible for any information,
            photographs, or content that you post, share, or transmit via the Service ("User
            Content"). You agree that all User Content must comply with the applicable laws and
            regulations
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bullet}>● Prohibited Content:</Text>
            You must not post, transmit, or otherwise make available any
            content that:
          </Text>
          <Text style={styles.paragraph}>
            ○ Violates the
            <Text style={styles.bullet}> Indian Penal Code (IPC), Information Technology Act, 2000,</Text> or
            other applicable laws;
          </Text>
          <Text style={styles.paragraph}>
            ○ Contains defamatory, offensive, harmful, or unlawful content, including but not
            limited to content promoting hate speech, violence, discrimination, or illegal
            activities;
          </Text>
          <Text style={styles.paragraph}> ○ Invades the privacy or infringes the intellectual property rights of others;</Text>
          <Text style={styles.paragraph}> ○ Harasses, intimidates, or threatens any other user.</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bullet}>● Content Rights: </Text>By submitting User Content, you grant Partner/Partnermy.com a
            worldwide, royalty-free, and non-exclusive license to use, modify, distribute, and display
            your content in connection with the operation of the Service
          </Text>
          <Text style={styles.section}>5. User Conduct and Responsibilities</Text>
          <Text style={styles.paragraph}> When using the App, you agree to :</Text>
          <Text style={styles.paragraph}> ● Provide truthful and accurate information on your profile.</Text>
          <Text style={styles.paragraph}>  ● Refrain from uploading or sharing any content that is illegal, harmful, abusive,
            defamatory, obscene, invasive of privacy, or otherwise offensive.
          </Text>
          <Text style={styles.paragraph}>● Not engage in any activity that may harm or interfere with the functioning of the App,
            including hacking or uploading malware.</Text>
          <Text style={styles.paragraph}> ● Not use the App for any fraudulent, harmful, or illegal activity, including scamming or
            attempting to exploit other users</Text>
          <Text style={styles.paragraph}> ● Comply with the Indian Penal Code (IPC) and Information Technology Act, 2000,
            especially with regard to cybercrimes, privacy violations, and fraudulent activities.</Text>
          <Text style={styles.paragraph}>  You are solely responsible for the content you upload and the interactions you have with other
            users. Partner/Partnermy.com is not responsible for any disputes, damages, or losses arising
            from your use of the App.</Text>
          <Text style={styles.section}>6. Prohibited Content</Text>
          <Text style={styles.paragraph}> You agree not to post, upload, or share any of the following on the App:</Text>
          <Text style={styles.paragraph}> ● Content that violates any laws, including<Text style={styles.bullet}> defamation, hate speech,</Text> or <Text style={styles.bullet}>obscenity </Text>under
            the <Text style={styles.bullet}>Indian Penal Code (IPC)</Text></Text>
          <Text style={styles.paragraph}> We reserve the right to remove any content that violates these Terms and suspend or terminate
            the accounts of users who upload prohibited content</Text>
          <Text style={styles.section}>7.  Privacy and Data Protection</Text>
          <Text style={styles.paragraph}>  <Text style={styles.bullet}>Partner/Partnermy.com </Text>is committed to respecting your privacy. Our Privacy Policy outlines
            how we collect, use, and protect your personal data. By using the Service, you consent to the
            collection and use of your data as described in the Privacy Policy.</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Data Security:</Text> We use reasonable administrative, technical, and physical measures to
            protect your personal data, but we cannot guarantee its absolute security.</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bullet}>● Compliance with Indian Laws: </Text>We adhere to applicable data protection laws under the
            <Text style={styles.bullet}> Information Technology (Reasonable Security Practices and Procedures and
              Sensitive Personal Data or Information) Rules, 2011</Text> and other relevant regulations.
          </Text>
          <Text style={styles.section}>8. Restrictions on Use</Text>
          <Text style={styles.paragraph}>You agree not to use the Service to:</Text>
          <Text style={styles.paragraph}> ● Violate any applicable law, statute, ordinance, or regulation, including but not limited to
            the <Text style={styles.bullet}> Indian Penal Code (IPC) </Text> and the <Text style={styles.bullet}>Information Technology Act, 2000;</Text></Text>
          <Text style={styles.paragraph}> ● Engagein cybercrimes such as identity theft, fraud, or spreading malware;</Text>
          <Text style={styles.paragraph}> ● Attempt to gain unauthorized access to any account, data, or network related to the
            Service;</Text>
          <Text style={styles.paragraph}>● Harass, defame, or otherwise harm other users or third parties.</Text>
          <Text style={styles.section}>9. User Interactions</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bullet}>● Safety and Responsibility:</Text>
            While <Text style={styles.bullet}>Partner/Partnermy.com</Text> provides a platform for
            individuals to connect, you are responsible for your interactions with other users. Always
            exercise caution when sharing personal information or meeting other users offline.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bullet}>
              ● Reporting Misuse:</Text> If you encounter any misuse or inappropriate behavior, you should
            immediately report it to <Text style={styles.bullet}>Partner/Partnermy.com.</Text> We reserve the right to take action, including
            suspending or terminating accounts involved in violations of these Terms.
          </Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Grievance Redressal:</Text> If you experience any issues with the Service or if you believe
            your privacy or rights have been violated, you can contact <Text style={styles.bullet}>Partner/Partnermy.com’s </Text>
            grievance officer at directconnecte@gmail.com</Text>
          <Text style={styles.section}>10. Payments and Fees</Text>
          <Text style={styles.paragraph}> Certain features or services within the App may require payment. If you make a payment for
            premium features or services, you agree to the terms outlined at the time of purchase, including
            any fees, billing cycles, and cancellation policies.</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>Partner/Partnermy.com </Text> reserves the right to change its pricing or add fees for services with
            prior notice. Payments are processed securely through third-party payment processors, and we
            do not store sensitive financial data like credit card information.
          </Text>
          <Text style={styles.section}>11.  Intellectual Property</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Ownership:</Text> The <Text style={styles.bullet}>Partner/Partnermy.com </Text>Service, including its website, mobile
            application, content, design, and software, is owned by <Text style={styles.bullet}>Direct Connect</Text> and is protected
            by Indian copyright laws and international intellectual property laws.</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● License to Use: Partnermy.com </Text>grants you a limited, non-exclusive, non-transferable,
            revocable license to access and use the Service for personal purposes, subject to
            compliance with these Terms.</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Restrictions:</Text> You are prohibited from copying, distributing, or otherwise using any part
            of the Service without our prior written consent, except as expressly permitted by these
            Terms.</Text>
          <Text style={styles.section}>12.  Disclaimers and Limitation of Liability</Text>
          <Text style={styles.paragraph}><Text style={styles.bullet}>● No Warranty:</Text> The <Text style={styles.bullet}>Partner/Partnermy.com</Text> Service is provided "as is" and "as
            available," without any warranties of any kind, either express or implied. We do not
            guarantee that the Service will meet your expectations, be uninterrupted, or be
            error-free.</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Limitation of Liability:</Text> To the fullest extent permitted by law, <Text style={styles.bullet}>Partner/Partnermy.com </Text>
            and its affiliates, officers, employees, and agents are not liable for any direct, indirect,
            incidental, special, consequential, or punitive damages arising from your use or inability
            to use the Service.</Text>
          <Text style={styles.paragraph}><Text style={styles.bullet}>● Indemnification:</Text> You agree to indemnify and hold harmless<Text style={styles.bullet}> Partner/Partnermy.com </Text>
            and its affiliates from any claims, damages, liabilities, or expenses arising from your
            violation of these Terms or your use of the Service</Text>
          <Text style={styles.section}>13. Suspension and Termination</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Suspension of Access:</Text> We reserve the right to suspend or terminate your access to
            the Service at any time for any reason, including if you violate these Terms or engage in
            behavior that we deem harmful to other users or to the operation of the Service.</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Termination of Agreement:</Text> You can terminate this Agreement at any time by
            deactivating your account or ceasing to use the Service. We may also terminate this
            Agreement if we decide to discontinue the Service or if you violate these Terms.
          </Text>
          <Text style={styles.section}>14.  Changes to the Terms</Text>
          <Text style={styles.paragraph}> We reserve the right to modify or update these Terms at any time. We will notify you of any
            significant changes by posting the revised Terms on the Service. Your continued use of the
            Service after such changes indicates your acceptance of the revised Terms.</Text>
          <Text style={styles.section}>15.  Governing Law and Dispute Resolution</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}> ● Governing Law:</Text> These Terms will be governed by and construed in accordance with the
            laws of India, without regard to its conflict of law principles.</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}> ● Dispute Resolution: </Text>Any disputes arising under or in connection with these Terms will
            be resolved through binding arbitration in Mumbai, India, in accordance with the
            Arbitration and Conciliation Act, 1996</Text>
          <Text style={styles.section}>16.  Contact Information</Text>
          <Text style={styles.paragraph}> If you have any questions or concerns about these Terms, please contact us at:</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Email:</Text> directconnecte@gmail.com</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Phone:</Text> +91 7877479369</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Address:</Text>  Plot No.04, Ram Nagar A, Sojat City, Sojat Main Road, Sojat City, Rajasthan, Pali-306104</Text>
        </Content>
      </Container>
    </>
  );
}

export default TermsofServiceScreen;
