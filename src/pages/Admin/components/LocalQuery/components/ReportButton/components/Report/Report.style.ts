import { StyleSheet } from '@react-pdf/renderer'

export const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 20,
    padding: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    width: '100%',

    color: '#5059bc',

    borderRadius: 4,
    backgroundColor: '#e5e6f5',
  },
  h1: {
    fontSize: 16,
    fontFamily: 'Helvetica',
    fontWeight: 600,
  },
  by: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    height: 16,
  },
  separator: {
    width: 0.5,
    height: 16,

    backgroundColor: '#5059bc',
  },
  subsecretaria: {
    width: 80,

    fontSize: 8,
    lineHeight: 1.2,
  },
  date: {
    fontSize: 11,
  },
  tableImg: {},
})
