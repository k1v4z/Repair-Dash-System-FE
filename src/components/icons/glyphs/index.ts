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
};

export type Glyph = {
  glyph: keyof typeof glyphs;
};
