import { StyleSheet } from 'react-native';

export const moduleCardLinkStyles = StyleSheet.create({
  link: {
    marginBottom: 10,
    alignSelf: 'center',
  },
  container: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 1,
    flexDirection: 'row',
    height: 160,
  },
  thumbnail: {
    width: 150,
    height: 150,
    borderRadius: 7.5,
    borderBottomRightRadius: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
    paddingHorizontal: 10,
    width: 300,
    fontFamily: 'Poppins',
  },
  submodulesCount: {
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'gray',
    fontFamily: 'Poppins',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  authorAvatar: {
    width: 42,
    height: 42,
    borderRadius: 10,
    borderBottomLeftRadius: 2,
    marginRight: 10,
  },
  authorName: {
    color: 'gray',
    fontFamily: 'Poppins',
  },
  updatedAt: {
    color: 'gray',
    fontFamily: 'Poppins',
    fontSize: 12,
  },
});
