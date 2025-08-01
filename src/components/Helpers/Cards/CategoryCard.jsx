import { Link } from "react-router-dom";
export default function CategoryCard({ background, title, brands = [],
  onBrandClick,
  selectedBrand, }) {
  return (
    <div
      className="category-card-wrappwer w-full h-full p-[30px]"
      style={{
        background: `url(${background ||
          `public/assets/images/section-category-1.jpg`
          }) no-repeat`,
        backgroundSize: "cover",
      }}
    >
      <div>
        <h1 className="text-base font-600 tracking-wide mb-2">{title}</h1>
        <div className="brands-list mb-[7px]">
          <ul>
            {brands.map((brand) => (
              <li key={brand.id}>
                <button onClick={() => onBrandClick(brand.name)}>
                  <span
                    className={`text-sm capitalize text-qgray hover:text-qblack border-b-2 transition-all duration-200 ${selectedBrand === brand.name ? "border-qblack text-sm text-qblack font-bold " : "border-transparent"
                      }`}
                  >
                    {brand.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <a href="#">
          <div className="flex space-x-2 items-center">
            <span className="text-qblack font-600 text-sm">Shop Now</span>
            <span>
              <svg
                width="7"
                height="11"
                viewBox="0 0 7 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2.08984"
                  y="0.636719"
                  width="6.94219"
                  height="1.54271"
                  transform="rotate(45 2.08984 0.636719)"
                  fill="#1D1D1D"
                />
                <rect
                  x="7"
                  y="5.54492"
                  width="6.94219"
                  height="1.54271"
                  transform="rotate(135 7 5.54492)"
                  fill="#1D1D1D"
                />
              </svg>
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
