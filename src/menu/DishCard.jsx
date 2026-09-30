import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import { useFavorites } from "../favorites/FavoritesContext";

function DishCard({ dish }) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  function handleAddToCart(event) {
    event.preventDefault();
    event.stopPropagation();
    addToCart(dish);
  }

  function handleFavorite(event) {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(dish);
  }

  return (
    <article className="dish-card">
      <Link to={`/menu/${dish.id}`} className="dish-link">
        <img
          src={dish.image}
          alt={dish.name}
          className="dish-image"
        />

        <div className="dish-content">
          <div className="dish-top">
            <span className="dish-category">
              {dish.category}
            </span>

            <div className="dish-actions">
              <span className="dish-rating">
                ★ {dish.rating}
              </span>

              <button
                className={`favorite-button ${
                  isFavorite(dish.id) ? "active" : ""
                }`}
                onClick={handleFavorite}
              >
                {isFavorite(dish.id) ? "♥" : "♡"}
              </button>
            </div>
          </div>

          <h3>{dish.name}</h3>

          <p>{dish.description}</p>

          <div className="dish-footer">
            <strong>{dish.price} ETB</strong>

            <button
              className="add-button"
              onClick={handleAddToCart}
            >
              +
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default DishCard;