import RangeSlider from "react-range-slider-input";
import Checkbox from "../Helpers/Checkbox";
import { useState } from "react";
export default function ProductsFilter({
  categories,
  brands,
  filters,
  checkboxHandler,
  volume,
  volumeHandler,
  storage,
  filterstorage,
  className,
  filterToggle,
  filterToggleHandler,
}) {
  const [showAllBrands, setShowAllBrands] = useState(false);

  const filteredBrands = brands.filter((brand) => {
    if (filters.category.length === 0) return true;
    const category = categories.find((c) => c.id === brand.categoryId);
    if (!category) return false;
    return filters.category.includes(category.name);
  });

  const visibleBrands = showAllBrands ? filteredBrands : filteredBrands.slice(0, 6);
  const remainingCount = filteredBrands.length - 6;
  return (
    <>
      <div
        className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] ${className || ""
          }  ${filterToggle ? "block" : "hidden lg:block"}`}
      >
        {/* --- Categories --- */}
        <div className="filter-subject-item pb-10 border-b border-qgray-border">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Product categories</h1>
          </div>
          <div className="filter-items">
            <ul>
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="item flex justify-between items-center mb-5"
                >
                  <div className="flex space-x-[14px] items-center">
                    <Checkbox
                      id={category.id}
                      name={category.name}
                      handleChange={(e) => checkboxHandler("category", e.target.name)}
                      checked={filters.category.includes(category.name)}
                    />
                    <label
                      htmlFor={category.id}
                      className="text-xs font-black font-400 capitalize"
                    >
                      {category.name}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- Price Range --- */}
        <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Price Range</h1>
          </div>
          <div className="price-range mb-5">
            <RangeSlider
              value={volume}
              onInput={volumeHandler}
              min={10}
              max={1000}
            />
          </div>
          <p className="text-xs text-qblack font-400">
            Price: ${volume.min} - ${volume.max}
          </p>
        </div>

        {/* --- Brands --- */}
        <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Brands</h1>
          </div>
          <div className="filter-items">
            <ul>
              {visibleBrands.map((brand) => (
                <li key={brand.name} className="item flex justify-between items-center mb-5">
                  <div className="flex space-x-[14px] items-center">
                    <Checkbox
                      id={brand.name}
                      name={brand.name}
                      handleChange={(e) => checkboxHandler("brand", e.target.name)}
                      checked={filters.brand.includes(brand.name)}
                    />
                    <label
                      htmlFor={brand.name}
                      className="text-xs font-black font-400 capitalize"
                    >
                      {brand.name}
                    </label>
                  </div>
                </li>
              ))}

              {!showAllBrands && filteredBrands.length > 6 && (
                <button
                  type="button"
                  onClick={() => setShowAllBrands(true)}
                  className="text-blue-500 text-sm hover:underline font-[12px]"
                >
                  +{remainingCount} More
                </button>
              )}
            </ul>
          </div>
        </div>

        {/* --- Storage --- */}
        <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Storage</h1>
          </div>
          <div className="filter-items">
            <div className="flex space-x-[5px] flex-wrap">
              {["64GB", "128GB", "256GB", "512GB", "1024GB"].map((size) => (
                <span
                  key={size}
                  onClick={() => filterstorage(size)}
                  className={`font-400 border border-qgray-border text-xs px-[14px] py-[6px] cursor-pointer mb-[5px] ${storage === size
                    ? "bg-qyellow text-qblack border-none"
                    : " text-qgray"
                    }`}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* --- Sizes --- */}
        <div className="filter-subject-item pb-10 mt-10">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Sizes</h1>
          </div>
          <div className="filter-items">
            <ul>
              {["sizeS", "sizeM", "sizeXL", "sizeXXL", "sizeFit"].map((sizeKey) => (
                <li
                  key={sizeKey}
                  className="item flex justify-between items-center mb-5"
                >
                  <div className="flex space-x-[14px] items-center">
                    <Checkbox
                      id={sizeKey}
                      name={sizeKey}
                      handleChange={(e) => checkboxHandler("size", e.target.name)}
                      checked={filters[sizeKey]}
                    />
                    <label
                      htmlFor={sizeKey}
                      className="text-xs font-black font-400 capitalize"
                    >
                      {sizeKey.replace("size", "").replace("Fit", "Slim Fit")}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- Close Button --- */}
        <button
          onClick={filterToggleHandler}
          type="button"
          className="w-10 h-10 fixed top-5 right-5 z-50 rounded  lg:hidden flex justify-center items-center border border-qred text-qred"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

