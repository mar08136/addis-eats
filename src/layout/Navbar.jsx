import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <nav className="navbar-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <div className="logo-bowl">
            <span className="steam steam-one"></span>
            <span className="steam steam-two"></span>
            <span className="steam steam-three"></span>
            <span className="bowl-food"></span>
            <span className="bowl"></span>
          </div>

          <div className="logo-text">
            <strong>
              Addis <span>Eats</span>
            </strong>
            <small>Your favorite Ethiopian food</small>
          </div>
        </Link>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="active-link" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/menu" onClick={closeMenu}>
            Menu
          </Link>

          <Link to="/orders" onClick={closeMenu}>
            Orders
          </Link>

          <Link to="/favorites" onClick={closeMenu}>
            Favorites
          </Link>
        </div>

        <div className="nav-actions">
          <button className="icon-button" aria-label="Search">
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16L21 21" />
            </svg>
          </button>

          <Link to="/cart" className="cart-button" aria-label="Cart">
            <svg viewBox="0 0 24 24">
              <path d="M3 4H5L7.5 15H17.5L20 7H6" />
              <circle cx="9" cy="19" r="1.3" />
              <circle cx="17" cy="19" r="1.3" />
            </svg>

            <span className="cart-badge">0</span>
          </Link>

          <Link to="/admin/login" className="signin-button">
            Admin
          </Link>

          <button
            className={`menu-toggle ${menuOpen ? "open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;