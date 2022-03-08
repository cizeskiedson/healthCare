import { StyleSheet } from 'react-native'
import { colors } from '../../styles/colors'

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: colors.darkBlue,
  },
  titleBold: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.darkGreen,
  },
  group: {
    // backgroundColor: 'red',
    width: 100,
    height: 30,
  },
})
