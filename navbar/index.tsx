import type { NavbarProps } from "./types";
import BaseVariant from "./variants/base";

export default function Navbar({ data }: { data: any }) {
  const props: NavbarProps = data;

  switch (props.variant) {
    case "base":
      return <BaseVariant {...props} />;
    // Futures variantes
    // case "minimal":
    //   return <MinimalVariant {...props} />;
    // case "centered":
    //   return <CenteredVariant {...props} />;
    default:
      return <BaseVariant {...props} />;
  }
}