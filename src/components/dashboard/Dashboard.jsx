import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { memberActions } from "../../store/index";
import MemberTable from "./MemberTable";
import "../styles/Dashboard.css";
import AddMember from "./AddMember";
import FilterList from "../styles/FilterList.css";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { fetchAllMembers, deleteMember } = bindActionCreators(
    memberActions,
    dispatch
  );
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [filters, setFilters] = React.useState(new Map());
  const [allUnselected, setAllUnselected] = React.useState(true);
  const [allSelected, setAllSelected] = React.useState(false);
  const [sortOrder, setSortOrder] = React.useState(null);
  const [addMemberOpen, setAddMemberOpen] = React.useState(false);
  const members = useSelector((state) => state.members);
  const { userSignout } = useAuth();

  const showAddMemberDialog = () => {
    setAddMemberOpen(true);
  };

  const toggleFilterDisplay = () => {
    setFilterOpen(!filterOpen);
  };

  const resetHeaderAction = () => {
    const updatedFilters = [...filters.keys()].reduce((acc, filter) => {
      if (!acc.get(filter)) {
        acc = acc.set(filter, false);
      }
      return acc;
    }, new Map());
    setSortOrder(null);
    setFilters(updatedFilters);
    setAllUnselected(true);
    setAllSelected(false);
  };

  const toggleSortOrder = () => {
    if (!sortOrder) {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else if (sortOrder === "desc") {
      setSortOrder("asc");
    }
  };

  const onMemberDelete = (id) => {
    deleteMember(id).then(() => {
      fetchAllMembers();
    });
  };

  const getSortedData = (data) => {
    let sortedArray = data;
    if (sortOrder) {
      sortedArray.sort((a, b) => {
        if (
          a.status.toLowerCase() === "active" ||
          b.status.toLowerCase() === "inactive"
        ) {
          return sortOrder === "asc" ? -1 : 1;
        } else if (
          a.status.toLowerCase() === "inactive" ||
          b.status.toLowerCase() === "active"
        ) {
          return sortOrder === "asc" ? 1 : -1;
        } else {
          return sortOrder === "asc"
            ? a.company - b.company
            : b.company - a.company;
        }
      });
      return sortedArray;
    }
    return data;
  };

  const toggleFilter = (option, isChecked) => {
    const updatedFilters = new Map(filters.set(option, isChecked));
    let selectedFilters = 0;
    let unselectedFilters = 0;
    [...updatedFilters.keys()].forEach((company) => {
      if (filters.get(company)) {
        selectedFilters += 1;
      } else {
        unselectedFilters += 1;
      }
    });

    setFilters(updatedFilters);
    setAllUnselected(unselectedFilters === filters.size);
    setAllSelected(selectedFilters === filters.size);
  };

  const onSelectAllToggle = () => {
    const updatedFilters = [...filters.keys()].reduce((acc, filter) => {
      if (!acc.get(filter)) {
        acc = acc.set(filter, !allSelected);
      }
      return acc;
    }, new Map());
    setAllSelected(!allSelected);
    setAllUnselected(allSelected);
    setFilters(new Map(updatedFilters));
  };

  React.useEffect(() => {
    fetchAllMembers();
  }, []);

  React.useEffect(() => {
    const filterOptions = members.length
      ? members.reduce((acc, member) => {
          if (!acc.get(member.company)) {
            acc = acc.set(member.company, false);
          }
          return acc;
        }, new Map())
      : new Map();
    setFilters(new Map(filterOptions));
  }, [members]);

  const filteredData =
    allUnselected || allSelected
      ? members
      : members.filter((member) => {
          return filters.get(member.company);
        });

  const sortedData = getSortedData(filteredData);

  return (
    <div className="dashboardContainer">
      <div className="dashboardHeader">
        <h2>Team Members</h2>
        <button className="button" onClick={showAddMemberDialog}>
          Add Member +
        </button>
        <button className="button" onClick={userSignout}>
          Log out
        </button>
      </div>
      <div className="headerActions">
        <div className="headerActions">
          <p>Filter by: </p>
          <div>
            <button className="button filter" onClick={toggleFilterDisplay}>
              Company ({filters.size})
            </button>
            {filterOpen && (
              <FilterList
                allSelected={allSelected}
                onSelectAllToggle={onSelectAllToggle}
                filterOptions={filters}
                toggleFilter={toggleFilter}
              />
            )}
          </div>
        </div>
        <div className="headerActions">
          <p>Sort by: </p>
          <button className="button filter" onClick={toggleSortOrder}>
            Status {sortOrder ? sortOrder : null}
          </button>
        </div>
        <div>
          <button className="button reset" onClick={resetHeaderAction}>
            Reset
          </button>
        </div>
      </div>
      <div>
        <MemberTable onMemberDelete={onMemberDelete} membersList={sortedData} />
      </div>
      {addMemberOpen ? <AddMember setAddMemberOpen={setAddMemberOpen} /> : null}
    </div>
  );
}
