import type { PortfolioProps } from './types'
import BaseVariant from './variants/base'

export default function InfoPanels({ data }: { data: any }) {
  const props: PortfolioProps = data
  return <BaseVariant {...props} />
}
