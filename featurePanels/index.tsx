import ExpertiseCardsVariant from './variants/expertise-cards'
import ExpertiseCards2Variant from './variants/expertise-cards-2'
import type { FeaturePanelsProps } from './types'

export default function InfoPanels({ data }: { data: any }) {
  const props: FeaturePanelsProps = data

  switch (props.variant) {
    case 'expertise-cards':
      return <ExpertiseCardsVariant {...props} />
    case 'expertise-cards-2':
      return <ExpertiseCards2Variant {...props} />

    default:
      return <ExpertiseCardsVariant {...props} />
  }
}
