import { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch, countries }) => {
  const [country, setCountry] = useState("Canada");
  const [name, setName] = useState("");

  const handleSearch = () => {
    onSearch({ country, name });
  };

  const handleClearFilters = () => {
    setCountry("Canada");
    setName("");
    onSearch({ country: "Canada", name: "" });
  };

  return (
    <div className={styles.searchBar}>
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        {countries.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search by name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClearFilters}>Clear All Filters</button>
    </div>
  );
};

export default SearchBar;
