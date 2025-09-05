import { Dimensions, StyleSheet, Text, View } from 'react-native'

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fefefe',
    //paddingTop: 20,
    // paddingHorizontal: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 20,
  },
 
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginHorizontal:2,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#8e44ad',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  time: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
  storyImage: {
    width,
    height,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  userStoryContainer: {
    width,
    height,
    backgroundColor: '#000',
  },
  userStoryName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 30,
    marginLeft:10,
  },
  userStorytime: {
    color: '#ddd',
    fontSize: 14,
  },
})

export default styles
