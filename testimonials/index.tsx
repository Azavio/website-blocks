import Carouselariant from "./variants/carousel";

import type { TestimonialsProps } from "./types";

export default function InfoPanels({ data }: { data: any; }) {

  const props: TestimonialsProps = (data);

  switch (props.variant) {
    case "carousel": return <Carouselariant {...props} />;
    default:
      return <Carouselariant {...props} />;
  }
}