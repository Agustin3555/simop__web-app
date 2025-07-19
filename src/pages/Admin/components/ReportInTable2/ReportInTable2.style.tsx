import { FontSize, palColor, palColorGS, palSize, Size } from '@/styles/palette'
import { StyleSheet } from '@react-pdf/renderer'

export const styles = StyleSheet.create({
  table: {
    display: 'flex',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    width: 'auto',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    padding: 4,
    height: 29,
    width: 10,

    fontSize: 10,
  },
  header: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
})
