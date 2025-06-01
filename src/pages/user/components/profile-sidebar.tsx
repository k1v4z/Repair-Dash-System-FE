import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/icons";
import type { ProfileResponse } from "@/features/user/types/profile.type";
import { profileService } from "@/features/user/service/profile.service";
import { convertToBase64 } from "@/utils/file";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import {
  getSubscriptionPlanName,
  calculateRemainingDays,
} from "@/features/subscriptions/utils/subscription";
import { Badge } from "@/components/ui/badge";

interface ProfileSidebarProps {
  profile: ProfileResponse;
  onProfileChange: (profile: ProfileResponse) => void;
}

export function ProfileSidebar({
  profile,
  onProfileChange,
}: ProfileSidebarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const isStore = profile?.authentication?.role === "STORE";
  const servicesCount = profile?.services?.length || 0;
  const joinDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("vi-VN", {
        month: "numeric",
        year: "numeric",
      })
    : "";

  const subscriptionPlan = getSubscriptionPlanName(profile.user_priority);
  const remainingDays = calculateRemainingDays(
    profile.created_at,
    profile.user_priority
  );

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const base64String = await convertToBase64(file);

      const updatedProfile = await profileService.updateProfile({
        user_avatar: base64String,
      });

      onProfileChange({
        ...profile,
        ...updatedProfile,
      });

      toast.success("Cập nhật ảnh đại diện thành công!");
    } catch {
      toast.error("Có lỗi xảy ra khi cập nhật ảnh đại diện!");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="md:col-span-1 border-primary/20">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="w-24 h-24 border-2 border-primary-royalBlue/50">
              <AvatarImage src={profile?.user_avatar_url} />
              <AvatarFallback>
                {profile?.user_full_name?.slice(0, 2).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                <Icon
                  glyph="loader"
                  className="w-6 h-6 text-white animate-spin"
                />
              </div>
            )}
          </div>
          <div className="text-center">
            <h3 className="font-medium">{profile.user_full_name}</h3>
            <p className="text-sm text-muted-foreground">
              {profile.user_phone_number}
            </p>
          </div>
          <Input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Button
            variant="outline"
            className="w-full border-primary-royalBlue hover:bg-primary-royalBlue/10 hover:text-primary-royalBlue text-primary-royalBlue"
            onClick={handleUploadClick}
          >
            <Icon glyph="camera" className="size-4 mr-1" />
            Thay đổi ảnh
          </Button>
        </div>
        <Separator className="my-6 bg-primary/20" />
        <div className="space-y-4">
          {isStore && (
            <div className="flex items-center space-x-2">
              <Icon glyph="store" className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{servicesCount} dịch vụ</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Icon glyph="calendar" className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">Tham gia từ {joinDate}</span>
          </div>
          {isStore && (
            <div className="flex items-center space-x-2">
              <Icon
                glyph="checkCircle2"
                className="w-4 h-4 text-muted-foreground"
              />
              <span className="text-sm">
                Gói hiện tại:{" "}
                <Badge variant="outline" className="ml-1 font-normal">
                  {subscriptionPlan}
                </Badge>
              </span>
            </div>
          )}
          {profile.user_priority > 0 && remainingDays > 0 && (
            <div className="flex items-center space-x-2">
              <Icon glyph="clock" className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                Còn lại:{" "}
                <Badge variant="outline" className="ml-1 font-normal">
                  {remainingDays} ngày
                </Badge>
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
