import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCheckout } from "@/features/order/hooks/useCheckout";
import { useOrder } from "@/features/order/hooks/useOrder";
import ResourceNotFound from "@/components/common/resource-not-found";
import { toast } from "react-toastify";
import { orderFormSchema, type OrderFormData } from "@/schemas/order";
import CustomerInformationSection from "./_components/customer-information-section";
import ServiceInformationSection from "./_components/service-information-section";
import { useNavigate } from "react-router-dom";
import routePath from "@/config/route";
import ORDER_NOT_FOUND_MESSAGE from "@/features/order/constants/order-notfound-message";

export default function ServiceBookingForm() {
  const { customer, service, errorMessage, status } = useCheckout();
  const navigate = useNavigate();
  const { createOrder, isLoading } = useOrder();

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
  });

  useEffect(() => {
    if (customer) {
      form.reset({
        customer_full_name: customer.user_full_name,
        customer_phone_number: customer.user_phone_number,
        user_street: customer.user_street,
        user_city: customer.user_city,
        user_district: customer.user_district,
        user_ward: customer.user_ward,
        service_id: service?.service_id,
        order_images: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer]);

  const onSubmit = async (data: OrderFormData) => {
    try {
      const response = await createOrder(data);
      if (response?.order_id) {
        navigate(
          routePath.bookingDetail.replace(
            ":orderId",
            response.order_id.toString()
          )
        );
        toast.success("Đặt dịch vụ thành công!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.data.code === -5) {
        toast.warning("Cửa hàng tạm thời không nhận thêm đơn hàng");
      } else {
        toast.error("Có lỗi xảy ra khi đặt dịch vụ. Vui lòng thử lại!");
      }
    }
  };

  if (errorMessage && status != 404 && status != 403) {
    toast.error(errorMessage, {
      toastId: errorMessage,
    });
  }

  return (
    <>
      {status === 404 || status === 403 ? (
        <ResourceNotFound
          title={ORDER_NOT_FOUND_MESSAGE[status].title}
          description={ORDER_NOT_FOUND_MESSAGE[status].description}
          buttonText={ORDER_NOT_FOUND_MESSAGE[status].buttonText}
          onButtonClick={() => navigate(routePath.home)}
        />
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="container mx-auto px-4 pt-4 pb-3">
            <div className="grid lg:grid-cols-2 gap-8">
              {customer && (
                <CustomerInformationSection customer={customer} form={form} />
              )}
              {service && (
                <ServiceInformationSection
                  service={service}
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>
        </form>
      )}
    </>
  );
}
