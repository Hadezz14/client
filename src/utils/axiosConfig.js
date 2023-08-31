export const base_url ="https://vyam-backend.onrender.com/api/";

const getTokenFromLocalStorage = 
    typeof localStorage !== "undefined" && localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    :null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};
