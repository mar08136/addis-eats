import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./home/HomePage";
import MenuPage from "./menu/MenuPage";
import DishDetailPage from "./menu/DishDetailPage";
import CartPage from "./cart/CartPage";
import CheckoutPage from "./checkout/CheckoutPage";
import FavoritesPage from "./favorites/FavoritesPage";
import OrdersPage from "./orders/OrdersPage";
import DishManager from "./admin/DishManager";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import OrderManager from "./admin/OrderManager";
import { CartProvider } from "./cart/CartContext";
import { FavoritesProvider } from "./favorites/FavoritesContext";

import AdminLayout from "./admin/AdminLayout";
import RequireAdmin from "./admin/RequireAdmin";
import AdminSignInPage from "./admin/SignInPage";
import Dashboard from "./admin/Dashboard";
import { AdminAuthProvider } from "./admin/AdminAuthContext";

function App() {
  return (
    <AdminAuthProvider>
      <FavoritesProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/admin/login"
                element={<AdminSignInPage />}
              />

              <Route element={<RequireAdmin />}>
                <Route
                  path="/admin"
                  element={<AdminLayout />}
                >
                  <Route
                    index
                    element={<Dashboard />}
                  />

                  <Route
                    path="menu"
                    element={<DishManager />}
                  />
                  <Route
                    path="orders"
                    element={<OrderManager />}
                  />
                </Route>
              </Route>

              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <HomePage />
                    <Footer />
                  </>
                }
              />

              <Route
                path="/menu"
                element={
                  <>
                    <Navbar />
                    <MenuPage />
                    <Footer />
                  </>
                }
              />

              <Route
                path="/menu/:id"
                element={
                  <>
                    <Navbar />
                    <DishDetailPage />
                    <Footer />
                  </>
                }
              />

              <Route
                path="/cart"
                element={
                  <>
                    <Navbar />
                    <CartPage />
                    <Footer />
                  </>
                }
              />

              <Route
                path="/checkout"
                element={
                  <>
                    <Navbar />
                    <CheckoutPage />
                    <Footer />
                  </>
                }
              />

              <Route
                path="/favorites"
                element={
                  <>
                    <Navbar />
                    <FavoritesPage />
                    <Footer />
                  </>
                }
              />

              <Route
                path="/orders"
                element={
                  <>
                    <Navbar />
                    <OrdersPage />
                    <Footer />
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </FavoritesProvider>
    </AdminAuthProvider>
  );
}

export default App;