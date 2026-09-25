import { services } from "@/config/services";
import ServiceCard from "./ServiceCard";
import SectionHeading from "@/components/ui/SectionHeading";
import type { StartseiteContent } from "@/lib/content";

type ServicesOverviewProps = { data: StartseiteContent["services"] };

export default function ServicesOverview({ data }: ServicesOverviewProps) {
  return (
    <section className="py-16 md:py-24 gradient-section" aria-labelledby="services-heading">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="services-heading"
          as="h2"
          title={data.title}
          subtitle={data.subtitle}
          className="mb-12"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
