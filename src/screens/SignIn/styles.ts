import { StyleSheet } from 'react-native'
import { colors } from '../../styles/colors'

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 24,
    justifyContent: 'center',
  },
  illustration: {
    width: 300,
    height: 240,
    alignSelf: 'center',
    marginVertical: 40,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  button: {
    backgroundColor: colors.darkGreen,
    padding: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  signup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
    alignItems: 'center',
  },
  signuptext: {
    margin: 4,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#959595',
  },
})
