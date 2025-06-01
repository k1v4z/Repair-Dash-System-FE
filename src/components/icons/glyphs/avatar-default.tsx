import type { GlyphIcon } from "@/types/glyphs.type";

export const AvatarDefault = ({ className = "", ...props }: GlyphIcon) => {
    return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          {...props}
        >
        <circle cx="12" cy="7" r="4" />
        <path
            d="M5 20c2-4 5-6 7-6s5 2 7 6"
        />
          <circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" opacity="0.5" />
        </svg>
      );
};