import DishCard from "./DishCard";
import { useEffect, useState } from "react";
import DishSkeleton from "./DishSkeleton";

function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const categories = [
    "all",
    "fast-food",
    "chicken-fish",
    "sweets",
    "breakfast",
    "drinks",
    "traditional-food",
  ];
  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch = dish.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      dish.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
  useEffect(() => {
    async function getDishes() {
      try {
        const response = await fetch("/menu-data.json");

        if (!response.ok) {
          throw new Error("Failed to load menu");
        }

        const data = await response.json();
        await new Promise((resolve) =>
          setTimeout(resolve, 500)
        );

        setDishes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getDishes();
  }, []);

  if (loading) {
    return (
      <main className="menu-page">
        <div className="menu-header">
          <p>EXPLORE OUR FOOD</p>
          <h1>OUR MENU</h1>
        </div>

        <div className="dishes-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <DishSkeleton key={index} />
          ))}
        </div>
      </main>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="menu-page">
      <div className="menu-header">
        <p>EXPLORE OUR FOOD</p>
        <h1>OUR MENU</h1>
        <span>{dishes.length} dishes available</span>
      </div>
      <div className="menu-controls">
        <div className="menu-search">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>

          <input
            type="text"
            placeholder="Search for your favorite food..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="menu-filters">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter-btn ${selectedCategory === category ? "active" : ""
                }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === "all"
                ? "All"
                : category.replace("-", " & ")}
            </button>
          ))}
        </div>
      </div>
     
        {filteredDishes.length === 0 ? (
          <div className="empty-state">
            <h2>No dishes found</h2>
            <p>Try searching for something else.</p>
          </div>
        ) : (
          <div className="dishes-grid">
            {filteredDishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
              />
            ))}
          </div>
        )}
      
    </main>
  );
}

export default MenuPage;