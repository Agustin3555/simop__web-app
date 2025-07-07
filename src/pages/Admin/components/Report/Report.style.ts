import { FontSize, palColor, palColorGS, palSize, Size } from '@/styles/palette'
import { StyleSheet } from '@react-pdf/renderer'

export const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: palSize(Size.M),
    padding: palSize(Size.XS),

    fontFamily: 'Manrope Variable',
    color: palColor('AD1'),
  },
  header: {
    flexShrink: 0,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: palColor('AL5'),
    width: '100%',

    borderRadius: palSize(Size.XS2),
    overflow: 'hidden',
  },
  group: {
    flexShrink: 0,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: palSize(Size.XS),
    paddingLeft: palSize(Size.S),
    width: '100%',

    backgroundColor: palColor('AL5'),
  },
  h1: {
    fontSize: palSize(FontSize.XS),
    fontWeight: 850,
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
    fontWeight: 650,
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
    fontWeight: 850,
  },
  paginationSeparator: {
    width: 0.5,
    height: 7,

    backgroundColor: palColor('AL2'),
  },
  date: {},
  warning: {
    paddingVertical: palSize(Size.XS2),
    width: '100%',

    fontSize: 8,
    fontWeight: 650,
    textAlign: 'center',
    textTransform: 'uppercase',

    borderRadius: palSize(Size.XS3),
    backgroundColor: palColorGS('white'),
  },
  content: {
    flex: 1,

    width: '100%',
  },
})
