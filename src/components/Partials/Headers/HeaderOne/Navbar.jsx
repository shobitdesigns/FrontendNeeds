import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Arrow from "../../../Helpers/icons/Arrow";
import categories from "../../../../data/categories.json";
import brands from "../../../../data/brands.json";
import DataIteration from "../../../Helpers/DataIteration";
import { useNavigate } from "react-router-dom";
export default function Navbar({ className, type }) {
  const [categoryToggle, setToggle] = useState(false);
  const [elementsSize, setSize] = useState("0px");
  const [menulength] = useState(5)
  // const getItems = document.querySelectorAll(`.categories-list li`).length;
  // if (categoryToggle && getItems > 0) {
  //   setSize(`${40 * getItems}px`);
  // }
  const handler = () => {
    setToggle(!categoryToggle);
  };
  useEffect(() => {
    if (categoryToggle) {
      const getItems = document.querySelectorAll(`.categories-list li`).length;
      if (categoryToggle && getItems > 0) {
        setSize(`${42 * getItems}px`);
      }
    } else {
      setSize(`0px`);
    }
  }, [categoryToggle]);

  return (
    <div
      className={`nav-widget-wrapper w-full  h-[60px] relative z-30 ${type === 3 ? "bg-qh3-blue" : "bg-qyellow"
        }  ${className || ""}`}
    >
      <div className="container-x mx-auto h-full">
        <div className="w-full h-full relative">
          <div className="w-full h-full flex justify-between items-center">
            <div className="category-and-nav flex xl:space-x-7 space-x-3 items-center">
              <div className="category w-[270px] h-[53px] bg-white px-5 rounded-t-md mt-[6px] relative">
                <button
                  onClick={handler}
                  type="button"
                  className="w-full h-full flex justify-between items-center"
                >
                  <div className="flex space-x-3 items-center">
                    <span>
                      <svg
                        className="fill-current"
                        width="14"
                        height="9"
                        viewBox="0 0 14 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="14" height="1" />
                        <rect y="8" width="14" height="1" />
                        <rect y="4" width="10" height="1" />
                      </svg>
                    </span>
                    <span className="text-sm font-600 text-qblacktext">
                      All Categories
                    </span>
                  </div>
                  <div>
                    <Arrow
                      width="5.78538"
                      height="1.28564"
                      className="fill-current text-qblacktext"
                    />
                  </div>
                </button>
                {categoryToggle && (
                  <div
                    className="fixed top-0 left-0 w-full h-full -z-10"
                    onClick={handler}
                  ></div>
                )}
                <div
                  className="category-dropdown w-full absolute left-0 top-[53px] overflow-hidden"
                  style={{ height: `${elementsSize} ` }}
                >
                  <ul className="categories-list">

                    {categories.map((item) => (
                      <li className="category-item">
                        <Link to={`/all-products?category=${encodeURIComponent(item.name)}`}>
                          <div
                            className={`flex justify-between items-center px-5 h-10 bg-white  transition-all duration-300 ease-in-out cursor-pointer text-qblack ${type === 3
                              ? "hover:bg-qh3-blue hover:text-white"
                              : "hover:bg-qyellow"
                              }`}
                          >
                            <div className="flex items-center space-x-6">
                              <span>

                                <i className={`fas fa-solid ${item.icon}`}></i>
                              </span>
                              <span className="text-xs font-400">
                                {item.name}
                              </span>
                            </div>
                            <div>
                              <span>
                                <svg
                                  className="fill-current"
                                  width="6"
                                  height="9"
                                  viewBox="0 0 6 9"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    x="1.49805"
                                    y="0.818359"
                                    width="5.78538"
                                    height="1.28564"
                                    transform="rotate(45 1.49805 0.818359)"
                                  />
                                  <rect
                                    x="5.58984"
                                    y="4.90918"
                                    width="5.78538"
                                    height="1.28564"
                                    transform="rotate(135 5.58984 4.90918)"
                                  />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="nav">
                <ul className="nav-wrapper flex xl:space-x-10 space-x-5">
                  <li className="relative">
                    <Link to="/">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer 
                        text-qblacktext
                      `}
                      >
                        <span>Home</span>

                      </span>
                    </Link>
                  </li>
                  <li>
                    <span
                      className={`flex items-center text-sm font-600 cursor-pointer text-qblacktext"
                      `}
                    >
                      <span>Show now</span>
                      <span className="ml-1.5 ">
                        <Arrow className="fill-current" />
                      </span>
                    </span>
                    <div className="sub-menu w-full absolute left-0 top-[60px]">
                      <div
                        className="mega-menu-wrapper w-full bg-white p-[30px] flex justify-between items-center "
                        style={{
                          minHeight: "295px",
                          boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                        }}
                      >
                        <div className="categories-wrapper flex-1 h-full flex justify-around -ml-[70px]">
                          <div>
                            <div className="category">
                              <h1 className="text-[13px] font-700 text-qblack uppercase mb-[13px]">
                                Top Brands
                              </h1>
                            </div>
                            <div className="category-items">
                              <ul className="flex flex-col space-y-2">

                                {brands.slice(0, menulength).map((brand) => (
                                  <li key={brand.id}>
                                    <Link to={`/all-products?brand=${encodeURIComponent(brand.name)}`}>
                                      <span className="text-qgray text-sm font-400 border-b border-transparent 
                       hover:text-qyellow hover:border-qyellow">
                                        {brand.name}
                                      </span>
                                    </Link>
                                  </li>
                                ))}

                              </ul>
                            </div>
                          </div>
                          <div>
                            <div className="category">
                              <h1 className="text-[13px] font-700 text-qblack uppercase mb-[13px]">
                                Polular Category
                              </h1>
                            </div>
                            <div className="category-items">
                              <ul className="flex flex-col space-y-2">
                                {categories.slice(0, menulength).map((category) => (
                                  <li key={category.id}>
                                    <Link to="/all-products">
                                      <span className="text-qgray text-sm font-400 border-b border-transparent 
                       hover:text-qyellow hover:border-qyellow">
                                        {category.name}
                                      </span>
                                    </Link>
                                  </li>
                                ))}


                              </ul>
                            </div>
                          </div>
                          <div>
                            <div className="category">
                              <h1 className="text-[13px] font-700 text-qblack uppercase mb-[13px]">
                                Best Sellers
                              </h1>
                            </div>
                            <div className="category-items">
                              <ul className="flex flex-col space-y-2">
                                {[...brands]
                                  .sort(() => 0.5 - Math.random())
                                  .slice(0, menulength)
                                  .map((brand) => (
                                    <li key={brand.id}>
                                      <Link to="/all-products">
                                        <span className="cursor-pointer text-qgray text-sm font-400 border-b border-transparent 
                                        hover:text-qyellow hover:border-qyellow">
                                          {brand.name}
                                        </span>
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="thumbnil w-[348px] h-full">
                          <div className="w-full h-[235px]">
                            <img
                              width=""
                              src={`/public/assets/images/mega-menu-thumb.jpg`}
                              alt=""
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  {/* <li className="relative">
                    <span
                      className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                        }`}
                    >
                      <span>Pages</span>
                      <span className="ml-1.5 ">
                        <Arrow className="fill-current" />
                      </span>
                    </span>
                    <div className="sub-menu w-[220px] absolute left-0 top-[60px]">
                      <div
                        className="w-full bg-white flex justify-between items-center "
                        style={{
                          boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                        }}
                      >
                        <div className="categories-wrapper w-full h-full p-5">
                          <div>
                            <div className="category-items">
                              <ul className="flex flex-col space-y-2">
                                <li>
                                  <Link to="/privacy-policy">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent   ${type === 3
                                        ? "hover:text-qh3-blue hover:border-qh3-blue"
                                        : "hover:text-qyellow hover:border-qyellow"
                                        }`}
                                    >
                                      Privacy Policy
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/terms-condition">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent   ${type === 3
                                        ? "hover:text-qh3-blue hover:border-qh3-blue"
                                        : "hover:text-qyellow hover:border-qyellow"
                                        }`}
                                    >
                                      Terms and Conditions
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/faq">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent   ${type === 3
                                        ? "hover:text-qh3-blue hover:border-qh3-blue"
                                        : "hover:text-qyellow hover:border-qyellow"
                                        }`}
                                    >
                                      FAQ
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/all-products">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent   ${type === 3
                                        ? "hover:text-qh3-blue hover:border-qh3-blue"
                                        : "hover:text-qyellow hover:border-qyellow"
                                        }`}
                                    >
                                      Shop Category Icon
                                    </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/all-products">
                                    <span
                                      className={`text-qgray text-sm font-400 border-b border-transparent   ${type === 3
                                        ? "hover:text-qh3-blue hover:border-qh3-blue"
                                        : "hover:text-qyellow hover:border-qyellow"
                                        }`}
                                    >
                                      Shop List View
                                    </span>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li> */}
                  <li>
                    <Link to="/about">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                          }`}
                      >
                        <span>About</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blogs">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                          }`}
                      >
                        <span>Blog</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact">
                      <span
                        className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? "text-white" : "text-qblacktext"
                          }`}
                      >
                        <span>Contact</span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="become-seller-btn">
              <Link to="/become-saller">
                <div className="black-btn w-[161px] h-[40px] flex justify-center items-center cursor-pointer">
                  <div className="flex space-x-2 items-center">
                    <span className="text-sm font-600">Become a Seller</span>
                    <span>
                      <svg
                        className="fill-current"
                        width="6"
                        height="10"
                        viewBox="0 0 6 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="1.08984"
                          width="6.94106"
                          height="1.54246"
                          transform="rotate(45 1.08984 0)"
                          fill="white"
                        />
                        <rect
                          x="6"
                          y="4.9082"
                          width="6.94106"
                          height="1.54246"
                          transform="rotate(135 6 4.9082)"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
