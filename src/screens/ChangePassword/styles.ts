import { StyleSheet } from 'react-native'
import { color } from 'react-native-elements/dist/helpers'
import { colors } from '../../styles/colors'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
  },
  text: {
    textAlign: 'center',
    color: colors.gray,
    marginTop: 8,
  },
  password: {
    paddingTop: 30,
  },
  divider: {
    height: 2,
    width: '100%',
    backgroundColor: colors.divider,
    marginVertical: 10,
  },
  touchable: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    backgroundColor: colors.darkGreen,
    borderRadius: 8,
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
})
