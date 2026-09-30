import { useState } from "react";

function OrderManager() {
  const [orders, setOrders] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("addisEatsOrders")) || []
    );
  });

  const [selectedOrder, setSelectedOrder] = useState(null);

  function saveOrders(updatedOrders) {
    setOrders(updatedOrders);

    localStorage.setItem(
      "addisEatsOrders",
      JSON.stringify(updatedOrders)
    );
  }

  function updateStatus(id, status) {
    const updatedOrders = orders.map((order) =>
      order.id === id
        ? { ...order, status }
        : order
    );

    saveOrders(updatedOrders);

    if (selectedOrder?.id === id) {
      setSelectedOrder({
        ...selectedOrder,
        status,
      });
    }
  }

  function deleteOrder(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmed) {
      return;
    }

    const updatedOrders = orders.filter(
      (order) => order.id !== id
    );

    saveOrders(updatedOrders);

    if (selectedOrder?.id === id) {
      setSelectedOrder(null);
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-label">ADDIS EATS</p>
          <h1>Order Management</h1>
          <span>View and manage customer orders</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="admin-empty-card">
          <h2>No orders yet</h2>
          <p>Customer orders will appear here.</p>
        </div>
      ) : (
        <div className="orders-table">
          <div className="orders-table-header">
            <span>Order</span>
            <span>Customer</span>
            <span>Total</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {orders.map((order) => (
            <div
              className="orders-table-row"
              key={order.id}
            >
              <strong>#{order.id}</strong>

              <span>
                {order.customer?.name || "Customer"}
              </span>

              <span>
                {Number(order.total || 0).toLocaleString()} ETB
              </span>

              <select
                value={order.status || "pending"}
                onChange={(event) =>
                  updateStatus(
                    order.id,
                    event.target.value
                  )
                }
              >
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="delivering">Delivering</option>
                <option value="delivered">Delivered</option>
              </select>

              <div className="order-actions">
                <button
                  onClick={() => setSelectedOrder(order)}
                >
                  View
                </button>

                <button
                  className="delete-button"
                  onClick={() => deleteOrder(order.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div className="order-modal">
          <div className="order-modal-card">
            <div className="order-modal-header">
              <div>
                <p className="admin-label">ORDER</p>
                <h2>#{selectedOrder.id}</h2>
              </div>

              <button
                className="close-modal"
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
            </div>

            <div className="order-customer">
              <h3>Customer</h3>

              <p>
                <strong>Name:</strong>{" "}
                {selectedOrder.customer?.name ||
                  "Not provided"}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {selectedOrder.customer?.phone ||
                  "Not provided"}
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {selectedOrder.customer?.address ||
                  "Not provided"}
              </p>
            </div>

            <div className="order-items">
              <h3>Items</h3>

              {selectedOrder.items?.map((item) => (
                <div
                  className="order-item"
                  key={item.id}
                >
                  <div>
                    <strong>{item.name}</strong>
                    <span>
                      {item.quantity} ×{" "}
                      {Number(item.price).toLocaleString()} ETB
                    </span>
                  </div>

                  <strong>
                    {(
                      Number(item.price) *
                      Number(item.quantity)
                    ).toLocaleString()}{" "}
                    ETB
                  </strong>
                </div>
              ))}
            </div>

            <div className="order-total">
              <span>Total</span>
              <strong>
                {Number(
                  selectedOrder.total || 0
                ).toLocaleString()}{" "}
                ETB
              </strong>
            </div>

            <div className="order-status-controls">
              <label>Status</label>

              <select
                value={selectedOrder.status || "pending"}
                onChange={(event) =>
                  updateStatus(
                    selectedOrder.id,
                    event.target.value
                  )
                }
              >
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="delivering">Delivering</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderManager;