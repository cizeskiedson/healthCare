import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
  },
  touchable: {
    backgroundColor: '#00042C',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  content: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#d9d9d9',
    padding: 14,
    borderRadius: 8,
  },
  cardTitle: {
    marginBottom: 6,
    flexDirection: 'row',
  },
  descriptionBold: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  description: {
    maxWidth: 220,
  },
  actions: {
    justifyContent: 'center',
    alignContent: 'center',
  },
})
