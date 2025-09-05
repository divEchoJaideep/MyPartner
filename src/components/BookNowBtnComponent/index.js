import * as React from 'react';
import {useState} from 'react';
import {Text, View} from 'react-native';
import CommanBtn from '../CommanBtn';
import styles from './Styles/Index';

function BookNowBtnComponent({onConfirmPayClick, bookNowBtnContentStyle}) {
  const [bookBtnSet, setBookBtnSet] = useState(true);
  return (
    <>
      <View style={[styles.bookNowBtnContent, bookNowBtnContentStyle]}>
        {bookBtnSet ? (
          <>
            <CommanBtn
              btnText="Book Now"
              commanBtnStyle={styles.bookNowBtn}
              onBtnPress={() => setBookBtnSet(false)}
            />
            <View style={styles.bookNowBtnPriceTexts}>
              <Text style={styles.bookNowBtnPriceText}>$ 170</Text>
              <Text style={styles.bookNowBtnPricePerText}>/per month</Text>
            </View>
          </>
        ) : (
          <CommanBtn
            btnText="Confirm and pay"
            commanBtnStyle={styles.confirmPayBtn}
            onBtnPress={() => {
              if (onConfirmPayClick) {
                onConfirmPayClick();
              }
            }}
          />
        )}
      </View>
    </>
  );
}

export default BookNowBtnComponent;
