import type { FooterProps } from "./types";
import BaseVariant from "./variants/base";

export default function Footer({ data }: { data: any }) {
    const props: FooterProps = data;

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