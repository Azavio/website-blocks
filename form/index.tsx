import type { FormProps } from "./types";
import BaseVariant from "./variants/base";

export default function Form({ data }: { data: any }) {
  const props: FormProps = data;

  switch (props.variant) {
    case "base":
      return <BaseVariant {...props} />;
    // Futures variantes
    // case "minimal":
    //   return <MinimalVariant {...props} />;
    // case "wizard":
    //   return <WizardVariant {...props} />;
    // case "survey":
    //   return <SurveyVariant {...props} />;
    default:
      return <BaseVariant {...props} />;
  }
}