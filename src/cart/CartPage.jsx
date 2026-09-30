import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

function CartPage() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-container empty-cart">
          <h1>Your cart is empty</h1>

          <p>
            Add some delicious food from our menu.
          </p>

          <Link to="/menu" className="continue-shopping">
            Explore Menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">

        <div className="cart-header">
          <div>
            <p className="cart-label">
              YOUR ORDER
            </p>

            <h1>Your Cart</h1>
          </div>

          <p>
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </p>
        </div>


        <div className="cart-layout">

          <div className="cart-items">

            {cartItems.map((item) => (
              <article
                className="cart-item"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />


                <div className="cart-item-info">

                  <div className="cart-item-top">

                    <div>
                      <h2>{item.name}</h2>

                      <p>
                        {item.price} ETB each
                      </p>
                    </div>


                    <button
                      className="remove-button"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Remove
                    </button>

                  </div>


                  <div className="cart-item-bottom">

                    <div className="quantity-controls">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                      >
                        +
                      </button>

                    </div>


                    <strong>
                      {item.price * item.quantity} ETB
                    </strong>

                  </div>

                </div>

              </article>
            ))}

          </div>


          <aside className="order-summary">

            <h2>Order Summary</h2>


            <div className="summary-row">
              <span>Subtotal</span>

              <span>
                {totalPrice} ETB
              </span>
            </div>


            <div className="summary-row total-row">
              <strong>Total</strong>

              <strong>
                {totalPrice} ETB
              </strong>
            </div>


            <Link
              to="/checkout"
              className="checkout-button"
            >
              Proceed to Checkout
            </Link>

          </aside>

        </div>

      </div>
    </main>
  );
}

export default CartPage;