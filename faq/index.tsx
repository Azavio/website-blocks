import type { FAQProps } from "./types";
import AccordionOutlineVariant from "./variants/accordion-outline";

export default function Form({ data }: { data: any }) {
  const props: FAQProps = data;

  switch (props.variant) {
    case "accordion-outline":
      return <AccordionOutlineVariant {...props} />;
    // Futures variantes
    // case "minimal":
    //   return <MinimalVariant {...props} />;
    // case "wizard":
    //   return <WizardVariant {...props} />;
    // case "survey":
    //   return <SurveyVariant {...props} />;
    default:
      return <AccordionOutlineVariant {...props} />;
  }
}