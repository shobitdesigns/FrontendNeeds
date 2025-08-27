import Star from "./icons/Star";

export default function Rating({
  rating = 0,
  maxStars = 5,
  size = 18,
  showValue = false,
}) {
  // Use floor instead of round so 4.8 -> 4.5
  const roundedRating = Math.floor(rating * 2) / 2;
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    if (i <= Math.floor(roundedRating)) {
      stars.push(<Star key={`star-${i}`} id={`star-${i}`} filled size={size} />);
    } else if (i - roundedRating === 0.5) {
      stars.push(<Star key={`star-${i}`} id={`star-${i}`} half size={size} />);
    } else {
      stars.push(<Star key={`star-${i}`} id={`star-${i}`} size={size} />);
    }
  }

  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Rating: ${rating} out of ${maxStars}`}
    >
      {stars}
      {showValue && (
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
