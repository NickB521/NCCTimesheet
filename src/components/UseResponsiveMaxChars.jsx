import { useState, useEffect } from "react";

const UseResponsiveMaxChars = (defaultMax) => {
  const [maxChars, setMaxChars] = useState(defaultMax);

  useEffect(() => {
    const updateMaxChars = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 1000) setMaxChars(5);
      else if (screenWidth < 1175) setMaxChars(10);
      else if (screenWidth < 1275) setMaxChars(12);
      else if (screenWidth < 1400) setMaxChars(15);
      else if (screenWidth < 1700) setMaxChars(17);
      else if (screenWidth < 1950) setMaxChars(25);
      else if (screenWidth < 2250) setMaxChars(30);
      else if (screenWidth < 2450) setMaxChars(35);
      else setMaxChars(40);
    };

    updateMaxChars();
    window.addEventListener("resize", updateMaxChars);
    return () => window.removeEventListener("resize", updateMaxChars);
  }, []);

  return maxChars;
};

export default UseResponsiveMaxChars;
