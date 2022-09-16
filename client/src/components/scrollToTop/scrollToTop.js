import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";

//boilerplate code from stack overflow that resets the position of the page on re-route to top of the window
const ScrollToTop = ({ children }) => {
    const location = useLocation()
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0)
    }, [location.pathname])
    return children
  }

  export default ScrollToTop;