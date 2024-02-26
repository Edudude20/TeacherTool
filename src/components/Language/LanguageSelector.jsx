import { useState } from "react";

const LanguageSelector = () => {
  const { language, changeLanguage } = useState("en");

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  return (
    <div>
      <label htmlFor="language-selector">Language</label>
      <select
        value={language}
        onChange={handleLanguageChange}
        name="language-selector"
        id="language-selector"
      >
        <option value="en">English</option>
        <option value="fi">Finnish</option>
        <option value="se">Swedish</option>
        {/* Add more language options as needed */}
      </select>
    </div>
  );
};

export default LanguageSelector;
