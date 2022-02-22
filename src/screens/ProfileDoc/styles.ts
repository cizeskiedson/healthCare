import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
  },
  content: { flex: 1 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
  },
  backgroundModal: {
    width: '100%',
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 8,
  },
  textBold: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    color: '#959595',
    marginTop: 8,
  },
  divModal: {
    height: 2,
    width: '100%',
    backgroundColor: '#D9D9D9',
    marginVertical: 20,
  },
})
