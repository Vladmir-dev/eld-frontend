import React from "react";

export const Button = ({ children, variant = "primary", ...props }) => {
  const base =
    "px-4 py-2 rounded-lg font-medium focus:outline-none transition-colors";
  const styles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400",
  };

  return (
    <button className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
};
