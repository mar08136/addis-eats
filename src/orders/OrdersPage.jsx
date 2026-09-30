import { useEffect, useState } from "react";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("addisEatsOrders")) || [];

    setOrders(savedOrders);
  }, []);

  return (
    <main className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <p>YOUR FOOD JOURNEY</p>
          <h1>My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <h2>No orders yet</h2>
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <article className="order-card" key={order.id}>
                <div className="order-top">
                  <div>
                    <span className="order-id">
                      {order.id}
                    </span>

                    <p>{order.date}</p>
                  </div>

                  <span className="order-status">
                    {order.status}
                  </span>
                </div>

                <div className="order-items">
                  {order.items.map((item) => (
                    <div
                      className="order-item"
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

                <div className="order-bottom">
                  <span>Total</span>

                  <strong>{order.total} ETB</strong>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default OrdersPage;