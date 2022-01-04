import React from "react";
import "../styles/FilterList.css";

function FilterListOption({ option, toggleFilter, filters }) {
  const onCheckboxChange = (e) => {
    toggleFilter(option, e.target.checked);
  };
  return (
    <div className="listItem">
      <input
        type="checkbox"
        onChange={onCheckboxChange}
        checked={filters.get(option)}
      />
      <p className="label"> {option} </p>
    </div>
  );
}

function FilterList(props) {
  const { filterOptions, toggleFilter, onSelectAllToggle, allSelected } = props;
  return (
    <div className="filterListPopup">
      <div className="listItem">
        <input
          key="selectAllFilterCheckbox"
          type="checkbox"
          onChange={onSelectAllToggle}
          checked={allSelected}
        />
        <p className="label"> Select all </p>
      </div>
      {[...filterOptions.keys()].map((option, index) => {
        return (
          <FilterListOption
            filters={filterOptions}
            key={`${option}-${index}`}
            option={option}
            toggleFilter={toggleFilter}
          />
        );
      })}
    </div>
  );
}

export default FilterList;
