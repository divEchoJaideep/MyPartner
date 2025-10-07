import * as React from 'react';
import { Text } from 'react-native';
import { Container, Header, Content } from '../../components';
import { navigate } from '../../navigation/ReduxNavigation';
import CommanHeading from '../../components/CommanHeading';
import styles from './Styles/TermsofServiceStyle';

function BeSafe({ navigation }) {
  return (
    <>
      <Container paddingBottomContainer={true}>
        <Header
          transparent
          hasBackBtn
          title="Safety Center"
          onBackPress={() => navigation.goBack()}
        />
        <Content hasHeader contentContainerStyle={styles.container}>
          {/* <CommanHeading
            headingText
            heading="Terms of service for non-indian users"
            navigation={navigate}
          /> */}
          <Text style={styles.section}>Be Safe Online with Partner/Partnermy.com</Text>
          <Text style={styles.paragraph}> At <Text style={styles.bullet}>Partner/Partnermy.com</Text>, we are dedicated to providing you with a secure and trustworthy
            platform to find your life partner. While we implement robust abuse-prevention measures and
            reporting systems to protect users, we also recognize that ensuring your safety and privacy
            requires mutual effort. Therefore, it’s essential for you to follow some basic precautions to
            maintain a safe and enjoyable experience</Text>
          <Text style={styles.section}>Guidelines to Protect Your Privacy</Text>
          <Text style={styles.paragraph}><Text style={styles.bullet}> 1. Guard Your Anonymity</Text></Text>
          <Text style={styles.paragraph}> Our system allows for anonymous interactions, such as sending connection invitations and
            accepting or declining requests, to protect your identity until you decide to share it.</Text>
          <Text style={styles.paragraph}><Text style={styles.bullet}>  ● Do:</Text></Text>
          <Text style={styles.paragraph}>  ○ Remember, you are always in control of your privacy. Adjust your settings to
            reflect your personal preferences and safeguard your information.</Text>
          <Text style={styles.paragraph}><Text style={styles.bullet}>  ● Don't:</Text></Text>
          <Text style={styles.paragraph}> ○ Avoid sharing personal contact details (like your name, email, phone number,
            address, workplace, etc.) in your initial communications.</Text>
          <Text style={styles.paragraph}> ○ Never share your personal information until you feel confident and trust the
            person you're communicating with.</Text>
          <Text style={styles.paragraph}><Text style={styles.bullet}> 2. Start Slow– Use Email First</Text></Text>
          <Text style={styles.paragraph}> Consider setting up a separate email account for communication. Trust your instincts and begin
            by exchanging only your email address.</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Do:</Text></Text>
          <Text style={styles.paragraph}>  ○ Communicate initially through email. Take your time to get to know the person
            before revealing any sensitive details.</Text>
          <Text style={styles.paragraph}> ○ Payattention to odd or inconsistent behavior. Serious individuals will respect your
            pace.</Text>
          <Text style={styles.paragraph}>  ○ Ask a friend or family member to review your email communications to help
            identify any warning signs.</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Don't:</Text></Text>
          <Text style={styles.paragraph}>  ○ Don’t include your phone number, address, or other identifying details in your
            email signature.</Text>
          <Text style={styles.paragraph}>  ○ Don’t use your primary or work email for communicating with someone you don’t
            know well.</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}> 3. Request a Photo</Text></Text>
          <Text style={styles.paragraph}>  Requesting photos helps you get a clearer idea of the other person’s appearance and may help
            confirm your instincts about them.</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Do:</Text></Text>
          <Text style={styles.paragraph}> ○ Ask for clear and varied photos to get an accurate sense of the person's
            appearance.</Text>
          <Text style={styles.paragraph}> ○ If the other person consistently avoids sharing pictures or provides excuses, this
            could be a red flag.</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>4. Chat on the Phone– But Protect Your Number</Text></Text>
          <Text style={styles.paragraph}> A phone conversation can give you a sense of the other person’s communication skills, but
            remember to keep your personal phone number safe.</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Do:</Text></Text>
          <Text style={styles.paragraph}> ○ Use a prepaid or virtual phone number to protect your privacy. Only share your
            phone number when you feel fully comfortable.</Text>
          <Text style={styles.paragraph}>○ If you receive a phone number with a suspicious area code, verify it before
            calling.</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>5. Meet When You Are Ready</Text></Text>
          <Text style={styles.paragraph}> Online relationships offer the flexibility to take things at your own pace. You’re never obligated to
            meet anyone in person until you’re truly ready.</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Do:</Text></Text>
          <Text style={styles.paragraph}> ○ Trust your instincts when deciding if and when to move your relationship offline.</Text>
          <Text style={styles.paragraph}> ○ Even if you decide to meet, you always have the right to change your mind. Trust
            yourself, and go at your own pace.</Text>
          <Text style={styles.paragraph}> ○ Consider meeting in a safe, public place when the time feels right.</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>6. Meet in a Safe Place</Text></Text>
          <Text style={styles.paragraph}> For your first in-person meeting, choose a public location and inform a trusted friend or family
            member about your plans.</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Do:</Text></Text>
          <Text style={styles.paragraph}> ○ Meet in a public place (e.g., café, restaurant) with lots of people around. Make
            sure you have your own transportation to and from the venue.</Text>
          <Text style={styles.paragraph}> ○ For added safety, take a trusted friend or relative along, or inform someone close
            to you about the meeting details, including location, time, and the other person's
            contact information.</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Don't:</Text></Text>
          <Text style={styles.paragraph}> ○ Do not agree to be picked up or dropped off at home by someone you’ve just
            met.</Text>
          <Text style={styles.paragraph}> ○ Avoid secluded areas or private places for the first meeting.</Text>
          <Text style={styles.paragraph}><Text style={styles.bullet}> 7. Watch for Warning Signs</Text></Text>
          <Text style={styles.paragraph}>Be aware of any behavior that seems suspicious or makes you feel uncomfortable.</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Do:</Text></Text>
          <Text style={styles.paragraph}>  ○ Ask lots of questions and be mindful of inconsistent or evasive answers. This can
            help you detect potential red flags.</Text>
          <Text style={styles.paragraph}>  ○ Pay attention to signs of controlling behavior, anger, or manipulation. Respect for
            boundaries is crucial in any relationship.</Text>
          <Text style={styles.paragraph}> ○ Involve your family or trusted friends in your journey to find a life partner. Don’t
            make decisions in isolation.</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Don't:</Text></Text>
          <Text style={styles.paragraph}> ○ Don’t ignore behavior that raises doubts, such as inconsistent details about age,
            job, interests, or relationship status.</Text>
          <Text style={styles.paragraph}> ○ Becautious if the person avoids introducing you to friends, family, or colleagues.</Text>
          <Text style={styles.paragraph}><Text style={styles.bullet}>8. Beware of Money Scams</Text></Text>
          <Text style={styles.paragraph}>Fraudulent individuals may attempt to exploit online relationships for financial gain. Be cautious
            of anyone asking for money.</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Do:</Text></Text>
          <Text style={styles.paragraph}> ○ Always be wary of requests for money, no matter the situation. A genuine person
            will never ask you for money.</Text>
          <Text style={styles.paragraph}> ○ Never pay for anything that seems too good to be true.</Text>
          <Text style={styles.paragraph}>  ○ If someone asks for money or makes suspicious financial requests, immediately
            report the situation to <Text style={styles.bullet}>Partner/Partnermy.com</Text></Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>● Don't:</Text></Text>
          <Text style={styles.paragraph}> ○ Do not fall for emotional manipulation or rapid attempts to form a deep
            connection. Scammers often shower affection early and then disappear.</Text>
          <Text style={styles.paragraph}> ○ Takeyour time in getting to know someone and trust your judgment.</Text>
          <Text style={styles.section}> Grievance Redressal & Reporting</Text>
          <Text style={styles.paragraph}> If you encounter any misuse or feel that someone is violating your privacy or safety, please
            follow these steps to file a complaint:</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>1. Report Misuse:</Text></Text>
          <Text style={styles.paragraph}> ○ Visit the profile of the user involved and report any suspicious or inappropriate activity.</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>2. Complaint Action:</Text></Text>
          <Text style={styles.paragraph}> ○ Our Safety Desk will investigate the complaint and take appropriate action. You
            will receive an email notification regarding the status of your complaint</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}>3. Escalate if Needed:</Text></Text>
          <Text style={styles.paragraph}> ○ If you’re not satisfied with the resolution, you can escalate your complaint by
            using the Ticket ID provided and writing to our Grievance Officer at directconnecte@gmail.com</Text>
          <Text style={styles.paragraph}> <Text style={styles.bullet}> 4. Assistance to Authorities:</Text></Text>
          <Text style={styles.paragraph}>  ○ Wefully cooperate with law enforcement agencies, including the <Text style={styles.bullet}>Cyber Crime
            Investigation Cell</Text> or any statutory investigation authority, in cases of fraud or
            misuse. We will provide necessary assistance to these authorities as required.</Text>
          <Text style={styles.section}> Legal Compliance</Text>
          <Text style={styles.paragraph}><Text style={styles.bullet}> Partner/Partnermy.com</Text> is committed to upholding the standards outlined in <Text style={styles.bullet}> the Indian Penal
            Code (IPC) </Text>and <Text style={styles.bullet}>Information Technology Act, 2000 (IT Act)</Text> This includes complying with
            regulations surrounding online safety, privacy protection, and data security</Text>
        </Content>
      </Container>
    </>
  );
}

export default BeSafe;
