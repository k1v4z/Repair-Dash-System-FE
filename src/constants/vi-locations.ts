export const PROVINCES = [
  "Hà Nội",
  "Hồ Chí Minh",
  "Đà Nẵng",
  "Cần Thơ"
];

export const DISTRICT_BY_PROVINCES: Record<string, string[]> = {
  "Hà Nội": [
    "Hoàn Kiếm",
    "Ba Đình",
    "Đống Đa",
    "Cầu Giấy"
  ],
  "Hồ Chí Minh": [
    "Quận 1",
    "Quận 3",
    "Bình Thạnh",
    "Phú Nhuận"
  ],
  "Đà Nẵng": [
    "Hải Châu",
    "Sơn Trà",
    "Thanh Khê",
    "Cẩm Lệ",
  ],
  "Cần Thơ": [
    "Ninh Kiều",
    "Bình Thủy",
    "Cái Răng"
  ]
};

export const WARDS_BY_DISTRICT: Record<string, string[]> = {
  "Hoàn Kiếm": [
    "Phúc Tân",
    "Đồng Xuân",
    "Hàng Bạc"
  ],
  "Ba Đình": [
    "Cống Vị",
    "Điện Biên",
    "Kim Mã"
  ],
  "Quận 1": [
    "Bến Nghé",
    "Bến Thành",
    "Phạm Ngũ Lão"
  ],
  "Quận 3": [
    "Võ Thị Sáu",
    "Phường 10",
    "Phường 11"
  ],
  "Cẩm Lệ": [
    "Hòa An",
    "Hòa Phát",
    "Hòa Thọ Đông"
  ]
};
