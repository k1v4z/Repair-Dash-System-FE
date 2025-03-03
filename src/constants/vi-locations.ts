import type { Option } from "@/types/globals.type";

export const PROVINCES: Option[] = [
  { value: "hanoi", label: "Hà Nội" },
  { value: "hochiminh", label: "Hồ Chí Minh" },
  { value: "danang", label: "Đà Nẵng" },
  { value: "cantho", label: "Cần Thơ" },
];

export const DISTRICT_BY_PROVINCES: Record<string, Option[]> = {
  hanoi: [
    { value: "hoankiem", label: "Hoàn Kiếm" },
    { value: "badinh", label: "Ba Đình" },
    { value: "dongda", label: "Đống Đa" },
    { value: "caugiay", label: "Cầu Giấy" },
  ],
  hochiminh: [
    { value: "district1", label: "Quận 1" },
    { value: "district3", label: "Quận 3" },
    { value: "binhthanh", label: "Bình Thạnh" },
    { value: "phunhuan", label: "Phú Nhuận" },
  ],
  danang: [
    { value: "haichau", label: "Hải Châu" },
    { value: "sontra", label: "Sơn Trà" },
    { value: "thanhkhe", label: "Thanh Khê" },
  ],
  cantho: [
    { value: "ninhkieu", label: "Ninh Kiều" },
    { value: "binhthuy", label: "Bình Thủy" },
    { value: "cairang", label: "Cái Răng" },
  ],
};

export const WARDS_BY_DISTRICT: Record<string, Option[]> = {
  hoankiem: [
    { value: "phuc_tan", label: "Phúc Tân" },
    { value: "dong_xuan", label: "Đồng Xuân" },
    { value: "hang_bac", label: "Hàng Bạc" },
  ],
  badinh: [
    { value: "cong_vi", label: "Cống Vị" },
    { value: "dien_bien", label: "Điện Biên" },
    { value: "kim_ma", label: "Kim Mã" },
  ],
  district1: [
    { value: "ben_nghe", label: "Bến Nghé" },
    { value: "ben_thanh", label: "Bến Thành" },
    { value: "pham_ngu_lao", label: "Phạm Ngũ Lão" },
  ],
  district3: [
    { value: "vo_thi_sau", label: "Võ Thị Sáu" },
    { value: "ward_10", label: "Phường 10" },
    { value: "ward_11", label: "Phường 11" },
  ],
};
