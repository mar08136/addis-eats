import { useEffect, useState } from "react";

function DishManager() {
  const [dishes, setDishes] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingDish, setEditingDish] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "fast-food",
    description: "",
    price: "",
    rating: "",
    image: "",
  });

  useEffect(() => {
    async function loadDishes() {
      const savedDishes = localStorage.getItem("addisEatsDishes");

      if (savedDishes) {
        setDishes(JSON.parse(savedDishes));
        return;
      }

      const response = await fetch("/menu-data.json");
      const data = await response.json();

      localStorage.setItem(
        "addisEatsDishes",
        JSON.stringify(data)
      );

      setDishes(data);
    }

    loadDishes();
  }, []);

  function saveDishes(updatedDishes) {
    setDishes(updatedDishes);

    localStorage.setItem(
      "addisEatsDishes",
      JSON.stringify(updatedDishes)
    );
  }

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function resetForm() {
    setFormData({
      name: "",
      category: "fast-food",
      description: "",
      price: "",
      rating: "",
      image: "",
    });

    setEditingDish(null);
    setShowForm(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (editingDish) {
      const updatedDishes = dishes.map((dish) =>
        dish.id === editingDish.id
          ? {
              ...dish,
              ...formData,
              price: Number(formData.price),
              rating: Number(formData.rating),
            }
          : dish
      );

      saveDishes(updatedDishes);
    } else {
      const newDish = {
        id: Date.now(),
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating),
      };

      saveDishes([...dishes, newDish]);
    }

    resetForm();
  }

  function handleEdit(dish) {
    setEditingDish(dish);

    setFormData({
      name: dish.name,
      category: dish.category,
      description: dish.description,
      price: dish.price,
      rating: dish.rating,
      image: dish.image,
    });

    setShowForm(true);
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this dish?"
    );

    if (!confirmed) {
      return;
    }

    const updatedDishes = dishes.filter(
      (dish) => dish.id !== id
    );

    saveDishes(updatedDishes);
  }

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-label">ADDIS EATS</p>
          <h1>Menu Management</h1>
          <span>Manage your restaurant dishes</span>
        </div>

        <button
          className="admin-primary-button"
          onClick={() => setShowForm(true)}
        >
          + Add Dish
        </button>
      </div>

      <div className="admin-toolbar">
        <input
          type="text"
          placeholder="Search dishes..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {showForm && (
        <form
          className="dish-form"
          onSubmit={handleSubmit}
        >
          <h2>
            {editingDish ? "Edit Dish" : "Add New Dish"}
          </h2>

          <div className="form-grid">
            <label>
              Name
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Category
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="fast-food">Fast Food</option>
                <option value="chicken-fish">Chicken & Fish</option>
                <option value="sweets">Sweets</option>
                <option value="breakfast">Breakfast</option>
                <option value="drinks">Drinks</option>
                <option value="traditional-food">
                  Traditional Food
                </option>
              </select>
            </label>

            <label>
              Price
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Rating
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-full">
              Image URL
              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-full">
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={resetForm}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="admin-primary-button"
            >
              {editingDish ? "Save Changes" : "Add Dish"}
            </button>
          </div>
        </form>
      )}

      <div className="dish-table">
        <div className="dish-table-header">
          <span>Dish</span>
          <span>Category</span>
          <span>Price</span>
          <span>Rating</span>
          <span>Actions</span>
        </div>

        {filteredDishes.map((dish) => (
          <div className="dish-table-row" key={dish.id}>
            <div className="dish-table-name">
              <img
                src={dish.image}
                alt={dish.name}
              />
              <strong>{dish.name}</strong>
            </div>

            <span>{dish.category}</span>

            <span>{dish.price} ETB</span>

            <span>★ {dish.rating}</span>

            <div className="dish-actions">
              <button onClick={() => handleEdit(dish)}>
                Edit
              </button>

              <button
                className="delete-button"
                onClick={() => handleDelete(dish.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {filteredDishes.length === 0 && (
          <p className="admin-empty">
            No dishes found.
          </p>
        )}
      </div>
    </div>
  );
}

export default DishManager;