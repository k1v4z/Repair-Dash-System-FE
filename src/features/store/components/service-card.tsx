import Icon from "@/components/icons";

interface ServiceCardProps {
  image: string;
  title: string;
  company: string;
  location: string;
  price?: string;
  isFavorite?: boolean;
  onFavorite?: () => void;
}

export default function ServiceCard({
  image,
  title,
  company,
  location,
  price,
  isFavorite = false,
  onFavorite,
}: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg border hover:border-blue-500 transition-all w-full">
      <div className="p-3 sm:p-4 flex items-start gap-3 sm:gap-4">
        <img
          src={image}
          alt={company}
          className="w-12 h-12 sm:w-16 sm:h-16 rounded object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold text-blue-600 hover:underline cursor-pointer leading-snug truncate">
            {title}
          </h3>
          <p className="text-xs sm:text-[13px] text-gray-500 mt-1 font-medium truncate">
            {company}
          </p>
        </div>
        <button onClick={onFavorite} className="p-1 flex-shrink-0">
          <Icon
            glyph="heart"
            className={`w-4 h-4 sm:w-5 sm:h-5 ${
              isFavorite
                ? "fill-red-400 stroke-red-400"
                : "fill-none stroke-gray-400"
            }`}
          />
        </button>
      </div>

      <div className="px-3 sm:px-4 pb-3 sm:pb-4 flex items-center gap-2 sm:gap-3 flex-wrap">
        <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-gray-200 border border-gray-200 rounded-full text-xs sm:text-[13px] font-medium text-gray-700 shadow-sm">
          <div className="flex items-center gap-1"> 
            <Icon glyph="location" className="size-4" />
            {location}
          </div>
        </span>
        {price && (
          <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-gray-200 border border-gray-200 rounded-full text-xs sm:text-[13px] font-medium text-gray-700 shadow-sm">
            {price}
          </span>
        )}
      </div>
    </div>
  );
}
