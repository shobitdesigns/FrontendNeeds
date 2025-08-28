import { useState, useEffect } from "react";
import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import { useCompare } from "../Contexts/AddToCompare";
import Rating from "../Helpers/rating";
import productsDataJson from "../../data/products.json";

export default function ProductsCompaire() {
  const { compareList, addToCompare } = useCompare();
  const productsData = productsDataJson.products;
  const [columns, setColumns] = useState(compareList.length > 0 ? compareList : [{}]);
  const [searchStates, setSearchStates] = useState(columns.map(() => ({ term: "", results: [] })));
  const fixedfeatures = ["Star rating", "Model", "Brand", "Availability", "Colors"];


  useEffect(() => {
    setColumns(compareList.length > 0 ? compareList : [{}]);
    setSearchStates((prev) =>
      compareList.length > 0
        ? compareList.map(() => ({ term: "", results: [] }))
        : [{ term: "", results: [] }]
    );
  }, [compareList]);



  const handleSearch = (index, e) => {
    const value = e.target.value;

    setSearchStates((prev) => {
      const newStates = [...prev];
      newStates[index].term = value;

      if (value.trim() === "") {
        newStates[index].results = [];
      } else {
        // use this filter
        newStates[index].results = productsData.filter((p) =>
          p.title.toLowerCase().includes(value.toLowerCase())
        );
      }

      return newStates;
    });
  };
  const handleSelectProduct = (index, product) => {
    addToCompare(product);
    setSearchStates((prev) => {
      const newStates = [...prev];
      newStates[index] = { term: "", results: [] };
      return newStates;
    });
  };

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="products-compaire-wrapper w-full bg-white pb-[40px]">
        <div className="w-full mb-5">
          <PageTitle
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "compaire", path: "/products-compaire" },
            ]}
            title="Product Comparison"
          />
        </div>

        <div className="container-x mx-auto">
          <div className="w-full border border-qgray-border">
            <table className="table-wrapper">
              <tbody>
                <tr className="table-row-wrapper">
                  <td className="w-[233px] pt-[30px] px-[26px] align-top bg-[#FAFAFA]">
                    <div>
                      <h1 className="text-[18px] font-medium text-qblack mb-4">Product Comparison</h1>
                      <p className="text-[13px] text-qgraytwo">
                        Select products to see the differences and similarities between them
                      </p>
                    </div>
                  </td>

                  {columns.map((product, index) => (
                    <td
                      key={product.id || `empty-${index}`}
                      className="product w-[235px] bg-white p-6 border-b border-r border-qgray-border"
                    >
                      <div className="w-full mb-[30px] relative h-[44px]">
                        <InputCom
                          type="text"
                          placeholder="Search Product..."
                          inputClasses="w-full h-full px-2"
                          value={searchStates[index]?.term || ""}
                          onChange={(e) => handleSearch(index, e)}
                        />

                        {searchStates[index]?.results?.length > 0 && (
                          <div className="absolute top-[45px] left-0 w-full bg-white border border-gray-200 z-20 max-h-60 overflow-y-auto">
                            {searchStates[index].results.map((item) => (
                              <div
                                key={item.id}
                                onClick={() => handleSelectProduct(index, item)}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                              >
                                {item.title}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

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

                {fixedfeatures.map((feature) => (
                  <tr className="table-row-wrapper" key={feature}>
                    <td className="w-[233px] px-[26px] align-top bg-[#FAFAFA]">
                      <p className="text-[15px] font-medium text-qblack">{feature}</p>
                    </td>

                    {columns.map((product, index) => (
                      <td
                        key={product.id + feature || `empty-${index}-${feature}`}
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
                          <span>{product[feature.toLowerCase()] || "-"}</span>
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
