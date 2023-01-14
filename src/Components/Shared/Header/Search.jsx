import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Search(props) {
  const [q, setQuery] = useState("");

  function handleChange(e) {
    setQuery(e.target.value);
    props.setSearch(e.target.value);
  }
  return (
    <div className="search-wrapper">
      <input
        className="search-input"
        type="text"
        placeholder="Search"
        onChange={handleChange}
      />
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </div>
  );
}

export default Search;
