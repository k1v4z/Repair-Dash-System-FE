import CustomerInformationSection from "./components/customer-information-section";
import ServiceInformationSection from "./components/service-information-section";

export default function ServiceBookingForm() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid lg:grid-cols-2 gap-8">
        <CustomerInformationSection />
        <ServiceInformationSection />
      </div>
    </div>
  );
}
