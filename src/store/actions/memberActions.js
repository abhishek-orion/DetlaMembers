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
            type: "FETCH_MEMBERS_SUCCESS",
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
            resolve(res);
          });
      } catch (error) {
        reject(error);
      }
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
              type: "DELETE_MEMBER_SUCESS",
            });
            resolve("Member deleted");
          });
      } catch (error) {
        reject(error);
      }
    });
  };
};
