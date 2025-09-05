import * as React from 'react';
import {Text} from 'react-native';
import {Container, Header, Content} from '../../components';
import {navigate} from '../../navigation/ReduxNavigation';
import CommanHeading from '../../components/CommanHeading';
import styles from './Styles/TermsofServiceStyle';

function TermsofServiceScreen({navigation}) {
  return (
    <>
      <Container>
        <Header
          transparent
          hasBackBtn
          title="Terms of Service"
          onBackPress={() => navigation.goBack()}
        />
        <Content hasHeader contentContainerStyle={styles.container}>
          <CommanHeading
            headingText
            heading="Terms of service for non-indian users"
            navigation={navigate}
          />
          <Text style={styles.termsServiceText}>
            Lorem ipsum dolor sit amet, consectetur adipiscin elit. Cras felis
            orci, tempor in dui nec, rhoncus mole sem. Proin sit amet ex pretium
            nulla condimentum cursus id vitae ipsum. Nam at nisi nec orci
            volutpat bibendum. Nullam leo lacus, elementum id elemen vel,
            hendrerit id lectus. Curabitur at placerat orci, id tincidunt justo.
            Etiam in cursus elit, vel aliquet lectu.{' '}
            <Text style={styles.termsServiceTextLink}>Aliquam volutpat</Text> mi
            sed urna pulvinar, ac venenatis libero faucibus. Integer eleifend eu
            elementu pulvinar. Mauris in quam eget dolor vehicula dapibu sed vel
            tellus. Nam <Text style={styles.termsServiceTextLink}>maximus</Text>{' '}
            odio augue, a sagittise augue accumsan at. Mauris suscipit commodo
            laci In vitae eros dictum, interdum mauris ac.
          </Text>
          <Text style={styles.termsServiceText}>
            Lorem ipsum dolor sit amet, consectetur adipiscin elit. Cras felis
            orci, tempor in dui nec, rhoncus mole sem. Proin sit amet ex pretium
            nulla condimentum cursus id vitae ipsum. Nam at nisi nec orci
            volutpat bibendum. Nullam leo lacus, elementum id{' '}
            <Text style={styles.termsServiceTextLink}>elemen</Text> vel,
            hendrerit id lectus.
          </Text>
          <Text style={styles.termsServiceText}>
            Lorem ipsum dolor sit amet, consectetur adipiscin elit. Cras felis
            orci, tempor in dui nec, rhoncus mole sem. Proin sit amet ex pretium
            nulla condimentum cursus id vitae ipsum. Nam at nisi nec orci
            volutpat bibendum. Nullam leo lacus, elementum id elemen vel,
            hendrerit id lectus. Curabitur at placerat orci, id tincidunt justo.{' '}
            <Text style={styles.termsServiceTextLink}>Etiam</Text> in cursus
            elit, vel aliquet lectu. Aliquam volutpat mi sed urna pulvinar, ac
            venenatis libero faucibus. Integer eleifend lorem eu elementu
            elementu pulvinar. Mauris in quam eget dolor vehicula dapibu sed vel
            vel tellus. Nam maximus odio augue, a sagittise augue accumsan at.
            Mauris suscipit commodo laci In vitae eros dictum, interdum mauris
            ac.
          </Text>
        </Content>
      </Container>
    </>
  );
}

export default TermsofServiceScreen;
