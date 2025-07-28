export default function ThinLove({ className = '', filled = false, isHeader = false }) {
  const iconStyle = isHeader
    ? { color: '#1a1a1a' }
    : filled
    ? { color: '#ef4444' } // Tailwind red-500
    : { color: '#1a1a1a' };

  const iconClass = isHeader
    ? 'fa-regular'
    : filled
    ? 'fa-solid'
    : 'fa-regular';

  return (
    <i
      className={`${iconClass} fa-heart text-[18px] ${className}`}
      style={iconStyle}
    ></i>
  );
}
