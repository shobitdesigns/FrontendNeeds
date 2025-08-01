import { Link } from "react-router-dom";
import ThinBag from "../../../Helpers/icons/ThinBag";
import Middlebar from "./Middlebar";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import { useCart } from "../../../Contexts/CartContext";
import Marquee from "./Marquee";

export default function HeaderOne({ className, drawerAction, type = 1 }) {
  const { cartItems } = useCart();
  const marquee ="  🎉 Big Sale Alert! Up to 50% OFF on selected items – Limited Time Offer! 🛍️ | Free Shipping on Orders Over ₹999 🚚 | Hurry – While Stocks Last! ⏳"
  return (
    <header className={` ${className || ""} header-section-wrapper relative`}>
      <TopBar className="quomodo-shop-top-bar" />
      <Marquee text={Marquee}/>
      <Middlebar
        type={type}
        className="quomodo-shop-middle-bar lg:block hidden"
      />
      <div className="quomodo-shop-drawer lg:hidden block w-full h-[60px] bg-white">
        <div className="w-full h-full flex justify-between items-center px-5">
          <div onClick={drawerAction}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <div>

            <Link to="/">
              {/* <img
                width="152"
                height="36"
                src={`/public/assets/images/logo.svg`}
                alt="logo"
              /> */}
                   <h2 style={{ fontSize: 20, color: "#ffbb38", fontWeight:900 }} >Daily Needs</h2>
            </Link>

          </div>
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
        </div>
      </div>
      <Navbar type={type} className="quomodo-shop-nav-bar lg:block hidden" />
    </header>
  );
}
