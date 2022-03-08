import { StyleSheet } from 'react-native'
import { colors } from '../../styles/colors'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 24,
  },
  title: {},
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  form: {
    flex: 1,
    marginTop: 40,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

export const stepStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: colors.darkGreen,
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: colors.darkGreen,
  stepStrokeUnFinishedColor: colors.gray,
  separatorFinishedColor: colors.darkGreen,
  separatorUnFinishedColor: colors.gray,
  stepIndicatorFinishedColor: colors.darkGreen,
  stepIndicatorUnFinishedColor: colors.white,
  stepIndicatorCurrentColor: colors.white,
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: colors.darkGreen,
  stepIndicatorLabelFinishedColor: colors.darkGray,
  stepIndicatorLabelUnFinishedColor: colors.gray,
  labelColor: colors.gray,
  labelSize: 13,
  currentStepLabelColor: colors.darkGreen,
}
