import { FontSize, palColor, palColorGS, palSize, Size } from '@/styles/palette'
import { StyleSheet } from '@react-pdf/renderer'

export const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: palSize(Size.S),
    padding: palSize(Size.S),

    fontFamily: 'Manrope Variable',
  },
  header: {
    flexShrink: 0,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: palSize(Size.S),
    padding: palSize(Size.S),
    width: '100%',

    color: palColor('AD1'),

    borderRadius: palSize(Size.XS2),
    backgroundColor: palColor('AL5'),
  },
  group: {
    flexShrink: 0,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
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

    backgroundColor: palColor('A'),
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

    backgroundColor: palColor('AL2'),
  },
  date: {},
  warning: {
    paddingTop: palSize(Size.XS3),
    paddingBottom: 3,
    width: '100%',

    fontSize: 8,
    fontWeight: 600,
    textAlign: 'center',

    borderRadius: palSize(Size.XS3),
    backgroundColor: palColorGS('white'),
  },
  content: {
    flex: 1,

    width: '100%',
  },
})
