import type { SearchServiceItem } from "@/features/service/types/search.type";

// Mock data for services
export const mockServices: SearchServiceItem[] = [
  {
    service_id: 1,
    service_name: "Car Repair Service",
    service_image:
      "https://images.unsplash.com/photo-1630275994314-5d0aeadda8c2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    owner_id: 101,
    owner: {
      user_full_name: "John's Garage",
      user_alias: "johnsgarage",
      user_avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      user_priority: 5,
    },
    avg_rating: 4.8,
    order_times: 235,
    distance: 2.3,
    priority: 8.7,
  },
  {
    service_id: 2,
    service_name: "Home Cleaning",
    service_image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    owner_id: 102,
    owner: {
      user_full_name: "CleanHome Services",
      user_alias: "cleanhome",
      user_avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      user_priority: 4,
    },
    avg_rating: 4.5,
    order_times: 189,
    distance: 1.8,
    priority: 7.9,
  },
  {
    service_id: 3,
    service_name: "Plumbing Services",
    service_image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    owner_id: 103,
    owner: {
      user_full_name: "Mike's Plumbing",
      user_alias: "mikeplumbing",
      user_avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      user_priority: 3,
    },
    avg_rating: 4.2,
    order_times: 156,
    distance: 3.5,
    priority: 6.8,
  },
  {
    service_id: 4,
    service_name: "Electrical Repair",
    service_image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    owner_id: 104,
    owner: {
      user_full_name: "ElectroPro",
      user_alias: "electropro",
      user_avatar:
        "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      user_priority: 4,
    },
    avg_rating: 4.7,
    order_times: 201,
    distance: 2.9,
    priority: 7.2,
  },
];

// Mock data for dropdowns
export const locationOptions = {
  provinces: [
    { value: "hanoi", label: "Hà Nội" },
    { value: "hochiminh", label: "Hồ Chí Minh" },
    { value: "danang", label: "Đà Nẵng" },
  ],
  districts: [
    { value: "district1", label: "District 1" },
    { value: "district2", label: "District 2" },
    { value: "district3", label: "District 3" },
  ],
  wards: [
    { value: "ward1", label: "Ward 1" },
    { value: "ward2", label: "Ward 2" },
    { value: "ward3", label: "Ward 3" },
  ],
};
