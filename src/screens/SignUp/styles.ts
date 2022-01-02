import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  stepStrokeCurrentColor: '#692ACC',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: '#692ACC',
  stepStrokeUnFinishedColor: '#a8a8b3',
  separatorFinishedColor: '#692ACC',
  separatorUnFinishedColor: '#a8a8b3',
  stepIndicatorFinishedColor: '#692ACC',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#692ACC',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#a8a8b3',
  labelSize: 13,
  currentStepLabelColor: '#692ACC',
}
