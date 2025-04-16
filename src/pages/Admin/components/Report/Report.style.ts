import { FontSize, palColorGS, palSize, Size } from '@/styles/palette'
import { StyleSheet } from '@react-pdf/renderer'

export const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 20,
    padding: 20,

    fontFamily: 'Manrope Variable',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: palSize(Size.M),
    width: '100%',

    color: '#5059bc',

    borderRadius: palSize(Size.XS2),
    backgroundColor: '#e5e6f5',
  },
  h1: {
    fontSize: palSize(FontSize.S),
    fontWeight: 700,
  },
  by: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: palSize(Size.XS),
  },
  logo: {
    height: 17,
  },
  separator: {
    top: 1,

    width: 0.5,
    height: 17,

    backgroundColor: '#5059bc',
  },
  subsecretaria: {
    width: 80,

    fontSize: 8,
    lineHeight: 1.2,
    fontWeight: 600,
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 32,

    fontSize: 8,
  },
  pagination: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: palSize(Size.XS3),
    paddingHorizontal: 6,

    borderRadius: palSize(Size.XS3),
    backgroundColor: palColorGS('white'),
  },
  pageNumber: {
    fontWeight: 700,
  },
  paginationSeparator: {
    width: 0.5,
    height: 7,

    backgroundColor: '#e5e6f5',
  },
  date: {},
})
