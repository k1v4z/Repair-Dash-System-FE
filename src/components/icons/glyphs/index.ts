import Eye from "./eye";

export const glyphs = {
  eye: Eye,
};

export type Glyph = {
  glyph: keyof typeof glyphs;
};
