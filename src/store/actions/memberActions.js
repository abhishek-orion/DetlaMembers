import { database } from "../../firebase";

export const fetchAllMembers = () => {
  return (dispatch) => {
    try {
      database
        .collection("users")
        .get()
        .then((querySnapshot) => {
          const membersList = [];
          querySnapshot.forEach((doc) => {
            membersList.push({
              ...doc.data(),
              id: doc.id,
            });
          });
          dispatch({
            type: "fetchMembersSuccess",
            payload: membersList,
          });
        });
    } catch (error) {}
  };
};

export const addMember = (member) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      try {
        database
          .collection("users")
          .add(member)
          .then((res) => {
            dispatch({
              type: "fetchMembers",
            });
            resolve(member);
          });
      } catch (error) {}
    });
  };
};

export const deleteMember = (memberId) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      try {
        database
          .collection("users")
          .doc(memberId)
          .get()
          .then((doc) => {
            doc.ref.delete();
            dispatch({
              type: "memberDeleteSuccess",
            });
            resolve("Member deleted");
          });
      } catch (error) {
        reject(error);
      }
    });
  };
};
