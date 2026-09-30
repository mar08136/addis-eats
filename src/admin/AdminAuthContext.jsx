import {
  createContext,
  useContext,
  useState,
} from "react";

const AdminAuthContext = createContext();

function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const savedAdmin =
      sessionStorage.getItem("addisEatsAdmin");

    return savedAdmin
      ? JSON.parse(savedAdmin)
      : null;
  });

  function login(username, password) {
    if (
      username === "admin" &&
      password === "admin123"
    ) {
      const adminData = {
        username: "admin",
      };

      sessionStorage.setItem(
        "addisEatsAdmin",
        JSON.stringify(adminData)
      );

      setAdmin(adminData);

      return true;
    }

    return false;
  }

  function logout() {
    sessionStorage.removeItem("addisEatsAdmin");
    setAdmin(null);
  }

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        login,
        logout,
        isAdmin: Boolean(admin),
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

function useAdminAuth() {
  return useContext(AdminAuthContext);
}

export {
  AdminAuthProvider,
  useAdminAuth,
};