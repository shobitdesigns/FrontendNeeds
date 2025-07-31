import { Link } from "react-router-dom";
import brands from "../../data/brands.json"
export default function BrandSection({ className, sectionTitle }) {
  return (
    <div data-aos="fade-up" className={`w-full ${className || ""}`}>
      <div className="container-x mx-auto">
        <div className=" section-title flex justify-between items-center mb-5">
          <div>
            <h1 className="sm:text-3xl text-xl font-600 text-qblacktext">
              {sectionTitle}
            </h1>
          </div>
        </div>
        <div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2">
          {brands.map((item) => (

          <div className="item">
            <div className="w-full h-[130px] bg-white border border-primarygray flex justify-center items-center">
              <Link to={`/all-products?brand=${encodeURIComponent(item.name)}`}>
              <img
                src={`/public/assets/images/${item.icon}`}
                alt="logo"
                />
                </Link>
            </div>
          </div>
          ))}

        </div>
      </div>
    </div>
  );
}
