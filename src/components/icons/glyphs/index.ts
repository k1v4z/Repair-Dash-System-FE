import Eye from "./eye";
import { FacebookIcon } from "./facebook";
import { InstagramIcon } from "./instagram";
import { TwitterIcon } from "./twitter";
import { Profile } from "./profile";
import { Logout } from "./logout";
import { Setting } from "./setting";
import { Search } from "./search";
import { Arrow } from "./arrow";
import { Heart } from "./heart";
import { Chevron } from "./chevron";
import { Store } from "./store";
import { Wrench } from "./wrench";
import { Location } from "./location";
import { Upload } from "./upload";
import { X } from "./x";
import { Star } from "./star";
import { Calendar } from "./calendar";
import { UploadImg } from "./upload-img";
import { Loader } from "./loader";
import { Warning } from "./warning";
import { AlertCircle } from "./alert-circle";
import { CheckCircle } from "./check-circle";
import { Phone } from "./phone";
import { Message } from "./message";
import { HalfStar } from "./half-star";
import { Camera } from "./camera";

export const glyphs = {
  alertCircle: AlertCircle,
  checkCircle: CheckCircle,
  eye: Eye,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  profile: Profile,
  logout: Logout,
  setting: Setting,
  search: Search,
  arrow: Arrow,
  heart: Heart,
  chevron: Chevron,
  store: Store,
  wrench: Wrench,
  location: Location,
  upload: Upload,
  warning: Warning,
  x: X,
  star: Star,
  calendar: Calendar,
  uploadImg: UploadImg,
  loader: Loader,
  phone: Phone,
  message: Message,
  halfStar: HalfStar,
  camera: Camera, 
};

export type Glyph = {
  glyph: keyof typeof glyphs;
};
