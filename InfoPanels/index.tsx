import GridVariant from './variants/grid'
import Grid2Variant from './variants/grid-2'
import Grid3Variant from './variants/grid-3'
import Grid4Variant from './variants/grid-4'
import Grid5Variant from './variants/grid-5'
import TabsVariant from './variants/tabs'
import HubVariant from './variants/hub'
import HorizontalStepVariant from './variants/horizontal-step'
import TimelineVariant from './variants/timeline'
import Timeline2Variant from './variants/timeline-2'
import StepperVariant from './variants/stepper'

import type { InfoPanelsProps } from './types'

export default function InfoPanels({ data }: { data: any }) {
  const props: InfoPanelsProps = data

  switch (props.variant) {
    case 'grid':
      return <GridVariant {...props} />
    case 'grid-2':
      return <Grid2Variant {...props} />
    case 'grid-3':
      return <Grid3Variant {...props} />
    case 'grid-4':
      return <Grid4Variant {...props} />
    case 'grid-5':
      return <Grid5Variant {...props} />
    case 'tabs':
      return <TabsVariant {...props} />
    case 'timeline':
      return <TimelineVariant {...props} />
    case 'timeline-2':
      return <Timeline2Variant {...props} />
    case 'horizontal-step':
      return <HorizontalStepVariant {...props} />
    case 'hub':
      return <HubVariant {...props} />
    case 'stepper':
      return <StepperVariant {...props} />
    default:
      return <GridVariant {...props} />
  }
}
