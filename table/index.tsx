import ComparisonVariant from './variants/comparison'
import AdvancedVariant from './variants/advanced'
import ProsConsVariant from './variants/pros-cons'
import SimpleVariant from './variants/simple'

import type { TableProps } from './types'

export default function Table({ data }: { data: any }) {
  const props: TableProps = data

  switch (props.variant) {
    case 'comparison':
      return <ComparisonVariant {...props} />
    case 'advanced':
      return <AdvancedVariant {...props} />
    case 'pros-cons':
      return <ProsConsVariant {...props} />
    case 'simple':
      return <SimpleVariant {...props} />
    default:
      return <SimpleVariant {...props} />
  }
}
