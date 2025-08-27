export default function Star({ filled = false, half = false, size = 18, id }) {
  const gradientId = `half-grad-${id}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId}>
          <stop offset="50%" stopColor="#FFA800" />
          <stop offset="50%" stopColor="#E0E0E0" />
        </linearGradient>
      </defs>
      <path
        d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.402 8.177L12 18.896l-7.336 3.873 1.402-8.177L.132 9.21l8.2-1.192z"
        fill={filled ? "#FFA800" : half ? `url(#${gradientId})` : "#E0E0E0"}
      />
    </svg>
  );
}
