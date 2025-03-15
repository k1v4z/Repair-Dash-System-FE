import { useState } from "react";
import {
  PROVINCES,
  DISTRICT_BY_PROVINCES,
  WARDS_BY_DISTRICT,
} from "@/constants/vi-locations";

interface UseSelectLocationProps {
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

export const useSelectLocation = (): UseSelectLocationProps => {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setSelectedDistrict(""); // Reset district when province changes
    setSelectedWard(""); // Reset ward when province changes
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setSelectedWard(""); // Reset ward when district changes
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
