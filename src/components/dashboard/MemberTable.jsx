import React from "react";
import "../styles/MemberTable.css";
import { FaTrash } from "react-icons/fa";

function MemberRow({ member, index, onMemberDelete }) {
  const onDeleteClick = () => {
    onMemberDelete(member.id);
  };
  return (
    <tr className={index % 2 === 0 ? "tableRow grey" : "tableRow"}>
      <td>
        <div className="cellData">{member.name}</div>
      </td>
      <td>
        <div className="cellData">{member.company}</div>
      </td>
      <td>
        <div className="cellData">{member.status}</div>
      </td>
      <td>
        <div className="cellData">{member.lastUpdatedOn}</div>
      </td>
      <td>
        <div className="cellData">{member.notes}</div>
      </td>
      <td>
        <div className="cellData">
          <FaTrash onClick={onDeleteClick} />
        </div>
      </td>
    </tr>
  );
}

function MemberTable({ membersList, onMemberDelete }) {
  const MemberRows = membersList.map((member, index) => {
    return (
      <MemberRow
        onMemberDelete={onMemberDelete}
        member={member}
        key={member.id}
        index={index}
      />
    );
  });
  return (
    <div>
      <table className="memberTable">
        <thead>
          <tr className="tableRow">
            <th>Name</th>
            <th>Company</th>
            <th>Status</th>
            <th>Last updated</th>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{MemberRows}</tbody>
      </table>
    </div>
  );
}

export default MemberTable;
