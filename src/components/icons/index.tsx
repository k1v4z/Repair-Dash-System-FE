import type { Icons } from "./icons.type";
import { glyphs } from "./glyphs/index";

const Icon = ({ className = "", glyph, ...props }: Icons) => {
  const Glyph = glyph && glyphs[glyph];

  if (Glyph) {
    return <Glyph className={className} {...props} />;
  }

  return null;
};

export default Icon;
