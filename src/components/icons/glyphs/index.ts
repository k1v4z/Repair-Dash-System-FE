import Eye from "./eye";
import { FacebookIcon } from "./facebook";
import { InstagramIcon } from "./instagram";
import { TwitterIcon } from "./twitter";
import { Profile } from "./profile";
import { Logout } from "./logout";
import { Setting } from "./setting";

export const glyphs = {
  eye: Eye,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  profile: Profile,
  logout: Logout,
  setting: Setting,
};

export type Glyph = {
  glyph: keyof typeof glyphs;
};
