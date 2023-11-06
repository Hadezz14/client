// export const base_url ="https://vyam-backend.onrender.com/api/";
export const base_url ="https://api.vyamstore.com/api/";

const getTokenFromLocalStorage = 
    typeof localStorage !== "undefined" && localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    :null;

    const clearTokenFromLocalStorage =() =>{
      if(typeof localStorage !=="undefined"){
        localStorage.removeItem("customer");
      }
    }
export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};

export const handleLogout =() =>{
  clearTokenFromLocalStorage();
}

