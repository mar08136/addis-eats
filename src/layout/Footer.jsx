import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Addis <span>Eats</span>
          </Link>

          <p>
            Discover delicious food and enjoy your favorite meals from Addis Eats.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h3>Explore</h3>

            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/orders">My Orders</Link>
          </div>

          <div>
            <h3>Support</h3>

            <Link to="/signin">My Account</Link>
            <a href="#">Help Center</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Addis Eats. Made with love for food.</p>
      </div>
    </footer>
  );
}

export default Footer;