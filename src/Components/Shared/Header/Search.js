import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
function Search() {
  return (
    <div className="search-wrapper">
      <input className="search-input" type="text" placeholder="Search" />
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </div>
  );
}

export default Search;
