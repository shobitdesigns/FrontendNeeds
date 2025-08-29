import { useState } from "react";
import { useNavigate } from "react-router-dom";
import categories from "../../../data/categories.json";
import brands from "../../../data/brands.json";
import products from "../../../data/products.json";

export default function SearchBox({ className, type }) {
    const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

const allSuggestions = [
  ...(products.products || []).map((p) => ({ label: p.title, type: "product", image: p.image , id: p.id, })),
  ...brands.map((b) => ({ label: b.name, type: "brand", icon: b.icon })),
  ...categories.map((c) => ({ label: c.name, type: "category", icon: c.icon })),
];

  const filteredSuggestions = allSuggestions.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

const handleSelect = (item) => {
  setQuery(item.label);
  setShowSuggestions(false);

  if (item.type === "product") {
    navigate(`/single-product/${item.id}`);
  } else if (item.type === "brand") {
    navigate(`/all-products?brand=${encodeURIComponent(item.label)}`);
  } else if (item.type === "category") {
    navigate(`/all-products?category=${encodeURIComponent(item.label)}`);
  } else {
    navigate(`/all-products?search=${encodeURIComponent(item.label)}`);
  }
};


  return (
    <>
      <style>{`
        .ovsearch::-webkit-scrollbar {
          width: 6px;
        }

        .ovsearch::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        .ovsearch::-webkit-scrollbar-thumb {
          background: #c0c0c0;
          border-radius: 4px;
        }

        .ovsearch::-webkit-scrollbar-thumb:hover {
          background: #a0a0a0;
        }

        /* Firefox support */
        .ovsearch {
          scrollbar-width: thin;
          scrollbar-color: #c0c0c0 #f1f1f1;
        }
        .search-btn {
    --tw-bg-opacity: 1;
    --tw-text-opacity: 1;
    background-color: rgb(255 187 56 / var(--tw-bg-opacity));
    color: rgb(34 34 34 / var(--tw-text-opacity));
}
      `}</style>
      <div
        className={`relative w-full h-full flex items-center border border-qgray-border bg-white ${className || ""
          }`}
      >
        <div className="flex-1 h-full relative">
          <form action="#" className="h-full">
            <input
              type="text"
              className="search-input w-full h-full px-4 outline-none"
              placeholder="Looking for something special?"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(true), 150)} 
            />
          </form>

          {showSuggestions && query && (
            <ul className="absolute ovsearch z-[100] left-0 right-0 top-full bg-white border border-qgray-border max-h-60 overflow-y-auto shadow-md rounded-md mt-1">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((item, index) => (
                  <li
                    key={index}
                 onClick={() => handleSelect(item)}
                    className=" hover:bg-gray-100 cursor-pointer text-sm content-start  "
                  >
                    <div className="flex items-center gap-2 p-2 my-1">
                   <div className="max-h-[40px] w-[14%] flex items-center content-center py-2">

                    {item.type === "product" ? (
                      <img
                      src={`/assets/images/${item.image}`}
                      alt={item.label}
                      className="w-[100%] h-[100%] object-contain p-2 "
                      />
                    ) : item.type === "brand" ? (
                      <img
                        src={`/assets/images/${item.icon}`}
                        alt={item.label}
                        className="w-[80%] h-[80%] object-contain p-1 "
                      />
                    ) : item.type === "category" ? (
                      <i className={`fa-solid ${item.icon} text-[16px] w-[100%] h-[100%] flex items-center justify-center`}></i>
                    ) : item.icon}

                    </div>
                    <div className="w-[86%]  flex items-start">
                      <div className="text-[#222222] text-[13px]">{item.label}</div>
                    </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-400 text-sm">No suggestions found.</li>
              )}
            </ul>
          )}
        </div>

        <div className="w-[1px] h-[22px] bg-qgray-border"></div>

        <button
          className=" w-[93px] h-full text-sm font-600  search-btn "
          type="button"
           onClick={() => {
    if (query.trim()) {
      navigate(`/all-products?search=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  }}
        >
          Search
        </button>
        
      </div>
    </>
  );
}

