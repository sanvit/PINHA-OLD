import { useState, useEffect } from "react";

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    console.log("fuck");
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return width;
};

export default useWindowWidth;
