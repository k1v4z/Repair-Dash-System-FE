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

export const glyphs = {
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
  x: X,
};

export type Glyph = {
  glyph: keyof typeof glyphs;
};
