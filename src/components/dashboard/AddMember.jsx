import React from "react";
import "../styles/Addmember.css";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { memberActions } from "../../store/index";

function AddMember({ setAddMemberOpen }) {
  const dispatch = useDispatch();
  const { addMember, fetchAllMembers } = bindActionCreators(
    memberActions,
    dispatch
  );

  const [name, setName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  const onStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const onNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const onCancelClick = () => {
    setAddMemberOpen(false);
  };

  const onMemberAdd = () => {
    if (name && company && status) {
      const date = new Date(Date.now()).toLocaleString().split(",")[0];
      addMember({ name, company, status, notes, lastUpdatedOn: date }).then(
        () => {
          setName("");
          setStatus("");
          setCompany("");
          setNotes("");
          fetchAllMembers();
          setAddMemberOpen(false);
        }
      );
    }
  };
  return (
    <div className="modalContainer">
      <div className="popupContent">
        <div className="modalContent">
          <h2>Add member</h2>
          <p className="title">Name</p>
          <input
            value={name}
            placeholder="Enter name"
            type="text"
            onChange={onNameChange}
          />
          <p className="title">Company</p>
          <input
            value={company}
            placeholder="Enter company"
            type="text"
            onChange={onCompanyChange}
          />
          <p className="title">Status</p>
          <input
            value={status}
            placeholder="Enter status"
            type="text"
            onChange={onStatusChange}
          />
          <p className="title">Notes</p>
          <input
            value={notes}
            placeholder="Enter notes"
            type="text"
            onChange={onNotesChange}
          />
          <div className="actionButtons">
            <button className="cancel" onClick={onCancelClick}>
              Cancel
            </button>
            <button onClick={onMemberAdd}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMember;
