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
  stepStrokeCurrentColor: '#38A169',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: '#38A169',
  stepStrokeUnFinishedColor: '#F0FFF4',
  separatorFinishedColor: '#38A169',
  separatorUnFinishedColor: '#F0FFF4',
  stepIndicatorFinishedColor: '#38A169',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#38A169',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#F0FFF4',
  labelSize: 13,
  currentStepLabelColor: '#38A169',
}
