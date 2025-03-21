import Icons from "../icons";

const Rating = ({ number }: { number: number }) => {
  const limitedNumber = Math.min(number, 5);
  const fullStars = Math.floor(limitedNumber);
  const halfStar = limitedNumber % 1 !== 0;

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <Icons
          glyph="star"
          className="w-5 h-5 mt-1 text-yellow-400"
          key={`full-${i}`}
        />
      ))}
      {halfStar && (
        <Icons
          glyph="halfStar"
          className="w-5 h-5 mt-1 text-yellow-400"
        />
      )}
    </div>
  );
};

export default Rating;
