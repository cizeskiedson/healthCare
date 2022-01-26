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
  stepStrokeCurrentColor: '#1dd3f8',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: '#00042c',
  stepStrokeUnFinishedColor: '#d1f6fd',
  separatorFinishedColor: '#1dd3f8',
  separatorUnFinishedColor: '#d1f6fd',
  stepIndicatorFinishedColor: '#1abddf',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#1dd3f8',
  stepIndicatorLabelFinishedColor: '#00042c',
  stepIndicatorLabelUnFinishedColor: '#d1f6fd',
  labelColor: '#d1f6fd',
  labelSize: 13,
  currentStepLabelColor: '#1dd3f8',
}
