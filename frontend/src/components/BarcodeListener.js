import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BarcodeListener = () => {
  const navigate = useNavigate();
  const [barcode, setBarcode] = useState("");
  let timeout;

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Append character
      setBarcode((prev) => prev + e.key);

      // Reset if no scan activity after 200ms
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (barcode) {
          navigate(`/receipt/${barcode}`);
          setBarcode("");
        }
      }, 200);
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [barcode, navigate]);

  return null; // invisible listener
};

export default BarcodeListener;
