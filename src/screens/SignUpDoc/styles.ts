import { StyleSheet } from 'react-native'
import { colors } from '../../styles/colors'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 24,
  },
  form: {
    flex: 1,
    marginVertical: 40,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  touchable: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    backgroundColor: colors.darkGreen,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    alignSelf: 'center',
  },
})
