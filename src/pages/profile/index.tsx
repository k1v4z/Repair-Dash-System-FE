import { ProfileHeader } from "@/pages/profile/components/profile-header";
import { ProfileSidebar } from "@/pages/profile/components/profile-sidebar";
import { ProfileForm } from "@/pages/profile/components/profile-form";
import { useProfile } from "@/features/user/profile/hooks/useProfile";
import { Skeleton } from "@/components/ui/skeleton";

export default function ManageAccount() {
  const { profile, isLoading, error, updateProfile, setProfile } = useProfile();

  if (isLoading) {
    return (
      <div className="container py-10 space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="space-y-4">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[100px] w-full" />
          </div>
          <div className="md:col-span-3 space-y-6">
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return <div>Error: {error || 'Không có dữ liệu'}</div>;
  }

  return (
    <div className="container py-10 space-y-8">
      <ProfileHeader profile={profile} />
      <div className="grid md:grid-cols-4 gap-6">
        <ProfileSidebar profile={profile} onProfileChange={setProfile} />
        <ProfileForm profile={profile} onProfileChange={updateProfile} />
      </div>
    </div>
  );
}