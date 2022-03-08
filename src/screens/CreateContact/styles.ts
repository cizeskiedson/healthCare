import { StyleSheet } from 'react-native'
import { colors } from '../../styles/colors'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 24,
  },
  header: {
    padding: 5,
    textAlign: 'center',
    marginBottom: 8,
    color: colors.gray,
  },
  touchable: {
    backgroundColor: colors.darkGreen,
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  text: { color: colors.white, fontSize: 18, textAlign: 'center' },
})
