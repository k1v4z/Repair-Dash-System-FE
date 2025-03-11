import StoreImage from "@/features/store-detail/components/store-image";
import StoreInformation from "@/features/store-detail/components/store-infomation";
import StoreTabs from "@/features/store-detail/components/store-tab";

const ServiceDetails = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      <div className="flex lg:flex-row flex-col gap-6">
        <StoreImage />
        <StoreInformation />
      </div>
      <StoreTabs />
    </div>
  );
};

export default ServiceDetails;
