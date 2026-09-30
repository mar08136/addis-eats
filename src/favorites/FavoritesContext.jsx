import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(
      localStorage.getItem("addisEatsFavorites")
    ) || [];
  });

  useEffect(() => {
    localStorage.setItem(
      "addisEatsFavorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  function toggleFavorite(dish) {
    const existingFavorite = favorites.find(
      (item) => item.id === dish.id
    );

    if (existingFavorite) {
      setFavorites(
        favorites.filter((item) => item.id !== dish.id)
      );
    } else {
      setFavorites([...favorites, dish]);
    }
  }

  function isFavorite(id) {
    return favorites.some((item) => item.id === id);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

function useFavorites() {
  return useContext(FavoritesContext);
}

export { FavoritesProvider, useFavorites };