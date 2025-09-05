import { View, Text } from 'react-native'
import React from 'react'
import { Container, Header } from '../../components';
import CommanBtnScreen from '../../components/CommanBtn';

const MessageScreen = (props) => {
  return (
    <View>
    <Header/>
    <CommanBtnScreen btnText='Profile' onBtnPress={()=>props.navigation.navigate('ProfileDetails')} />
      
    </View>
  )
}

export default MessageScreen;