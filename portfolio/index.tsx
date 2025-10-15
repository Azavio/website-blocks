import type { PortfolioProps } from "./types";
import GridVariant from "./variants/grid";

export default function InfoPanels({ data }: { data: any; }) {

  const props: PortfolioProps = (data);
  return <GridVariant {...props} />;
}