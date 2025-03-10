import { Label } from "@/components/ui/label";
import SelectField from "@/components/common/select-field";
import { useSelectLocation } from "@/hooks/useSelectLocation";

export default function LocationSelector() {
  const {
    provinces,
    selectedProvince,
    selectedDistrict,
    selectedWard,
    districts,
    wards,
    handleProvinceChange,
    handleDistrictChange,
    handleWardChange,
  } = useSelectLocation();
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="province" className="text-left w-full block">
          Tỉnh
        </Label>
        <SelectField
          placeholder="Select province"
          value={selectedProvince}
          onValueChange={handleProvinceChange}
          options={provinces}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="district" className="text-left w-full block">
          Quận / Huyện
        </Label>
        <SelectField
          placeholder="Select district"
          disabled={!selectedProvince}
          value={selectedDistrict}
          onValueChange={handleDistrictChange}
          options={districts}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ward" className="text-left w-full block">
          Xã / Phường
        </Label>
        <SelectField
          placeholder="Select ward"
          disabled={!selectedDistrict}
          value={selectedWard}
          onValueChange={handleWardChange}
          options={wards}
        />
      </div>
    </div>
  );
}
