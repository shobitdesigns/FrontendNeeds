import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function ScrollToTopLayout() {
  const location = useLocation();

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [location]);

  return <Outlet />;
}