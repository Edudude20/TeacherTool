import { useState } from "react";

const LanguageSelector = () => {
  const { language, changeLanguage } = useState('en');

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  return (
    <select value={language} onChange={handleLanguageChange}>
      <option value="en">English</option>
      <option value="fi">Finnish</option>
      <option value="se">Swedish</option>
      {/* Add more language options as needed */}
    </select>
  );
};

export default LanguageSelector;
