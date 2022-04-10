import { StyleSheet } from 'react-native'
import { colors } from '../../styles/colors'

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 24,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 1,
    height: 160,
    marginBottom: -140,
  },
  headerOptions: {
    fontWeight: 'bold',
  },
  radialOption: {
    flexDirection: 'row',
    marginHorizontal: 14,
  },
  textOption: {
    paddingVertical: 8,
    fontSize: 14,
  },
  divider: {
    height: 2,
    width: '100%',
    backgroundColor: colors.divider,
    marginVertical: 20,
    marginTop: 50,
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
    marginBottom: 10,
  },
  input: {
    padding: 5,
  },
  dataTitle: {
    fontWeight: 'bold',
    padding: 5,
  },
  selectFilter: {
    color: colors.darkGray,
    fontSize: 16,
    alignSelf: 'center',
  },
})
