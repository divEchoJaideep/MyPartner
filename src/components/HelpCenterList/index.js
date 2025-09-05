import * as React from 'react';
import {useState} from 'react';
import {Text, Image, View, TouchableOpacity, FlatList} from 'react-native';
import {Images} from '../../theme';
import styles from './Styles/index';

function HelpCenterList({
  helpCenterArticleList,
  helpCenterTopicList,
  helpCenterList,
  helpCenterArticleTextImg,
  helpCenterTopicTextImg,
}) {
  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.recommendedArticalLinks}>
      {helpCenterArticleTextImg && (
        <>
          <Text style={styles.recommendedArticalLinkText}>{item.name}</Text>
          <Image
            source={item.image}
            resizeMode="contain"
            style={styles.rightArrow}
          />
        </>
      )}
      {helpCenterTopicTextImg && (
        <>
          <Image
            source={item.image}
            resizeMode="contain"
            style={styles.topicImg}
          />
          <Text style={[styles.recommendedArticalLinkText, styles.topicText]}>
            {item.name}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
  return (
    <>
      {helpCenterArticleList && (
        <FlatList data={helpCenterList} renderItem={renderItem} />
      )}
      {helpCenterTopicList && (
        <FlatList data={helpCenterList} renderItem={renderItem} />
      )}
    </>
  );
}

export default HelpCenterList;
