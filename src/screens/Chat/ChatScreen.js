import * as React from 'react';
import {Image, Text, TouchableOpacity, View, FlatList} from 'react-native';
import SearchInput from '../../components/SearchInput/Index';
import {Container, Content, Header} from '../../components';
import {chatUserIdData} from '../../assets/data';
import styles from './Styles/ChatStyle';
import {Images} from '../../theme';

function ChatScreen({navigation}) {
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.chatListLink}
      onPress={() => navigation.navigate('chatDetails')}>
      <Image
        // source={item.userImage}
        source={Images.UserImage}
        resizeMode="contain"
        style={styles.chatListUserImg}
      />
      <View style={styles.chatListLinkText}>
        <Text style={styles.chatListLinkNameText}>{item.userName}</Text>
        <Text style={styles.chatListLinkLastSeenText}>{item.userLastSeen}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Chat"
        onBackPress={() => navigation.goBack()}
      />
      <SearchInput
        searchInputStyle={styles.searchInputStyle}
        placeholder="Search"
      />
      <Content contentContainerStyle={styles.container}>
        <FlatList
          bounces={false}
          data={chatUserIdData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </Content>
    </Container>
  );
}

export default ChatScreen;
