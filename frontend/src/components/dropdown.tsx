import React from "react";

const Dropdown = ({ options, selectedOption, handleChange }: any) => {
  return (
    <select value={selectedOption} onChange={handleChange}>
      {options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
