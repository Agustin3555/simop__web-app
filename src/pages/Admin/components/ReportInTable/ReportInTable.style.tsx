import { palColor, palColorGS, palSize, Size } from '@/styles/palette'
import { StyleSheet } from '@react-pdf/renderer'

export const styles = StyleSheet.create({
  props: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: palSize(Size.S) * 2,
    rowGap: palSize(Size.XS),
    padding: palSize(Size.S),

    fontWeight: 500,

    backgroundColor: palColor('BL5'),
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: palSize(Size.XS),
  },
  title: {
    color: palColor('BD4'),
  },
  values: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: palSize(Size.XS2),
  },
  valueContainer: {
    paddingHorizontal: 6,
    paddingTop: palSize(Size.XS3) - 1,
    paddingBottom: palSize(Size.XS3),

    borderRadius: palSize(Size.XS3),
    backgroundColor: palColorGS('white'),
  },
  table: {
    padding: palSize(Size.S),
    paddingTop: 0,

    fontWeight: 500,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    gap: palSize(Size.XS),
    borderBottomWidth: palSize(Size.XS3),
    borderColor: palColor('BL3'),
    paddingBottom: 7,

    textTransform: 'uppercase',
    fontWeight: 850,
    color: palColor('BD4'),
  },
  body: {
    display: 'flex',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: palSize(Size.XS),
    borderBottomWidth: 1,
    borderColor: palColor('AL4'),
    paddingTop: 6,
    paddingBottom: 7,
  },
  cell: {},

  graphs: {
    position: 'relative',

    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: palSize(Size.S),
  },
  graphItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: palSize(Size.S),
  },
  column: {
    alignSelf: 'center',

    textTransform: 'uppercase',
    fontWeight: 850,
    color: palColor('BD4'),
  },
  mode: {
    position: 'absolute',
    right: 0,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: palSize(Size.XS),
  },
  modeValue: {
    paddingHorizontal: 6,
    paddingTop: palSize(Size.XS3) - 1,
    paddingBottom: palSize(Size.XS3),

    borderRadius: palSize(Size.XS3),
    backgroundColor: palColor('AL5'),
  },
  img: {
    objectFit: 'contain',
  },
})
