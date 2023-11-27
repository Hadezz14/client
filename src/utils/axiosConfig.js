// export const base_url ="https://vyam-backend.onrender.com/api/";
//  export const base_url ="https://api.vyamstore.com/api/";
export const base_url = "http://localhost:5069/api/";

const clearTokenFromLocalStorage = () => {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("customer");
  }
};
export const handleLogout = () => {
  clearTokenFromLocalStorage();
};

export const config = () => {
  const user = JSON.parse(localStorage.getItem("customer")) || {};
  const token = user.token || "";

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };
};
