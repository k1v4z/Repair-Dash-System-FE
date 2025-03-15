import type { GlyphIcon } from "@/types/glyphs.type";

export const Chevron = ({ className = "", ...props }: GlyphIcon) => {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
      className={className}
    >
      <path
        d="M15 18l-6-6 6-6"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
};
