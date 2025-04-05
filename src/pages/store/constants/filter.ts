export const FILTER_OPTIONS = {
  location: [
    { id: 'loc1', name: 'Hà Nội', type: 'location' },
    { id: 'loc2', name: 'TP.HCM', type: 'location' },
    { id: 'loc3', name: 'Đà Nẵng', type: 'location' },
    { id: 'loc4', name: 'Cần Thơ', type: 'location' },
    { id: 'loc5', name: 'Đà Lạt', type: 'location' },
    { id: 'loc6', name: 'Nha Trang', type: 'location' },
    { id: 'loc7', name: 'Phú Quốc', type: 'location' },
    { id: 'loc8', name: 'Đà Nẵng', type: 'location' },
    { id: 'loc9', name: 'Cần Thơ', type: 'location' },
    { id: 'loc10', name: 'Đà Lạt', type: 'location' },
    { id: 'loc11', name: 'Hải Phòng', type: 'location' },
    { id: 'loc12', name: 'Bình Dương', type: 'location' },
    { id: 'loc13', name: 'Bình Phước', type: 'location' },
    { id: 'loc14', name: 'Bình Thuận', type: 'location' },
    { id: 'loc15', name: 'Bình Định', type: 'location' },
    { id: 'loc16', name: 'Bình Dương', type: 'location' },
    
    
  ],
  price: [
    { id: "p1", name: "Dưới 1 triệu", type: "price", value: 1000000 },
    { id: "p2", name: "1-3 triệu", type: "price", value: 3000000 },
    { id: "p3", name: "3-5 triệu", type: "price", value: 5000000 },
    { id: "p4", name: "5-10 triệu", type: "price", value: 10000000 },
  ],
  rating: [
    { id: "r1", name: "1 sao", type: "rating", value: 1 },
    { id: "r2", name: "2 sao", type: "rating", value: 2 },
    { id: "r3", name: "3 sao", type: "rating", value: 3 },
    { id: "r4", name: "4 sao", type: "rating", value: 4 },
    { id: "r5", name: "5 sao", type: "rating", value: 5 },
  ],
} as const;

export const FILTER_CATEGORIES = [
  {
    label: "Địa điểm",
    value: "location",
  },
  {
    label: "Giá tiền",
    value: "price",
  },
  {
    label: "Đánh giá",
    value: "rating",
  },
];
