import Eye from "./eye";
import { FacebookIcon } from "./facebook";
import { InstagramIcon } from "./instagram";
import { TwitterIcon } from "./twitter";
import { Profile } from "./profile";
import { Logout } from "./logout";
import { Setting } from "./setting";
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
  store: Store,
  wrench: Wrench,
  location: Location,
  upload: Upload,
  x: X,
};

export type Glyph = {
  glyph: keyof typeof glyphs;
};
