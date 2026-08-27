import { ServiceDTO } from "./types";
import { SERVICE_DESCRIPTIONS_EN } from "@/data/serviceDescriptionsEn";
import { PRICE_FROM_EN, FREE_OPTION_EN } from "@/data/servicePricingEn";

/** Returns an English-facing copy of a service's display strings, falling back to the Russian originals for anything not yet translated. */
export function localizeServiceEn(service: ServiceDTO): ServiceDTO {
  return {
    ...service,
    description: SERVICE_DESCRIPTIONS_EN[service.slug] ?? service.description,
    priceFrom: PRICE_FROM_EN[service.slug] ?? service.priceFrom,
    freeOption: service.freeOption
      ? (FREE_OPTION_EN[service.slug] ?? service.freeOption)
      : service.freeOption,
  };
}
