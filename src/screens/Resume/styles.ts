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
  button: {
    backgroundColor: colors.darkGreen,
    padding: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  content: {
    flex: 1,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  box: {
    backgroundColor: colors.lightGray,
    flex: 1,
    borderRadius: 8,
    marginBottom: 5,
  },
  input: {
    padding: 5,
  },
  inputActivity: {
    fontSize: 50,
    fontFamily: 'sans-serif-medium',
  },
  textInBox: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  textInBoxReverse: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 5,
  },
  activityText: {
    padding: 5,
    paddingTop: 40,
    color: colors.darkGray,
    fontWeight: 'bold',
  },
})
