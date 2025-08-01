import Cart from "../../../Cart";
import Compair from "../../../Helpers/icons/Compair";
import ThinBag from "../../../Helpers/icons/ThinBag";
import ThinLove from "../../../Helpers/icons/ThinLove";
import ThinPeople from "../../../Helpers/icons/ThinPeople";
import SearchBox from "../../../Helpers/SearchBox";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../Contexts/CartContext";
import { useWishlist } from "../../../Contexts/WishlistContext";
import { useCompare } from "../../../Contexts/AddToCompare";
export default function Middlebar({ className, type }) {
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const { compareList } = useCompare();
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 0); // You can adjust 100 as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={`${isFixed ? "fixed top-0 z-50" : ""} w-full h-[86px] bg-white ${className} `}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            <div>

              <Link to="/">
                {/* <img
                    width="152"
                    height="36"
                    src={`/public/assets/images/logo.svg`}
                    alt="logo"
                  /> */}
                <h2 style={{ fontSize: 20, color: "#ffbb38",fontWeight:900 }} >Daily Needs</h2>
              </Link>

            </div>
            <div className="w-[517px] h-[44px]">
              <SearchBox type={type} className="search-com" />
            </div>
            <div className="flex space-x-6 items-center">
              <div className="compaire relative">
                <Link to="/products-compaire">
                  <span>
                    <Compair />
                  </span>
                </Link>
                {compareList.length > 0 && (
                  <span className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]
                    bg-qyellow
                  }`}>
                    {compareList.length}
                  </span>
                )}

              </div>
              <div className="favorite relative">
                <Link to="/wishlist">
                  <span>
                    <ThinLove isHeader />
                  </span>
                </Link>

                {wishlist.length > 0 && (
                  <span className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]
                    bg-qyellow
                `}>
                    {wishlist.length}
                  </span>
                )}

              </div>
              <div className="cart-wrapper group relative py-4">
                <div className="cart relative cursor-pointer">
                  <Link to="/cart">
                    <span>
                      <ThinBag />
                    </span>
                  </Link>
                  {cartItems.length > 0 && (
                    <span
                      className={`w-[18px] h-[18px] rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${type === 3 ? "bg-qh3-blue text-white" : "bg-qyellow"
                        }`}
                    >
                      {cartItems.length}
                    </span>
                  )}
                </div>
                {/* <div className="fixed left-0 top-0 w-full h-full z-40"></div> */}
                {/* hidden group-hover:block" */}
                <Cart
                  type={type}
                  className="absolute -right-[45px] top-11 z-50 hidden group-hover:block"
                />
              </div>
              <div>
                <Link to="/profile">
                  <span>
                    <ThinPeople />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
