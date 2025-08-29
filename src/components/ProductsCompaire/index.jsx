import { useState } from "react";
import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import Xmark from "../Helpers/icons/Xmark";
import { useCompare } from "../Contexts/AddToCompare";
import Rating from "../Helpers/rating";
import Search from "../Helpers/icons/Search";
import productsDataJson from "../../data/products.json";

export default function ProductsCompare() {
  const { compareList, addToCompare, removeFromCompare } = useCompare();
  const productsData = productsDataJson.products;
  const MAX_COLUMNS = 4;
  const fixedFeatures = ["Star rating", "Model", "Brand", "Availability", "Colors"];

  const [columns, setColumns] = useState(() => {
    const initial = compareList.slice(0, MAX_COLUMNS);
    while (initial.length < MAX_COLUMNS) initial.push({});
    return initial;
  });

  const [searchStates, setSearchStates] = useState(
    columns.map(() => ({ term: "", results: [] }))
  );

  const handleSearch = (index, e) => {
    const value = e.target.value;
    setSearchStates((prev) => {
      const newStates = [...prev];
      newStates[index].term = value;

      newStates[index].results = value
        ? productsData.filter(
          (p) =>
            p.title.toLowerCase().includes(value.toLowerCase()) &&
            !columns.some((col) => col.id === p.id)
        )
        : [];

      return newStates;
    });
  };

  const handleSelectProduct = (index, product) => {
    setColumns((prev) => {
      const newColumns = [...prev];
      newColumns[index] = product;
      return newColumns;
    });

    setSearchStates((prev) => {
      const newStates = [...prev];
      newStates[index] = { term: "", results: [] };
      return newStates;
    });

    addToCompare(product);
  };

  const handleRemoveProduct = (index, productId) => {
    setColumns((prev) => {
      const newColumns = [...prev];
      newColumns[index] = {};
      return newColumns;
    });

    setSearchStates((prev) => {
      const newStates = [...prev];
      newStates[index] = { term: "", results: [] };
      return newStates;
    });

    removeFromCompare(productId);
  };

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="products-compare-wrapper w-full bg-white pb-[40px]">
        <div className="w-full mb-5">
          <PageTitle
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "compare", path: "/products-compare" },
            ]}
            title="Product Comparison"
          />
        </div>

        <div className="container-x mx-auto">
          <div className="w-full border border-qgray-border overflow-x-auto">
            <table className="table-wrapper">
              <tbody>
                {/* Header row */}
                <tr className="table-row-wrapper">
                  <td className="w-[233px] pt-[30px] px-[26px] align-top bg-[#FAFAFA]">
                    <h1 className="text-[18px] font-medium text-qblack mb-4">
                      Product Comparison
                    </h1>
                    <p className="text-[13px] text-qgraytwo mb-2">
                      Select products to see differences and similarities between them
                    </p>
                  </td>

                  {columns.map((product, index) => (
                    <td
                      key={product.id || `empty-${index}`}
                      className="product w-[235px] bg-white p-6 border-b border-r border-qgray-border relative"
                    >
                      {/* Remove button */}
                      {product.id && (
                        <div
                          className="absolute top-2 right-2 cursor-pointer bg-red-500 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition"
                          onClick={() => handleRemoveProduct(index, product.id)}
                        >
                          <Xmark className="w-3 h-3 text-white" />
                        </div>
                      )}

                      {/* Empty slot  search input */}
                      {!product.id && (
                        <div className="w-full mb-[30px] relative h-[44px]">
                          <InputCom
                            type="text"
                            placeholder="Search Product..."
                            inputClasses="w-full h-full pl-8 pr-2 text-[12px]" 
                            value={searchStates[index]?.term || ""}
                            onChange={(e) => handleSearch(index, e)}
                          />

                          <Search className="w-4 h-4 text-qgrey absolute left-2 top-1/2 -translate-y-1/2" />

                          {searchStates[index]?.results?.length > 0 && (
                            <div className="absolute top-[45px] left-0 w-full bg-white border border-gray-200 z-20 max-h-60 overflow-y-auto">
                              {searchStates[index].results.map((item) => (
                                <div
                                  key={item.id}
                                  onClick={() => handleSelectProduct(index, item)}
                                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-[12px]"
                                >
                                  {item.title}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                      )}

                      {product.image && (
                        <div className="product-img flex justify-center mb-3">
                          <div className="w-[161px] h-[161px]">
                            <img
                              src={`/assets/images/${product.image}`}
                              alt={product.title}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      )}

                      {product.title && (
                        <p className="text-center text-[15px] font-medium text-qblack leading-[24px] mb-2">
                          {product.title}
                        </p>
                      )}

                      {product.price && (
                        <p className="text-center text-[15px] font-medium text-qred leading-[24px]">
                          {product.price}
                        </p>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Feature rows */}
                {fixedFeatures.map((feature) => (
                  <tr className="table-row-wrapper" key={feature}>
                    <td className="w-[233px] px-[26px] align-top bg-[#FAFAFA]">
                      <p className="text-[15px] font-medium text-qblack">
                        {feature}
                      </p>
                    </td>

                    {columns.map((product, index) => (
                      <td
                        key={`${index}-${feature}`}
                        className="product w-[235px] bg-white px-6 border-r border-qgray-border pb-[20px] align-top"
                      >
                        {feature === "Star rating" ? (
                          product.rating ? (
                            <div className="flex items-center space-x-2">
                              <span className="text-[15px] font-medium text-qblack">
                                {product.rating?.rate?.toFixed(1)}
                              </span>
                              <div className="flex items-center">
                                <Rating rating={product.rating?.rate || 0} />
                              </div>
                              <span className="text-[13px] font-normal text-qgraytwo">
                                ({product.rating?.count ?? 0})
                              </span>
                            </div>
                          ) : (
                            "-"
                          )
                        ) : (
                          <span className="text-[13px] font-normal text-qgraytwo">
                            {product[feature.toLowerCase()] || "-"}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
