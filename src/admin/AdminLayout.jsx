import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";

function AdminLayout() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

    function handleLogout() {
  logout();
  window.location.replace("/");
}

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>ADDIS EATS</span>
          <small>ADMIN</small>
        </div>

        <nav className="admin-nav">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link active"
                : "admin-nav-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/menu"
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link active"
                : "admin-nav-link"
            }
          >
            Menu
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              isActive
                ? "admin-nav-link active"
                : "admin-nav-link"
            }
          >
            Orders
          </NavLink>
        </nav>

        <button
          type="button"
          className="admin-logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;