import { Link } from "react-router-dom";
import { useFavorites } from "./FavoritesContext";

function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <main className="favorites-page">
      <div className="favorites-container">
        <div className="favorites-header">
          <p>YOUR FAVORITE DISHES</p>
          <h1>My Favorites</h1>
        </div>

        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <h2>No favorites yet</h2>

            <p>
              Save your favorite dishes and find them here.
            </p>

            <Link to="/menu" className="browse-menu-button">
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((dish) => (
              <article className="favorite-card" key={dish.id}>
                <Link
                  to={`/menu/${dish.id}`}
                  className="favorite-image-link"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="favorite-image"
                  />
                </Link>

                <div className="favorite-content">
                  <div className="favorite-top">
                    <span>{dish.category}</span>

                    <button
                      className="favorite-heart"
                      onClick={() => toggleFavorite(dish)}
                    >
                      ♥
                    </button>
                  </div>

                  <h2>{dish.name}</h2>

                  <p>{dish.description}</p>

                  <div className="favorite-bottom">
                    <strong>{dish.price} ETB</strong>

                    <span>★ {dish.rating}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default FavoritesPage;