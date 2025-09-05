import {View, Text, FlatList, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, Content, Header} from '../../components';
import DatePickerInput from '../../components/DatePickerInput';
import TextInputScreen from '../../components/SignUpLogIn/TextInput';
import CommanBtnScreen from '../../components/CommanBtn';
import styles from './Styles/ProfileStyle';
import CommanText from '../../components/CommanText';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {
  fatherName,
  motherName,
  selectedMBrother,
  selectedMSister,
  selectedSibling,
  selectedUmBrother,
  selectedUmSister,
} from '../../actions/AppAction';
import Error from '../../components/Error';
import UpdateFamily from '../../api/updateFamily';
import Loading from '../../components/Loading';
import GetFamilyInfo from '../../api/GetFamilyInfo';

const FamilyInformation = props => {
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState();
  const [data, setData] = useState({
    father: '',
    mother: '',
    sibling: '',
  });
  const [data1, setData1] = useState([
    {id: '1', married: '0', unmarried: '0', total: '0'},
    {id: '2', married: '0', unmarried: '0', total: '0'},
  ]);
  useEffect(() => {
    getFamilyInfo();
  }, []);

  const getFamilyInfo = async () => {
    setLoading(true);
    const response = await GetFamilyInfo({token: props.token});
    console.log('get familyinfo api : ', response.data);
    if (response && response.data) {
      setData(response.data);
    } else {
      setError(response.message);
    }

    setLoading(false);
  };
  const [grandTotal, setGrandTotal] = useState(0);
  const handleInputChange = (id, type, value) => {
    const newData1 = data1.map(item => {
      if (item.id === id) {
        if (type === 'married') {
          item.married = value;
          item.total = parseInt(value) + parseInt(item.unmarried);
        } else if (type === 'unmarried') {
          item.unmarried = value;
          item.total = parseInt(value) + parseInt(item.married);
        }
      }
      return item;
    });
    setData1(newData1);
    calculateGrandTotal();
  };
  const calculateGrandTotal = () => {
    const total = data1.reduce((acc, item) => acc + parseInt(item.total), 0);
    setGrandTotal(total);
  };

  const handleTextChange = (key, value) => {
    console.log('key', key, value);
    setData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };
  const NextStep = async () => {
    if (!data.father || !data.mother || !data.sibling) {
      console.log('data if: ', data);
      setError('Please enter details.');
      return;
    }

    const response = await UpdateFamily({data: data, token: props.token});
    console.log('response : ', response);
    if (!response.success) {
      setError(response.message);
      return;
    }
    await props.father(data.father);
    await props.mother(data.mother);
    // await props.selectedMBrother(data.selectedMBrother);
    // await props.selectedUmBrother(data.selectedUmBrother);
    // await props.selectedMSister(data.selectedMSister);
    // await props.selectedUmSister(data.selectedUmSister);
    await props.sibling(data.sibling);

    navigation.navigate('PartnerExpectation');
  };

  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Family Information"
        onBackPress={() => navigation.goBack()}
      />
      <Content contentContainerStyle={styles.container}>
        <Error error={error} />
        <Loading loading={loading} />
        <View style={styles.inputView}>
          <CommanText
            commanText="Father"
            commanTextstyle={styles.birthdayText}
          />
          <TextInputScreen
            defaultInput
            placeholder="father"
            value={data?.father}
            type="default"
            inputStyle={styles.inputStyle}
            onChangeText={text => handleTextChange('father', text)}
          />
          <CommanText
            commanText="Mother"
            commanTextstyle={styles.birthdayText}
          />
          <TextInputScreen
            defaultInput
            placeholder="mother"
            value={data?.mother}
            type="default"
            inputStyle={styles.inputStyle}
            onChangeText={text => handleTextChange('mother', text)}
          />

          <CommanText
            commanText="Sibiling"
            commanTextstyle={styles.birthdayText}
          />
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.header}>
            <Text style={styles.cellHeader}>.</Text>
            <Text style={styles.cellHeader}>Married</Text>
            <Text style={styles.cellHeader}>Unmarried</Text>
            <Text style={styles.cellHeader}>Total</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Brother</Text>
            <TextInput
              style={styles.cellInput}
              value={data1[0].married}
              onChangeText={value => {
                handleInputChange('1', 'married', value),
                  handleTextChange('selectedMBrother', value);
              }}
            />
            <TextInput
              style={styles.cellInput}
              value={data1[0].unmarried}
              onChangeText={value => {
                handleInputChange('1', 'unmarried', value),
                  handleTextChange('selectedUmBrother', value);
              }}
            />
            <Text style={styles.cell}>{data1[0].total}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Sister</Text>
            <TextInput
              style={styles.cellInput}
              value={data1[1].married}
              onChangeText={value => {
                handleInputChange('2', 'married', value),
                  handleTextChange('selectedMSister', value);
              }}
            />
            <TextInput
              style={styles.cellInput}
              value={data1[1].unmarried}
              onChangeText={value => {
                handleInputChange('2', 'unmarried', value),
                  handleTextChange('selectedUmSister', value);
              }}
            />
            <Text style={styles.cell}>{data1[1].total}</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.cell}>
              Grand Total:{' '}
              <Text style={[styles.cell, {color: 'black'}]}>
                {data?.sibling}
              </Text>
            </Text>
            <TextInput editable={false} style={[styles.cell, {color: 'black'}]}>
              {grandTotal}
            </TextInput>
          </View>
        </View>
        <CommanBtnScreen
          btnText="Next"
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={styles.btnStyle}
          onBtnPress={() => NextStep()}
        />
      </Content>
    </Container>
  );
};
function mapStateToProps(state) {
  return {
    token: state.auth.user.access_token,
    father: state.familyInfo.father,
    mother: state.familyInfo.mother,
    selected_m_brother: state.familyInfo.selected_m_brother,
    selected_um_brother: state.familyInfo.selected_um_brother,
    selected_m_sister: state.familyInfo.selected_m_sister,
    selected_um_sister: state.familyInfo.selected_um_sister,
    sibling: state.familyInfo.sibling,
  };
}

const mapDispatchToProps = dispatch => ({
  fatherName: data => dispatch(fatherName(data)),
  motherName: data => dispatch(motherName(data)),
  selectedMBrother: data => dispatch(selectedMBrother(data)),
  selectedUmBrother: data => dispatch(selectedUmBrother(data)),
  selectedMSister: data => dispatch(selectedMSister(data)),
  selectedUmSister: data => dispatch(selectedUmSister(data)),
  selectedSibling: data => dispatch(selectedSibling(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(FamilyInformation);
