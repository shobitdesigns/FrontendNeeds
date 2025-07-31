import { useState, useEffect } from "react";
import CategoryCard from "./Cards/CategoryCard";
import ProductCardStyleOne from "./Cards/ProductCardStyleOne";
import DataIteration from "./DataIteration";
import ViewMoreTitle from "./ViewMoreTitle";

export default function SectionStyleOne({
  className,
  sectionTitle,
  seeMoreUrl,
  fixedCategoryId,
  categories = [],
  brands = [],
  products = [],
  categoryBackground,
}) {
  const filterBrandsByCategory = (categoryId) => {
    return brands.filter((brand) => brand.categoryId === categoryId);
  };
  const [selectedBrand, setSelectedBrand] = useState(null);

  const [filteredProducts, setFilteredProducts] = useState(
    products.filter((p) => {
      const brand = brands.find((b) => b.name === p.brand);
      return brand?.categoryId === fixedCategoryId;
    })
  );
  const handleBrandClick = (brandName) => {
    const filtered = products.filter((product) => product.brand === brandName);
    setFilteredProducts(filtered);
    setSelectedBrand(brandName);
  };
  const [productLength] = useState(3);
 useEffect(() => {
  if (brands.length > 0 && products.length > 0) {
    const categoryBrands = brands.filter(
      (brand) => brand.categoryId === fixedCategoryId
    );

    if (categoryBrands.length > 0) {
      const firstBrandName = categoryBrands[0].name;
      const filtered = products.filter((product) => {
        const brand = brands.find((b) => b.name === product.brand);
        return (
          product.brand === firstBrandName &&
          brand?.categoryId === fixedCategoryId
        );
      });

      setFilteredProducts(filtered);
      setSelectedBrand(firstBrandName);
    }
  }
}, [brands, products, fixedCategoryId]);

  // useEffect(() => {
  //   if (window.matchMedia("(max-width: 1024px)")) {
  //     setLength(2);
  //   }
  // }, []);
  return (
    <div data-aos="fade-up" className={`section-style-one ${className || ""}`}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        <div className="products-section w-full">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
            <div className="category-card hidden xl:block w-full">
              <CategoryCard
                background={categoryBackground}
                title={categories.find((cat) => cat.id === fixedCategoryId)?.name || ""}
                filterproducts={filteredProducts}
                brands={filterBrandsByCategory(fixedCategoryId)}
                onBrandClick={handleBrandClick}
                selectedBrand={selectedBrand}
              />
            </div>
            <DataIteration
              datas={filteredProducts}
              startLength={0}
              endLength={productLength}
            >
              {({ datas }) => (
                <div key={datas.id} className="item">
                  <ProductCardStyleOne datas={datas} />
                </div>
              )}
            </DataIteration>
          </div>
        </div>
      </ViewMoreTitle>
    </div>
  );
}
