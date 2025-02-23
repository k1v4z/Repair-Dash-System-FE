import type { Glyph } from "./glyphs/index";

export type Icons = {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
  glyph?: Glyph["glyph"];
  props?: React.SVGProps<SVGSVGElement>;
};
