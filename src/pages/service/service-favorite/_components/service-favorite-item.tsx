import { useState } from "react";
import { Link } from "react-router-dom";
import Icons from "@/components/icons";
import Rating from "@/components/common/rating";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DefaultImage from "@/assets/images/servicedefault.png";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import type { ServiceFavorite } from "@/features/service/types/service-favorite.type";
import serviceFavoriteServices from "@/features/service/service/service-favorite";
import routePath from "@/config/route";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";

interface ServiceFavoriteItemProps {
  favorite: ServiceFavorite;
  refresh: () => void;
}

const ServiceFavoriteItem = ({
  favorite,
  refresh,
}: ServiceFavoriteItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const checkPath = favorite.is_store
    ? routePath.storeDetail.replace(":id", favorite.store.user_alias)
    : routePath.serviceDetail.replace(":id", favorite.service.service_alias);

  const handleDeleteFavorite = async () => {
    try {
      await serviceFavoriteServices.deleteServiceFavorite(
        favorite.favorite_id.toString()
      );
      setIsOpen(false);
      toast.success("Đã xoá khỏi danh sách dịch vụ và cửa hàng yêu thích");
      refresh();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại");
    }
  };
  return (
    <>
      <Link to={checkPath} className="block">
        <Card
          className={cn(
            "overflow-hidden hover:shadow-lg transition-all hover:-translate-x-[5px] h-[70px] rounded-[2px] cursor-pointer border-r-4 border-y ",
            favorite.is_store ? "border-r-green-500" : "border-r-blue-500"
          )}
        >
          <CardContent className="p-0 flex h-full">
            <div className="h-full w-[10%]">
              <img
                src={
                  favorite.is_store
                    ? favorite.store.user_avatar_url ?? DefaultImage
                    : favorite.service.service_image_url ?? DefaultImage
                }
                onError={(e) => {
                  e.currentTarget.src = DefaultImage;
                }}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex py-1 px-2 flex-1">
              <div className="flex flex-col gap-2 flex-1">
                {favorite.is_store ? (
                  <p className="font-semibold text-lg flex-1 flex items-center">
                    {favorite.store.user_full_name}
                  </p>
                ) : (
                  <>
                    <h2 className="font-semibold text-lg">
                      {favorite.service.service_name}
                    </h2>
                    <div className="flex items-center">
                      <p className="text-sm font-semibold">
                        Nhà cung cấp dịch vụ:
                      </p>
                      <span className="line-clamp-1 text-sm max-w-[200px] ml-1 break-all font-normal">
                        {favorite.service.owner.user_full_name}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div
                className={cn(
                  "flex flex-col gap-3",
                  favorite.is_store ? "justify-center" : "justify-end"
                )}
              >
                <Button
                  variant="ghost"
                  className="text-gray-500 hover:text-red-500 hover:bg-red-50 size-2 ml-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setIsOpen(true);
                  }}
                >
                  <Icons glyph="trash" className="size-5" />
                  <span className="sr-only">Xóa</span>
                </Button>

                {!favorite.is_store && (
                  <div className="flex items-center">
                    {favorite.service.average_rating != null ? (
                      <>
                        <Rating number={favorite.service.average_rating} />
                        <span className="text-[16px] text-gray-600 mt-1">
                          ({favorite.service.average_rating})
                        </span>
                      </>
                    ) : (
                      <span>Chưa có đánh giá</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
      <ConfirmDialog
        open={isOpen}
        onOpenChange={() => setIsOpen(false)}
        title="Xoá dịch vụ và cửa hàng yêu thích"
        description={`Bạn có muốn xoá ${
          favorite.is_store ? "cửa hàng" : "dịch vụ"
        } này không?`}
        onConfirm={() => {
          handleDeleteFavorite();
        }}
      />
    </>
  );
};

export default ServiceFavoriteItem;
