import { StyleSheet } from 'react-native'
import darkColors from 'react-native-elements/dist/config/colorsDark'
import { colors } from '../../styles/colors'

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
  },
  container: {
    width: '100%',
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  description: {
    color: colors.gray,
    marginTop: 8,
  },
  divider: {
    height: 2,
    width: '100%',
    backgroundColor: colors.divider,
    marginVertical: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 8,
    backgroundColor: colors.darkGray,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
})
