import { StyleSheet } from 'react-native';

export const postCategoryCardLinkStyles = StyleSheet.create({
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
    display: 'flex',
    height: 160,
    width: '100%',
    marginBottom: 10,
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
    fontFamily: 'Poppins',
    width: '100%',
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
