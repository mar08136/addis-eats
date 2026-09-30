import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../cart/CartContext";

function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    payment: "cash",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const phoneRegex = /^09\d{8}$/;

    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid Ethiopian phone number.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const newOrder = {
      id: `AE-${Date.now()}`,
      customer: {
        name: formData.fullName,
        phone: formData.phone,
        address: formData.address,
      },
      payment: formData.payment,
      items: cartItems,
      total: totalPrice,
      status: "pending",
      date: new Date().toLocaleString(),
    };

    const savedOrders =
      JSON.parse(localStorage.getItem("addisEatsOrders")) || [];

    localStorage.setItem(
      "addisEatsOrders",
      JSON.stringify([...savedOrders, newOrder])
    );

    setPlacedOrder(newOrder);
    clearCart();
    setOrderPlaced(true);
  }

  if (orderPlaced && placedOrder) {
    return (
      <main className="checkout-page">
        <div className="order-success">
          <h1>Order Confirmed!</h1>

          <p>
            Thank you for ordering from Addis Eats.
          </p>

          <div className="success-order-info">
            <p>
              <strong>Order ID:</strong>{" "}
              {placedOrder.id}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {placedOrder.status}
            </p>

            <p>
              <strong>Total:</strong>{" "}
              {placedOrder.total} ETB
            </p>
          </div>

          <div className="success-order-items">
            <h2>Your Order</h2>

            {placedOrder.items.map((item) => (
              <div
                className="success-order-item"
                key={item.id}
              >
                <span>
                  {item.name} × {item.quantity}
                </span>

                <strong>
                  {item.price * item.quantity} ETB
                </strong>
              </div>
            ))}
          </div>

          <p>
            Your order is being prepared.
          </p>

          <Link
            to="/menu"
            className="continue-shopping-button"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">

        <div className="checkout-header">
          <p>COMPLETE YOUR ORDER</p>
          <h1>Checkout</h1>
        </div>

        <div className="checkout-layout">

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >
            <h2>Delivery Information</h2>

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                placeholder="09XXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Delivery Address</label>

              <textarea
                name="address"
                placeholder="Enter your delivery address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <h2>Payment Method</h2>

            <div className="payment-options">

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={formData.payment === "cash"}
                  onChange={handleChange}
                />

                Cash on Delivery
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="telebirr"
                  checked={formData.payment === "telebirr"}
                  onChange={handleChange}
                />

                Telebirr
              </label>

            </div>

            <button
              type="submit"
              className="place-order-button"
            >
              Place Order
            </button>

          </form>

          <aside className="checkout-summary">

            <h2>Your Order</h2>

            {cartItems.map((item) => (
              <div
                className="checkout-item"
                key={item.id}
              >
                <span>
                  {item.name} × {item.quantity}
                </span>

                <strong>
                  {item.price * item.quantity} ETB
                </strong>
              </div>
            ))}

            <div className="checkout-total">
              <span>Total</span>

              <strong>
                {totalPrice} ETB
              </strong>
            </div>

          </aside>

        </div>

      </div>
    </main>
  );
}

export default CheckoutPage;