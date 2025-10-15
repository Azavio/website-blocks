import type { HeroProps } from "./types";
import BaseVariant from "./variants/base";

export default function InfoPanels({ data }: { data: any; }) {

  const props: HeroProps = (data);
  return <BaseVariant {...props} />;
}