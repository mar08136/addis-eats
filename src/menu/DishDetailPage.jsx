import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../cart/CartContext";
function DishDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getDish() {
      try {
        const response = await fetch("/menu-data.json");

        if (!response.ok) {
          throw new Error("Failed to load dish");
        }

        const data = await response.json();

        const selectedDish = data.find(
          (dish) => dish.id === Number(id)
        );

        if (!selectedDish) {
          throw new Error("Dish not found");
        }

        setDish(selectedDish);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getDish();
  }, [id]);

  if (loading) {
    return <p>Loading dish...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="dish-detail-page">
      <section className="dish-detail">
        <div className="dish-detail-image">
          <img src={dish.image} alt={dish.name} />
        </div>

        <div className="dish-detail-content">
          <p className="dish-detail-category">
            {dish.category}
          </p>

          <h1>{dish.name}</h1>

          <div className="dish-detail-rating">
            ★ {dish.rating} ({dish.reviews} reviews)
          </div>

          <h2>{dish.price} ETB</h2>

          <p className="dish-detail-description">
            {dish.description}
          </p>

          <div className="dish-detail-info">
            <div>
              <span>Preparation Time</span>
              <strong>{dish.preparationTime}</strong>
            </div>

            <div>
              <span>Calories</span>
              <strong>{dish.calories} kcal</strong>
            </div>
          </div>

          <div className="ingredients">
            <h3>Ingredients</h3>

            <ul>
              {dish.ingredients.map((ingredient) => (
                <li key={ingredient}>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="quantity-section">
            <button>-</button>

            <span>1</span>

            <button>+</button>
          </div>

          <button className="detail-add-button">
            Add to Cart
          </button>
        </div>
      </section>
    </main>
  );
}

export default DishDetailPage;