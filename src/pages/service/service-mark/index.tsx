import ServiceMarkItem from "./_components/service-mark-item";

const SERVICE_MARK_LIST = [
  {
    service_id: 1,
    service_name: "Lắp đặt máy nước nóng",
    service_alias: "lap-dat-may-nong",
    user_full_name: "Điện máy xanh",
    service_image_url: null,
    average_rating: 4.8,
    owner_id: 7,
  },
  {
    service_id: 2,
    service_name: "Lắp đặt máy nước nóng",
    service_alias: "lap-dat-may-nong",
    user_full_name: "Điện máy xanh",
    service_image_url: null,
    average_rating: 4.8,
    owner_id: 7,
  },
  {
    service_id: 3,
    service_name: "Lắp đặt máy nước nóng",
    service_alias: "lap-dat-may-nong",
    user_full_name: "Điện máy xanh",
    service_image_url: null,
    average_rating: null,
    owner_id: 7,
  },
  {
    service_id: 4,
    service_name: "Lắp đặt máy nước nóng",
    service_alias: "lap-dat-may-nong",
    user_full_name: "Điện máy xanh",
    service_image_url: null,
    average_rating: null,
    owner_id: 7,
  },
  {
    service_id: 5,
    service_name: "Lắp đặt máy nước nóng",
    service_alias: "lap-dat-may-nong",
    user_full_name: "Điện máy xanh",
    service_image_url: null,
    average_rating: null,
    owner_id: 7,
  },
  {
    service_id: 6,
    service_name: "Lắp đặt máy nước nóng",
    service_alias: "lap-dat-may-nong",
    user_full_name: "Điện máy xanh",
    service_image_url: null,
    average_rating: null,
    owner_id: 7,
  },
];

const ServiceMark = () => {
  return (
    <div className="max-w-7xl mt-5 mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-primary-royalBlue text-center">
        Dịch vụ yêu thích
      </h1>
      <div className="space-y-1 rounded shadow p-6 border">
        {SERVICE_MARK_LIST.length > 0 ? (
          SERVICE_MARK_LIST.map((service) => {
            return (
              <ServiceMarkItem key={service.service_id} service={service} />
            );
          })
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>Bạn chưa có dịch vụ yêu thích nào.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceMark;
