import { Badge } from "@/components/ui/badge";
import type { ProfileResponse } from "@/features/user/profile/types/profile.type";

interface ProfileHeaderProps {
  profile: ProfileResponse;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const isStore = profile.authentication?.role === "STORE";

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-primary-royalBlue">Quản lý tài khoản</h1>
        <p className="text-muted-foreground mt-1">
          Quản lý thông tin cá nhân và cài đặt tài khoản của bạn
        </p>
      </div>
      {isStore && (
        <Badge 
          variant="outline" 
          className="px-4 py-1 border-primary-royalBlue text-primary-royalBlue hover:bg-primary-royalBlue/20"
        >
          Chủ cửa hàng
        </Badge>
      )}
    </div>
  );
} 