import { useState } from "react";
import {
  PROVINCES,
  DISTRICT_BY_PROVINCES,
  WARDS_BY_DISTRICT,
} from "@/constants/vi-locations";

interface Props {
  initialProvince?: string;
  initialDistrict?: string;
  initialWard?: string;
}

interface UseSelectLocation {
  selectedProvince: string;
  selectedDistrict: string;
  selectedWard: string;
  handleProvinceChange: (value: string) => void;
  handleDistrictChange: (value: string) => void;
  handleWardChange: (value: string) => void;
  provinces: string[];
  districts: string[];
  wards: string[];
}

export const useSelectLocation = (initValue?: Props): UseSelectLocation => {
  const [selectedProvince, setSelectedProvince] = useState(
    initValue?.initialProvince || ""
  );
  const [selectedDistrict, setSelectedDistrict] = useState(
    initValue?.initialDistrict || ""
  );
  const [selectedWard, setSelectedWard] = useState(
    initValue?.initialWard || ""
  );

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setSelectedDistrict("");
    setSelectedWard("");
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setSelectedWard("");
  };

  const handleWardChange = (value: string) => {
    setSelectedWard(value);
  };

  return {
    selectedProvince,
    selectedDistrict,
    selectedWard,
    handleProvinceChange,
    handleDistrictChange,
    handleWardChange,
    provinces: PROVINCES,
    districts: selectedProvince
      ? DISTRICT_BY_PROVINCES[selectedProvince] || []
      : [],
    wards: selectedDistrict ? WARDS_BY_DISTRICT[selectedDistrict] || [] : [],
  };
};
