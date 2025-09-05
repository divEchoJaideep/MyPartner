import * as React from 'react';
import { useState } from 'react';
import { View, Image } from 'react-native';
import DatePicker from 'react-native-date-picker';
import TextInput from '../SignUpLogIn/TextInput';
import { navigate } from '../../navigation/ReduxNavigation';
import { Images } from '../../theme';
import styles from './Styles/index';

function DatePickerInput(props) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  React.useEffect(() => {
    if (props?.date) {
      setDate(new Date(props?.date));
    } else {
      setDate(new Date());
    }
  }, [props?.date]);
  return (
    <>
      <View>
        <TextInput
          datePickerInput
          navigation={navigate}
          inputStyle={[styles.profileInputStyle, props.datePickerInputStyle]}
          placeholder="Birth Date"
          type="default"
          
          onPress={() => setOpen(true)}
        />
        <Image
          source={Images.DatePickerIcon}
          resizeMode="contain"
          style={styles.datePickerIconStyle}
        />
      </View>
      <DatePicker
        modal
        open={open}
        date={date1}
        mode="date"
        onConfirm={(date) => {
          setOpen(false);
          setDate1(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
}

export default DatePickerInput;