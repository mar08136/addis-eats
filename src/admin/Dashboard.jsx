import { useEffect, useState } from "react";

function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("addisEatsOrders")
    ) || [];

    setOrders(savedOrders);
  }, []);

  const revenue = orders.reduce(
    (total, order) => total + Number(order.total || 0),
    0
  );

  const orderCount = orders.length;

  const averageOrderValue =
    orderCount > 0 ? revenue / orderCount : 0;

  const dishSales = {};

  orders.forEach((order) => {
    order.items?.forEach((item) => {
      if (!dishSales[item.id]) {
        dishSales[item.id] = {
          name: item.name,
          quantity: 0,
        };
      }

      dishSales[item.id].quantity += item.quantity || 1;
    });
  });

  const topDishes = Object.values(dishSales)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const statusCounts = {
    pending: 0,
    preparing: 0,
    delivering: 0,
    delivered: 0,
  };

  orders.forEach((order) => {
    const status = order.status;

    if (status === "pending") {
      statusCounts.pending++;
    } else if (status === "preparing") {
      statusCounts.preparing++;
    } else if (
      status === "delivering" ||
      status === "on-the-way"
    ) {
      statusCounts.delivering++;
    } else if (status === "delivered") {
      statusCounts.delivered++;
    }
  });

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <div>
          <p className="admin-label">ADDIS EATS</p>
          <h1>Dashboard</h1>
          <span>Overview of your restaurant</span>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="dashboard-stat">
          <span>Total Revenue</span>
          <strong>{revenue.toLocaleString()} ETB</strong>
        </div>

        <div className="dashboard-stat">
          <span>Total Orders</span>
          <strong>{orderCount}</strong>
        </div>

        <div className="dashboard-stat">
          <span>Average Order</span>
          <strong>
            {Math.round(
              averageOrderValue
            ).toLocaleString()}{" "}
            ETB
          </strong>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-card">
          <div className="dashboard-card-header">
            <h2>Top Selling Dishes</h2>
          </div>

          {topDishes.length === 0 ? (
            <p className="dashboard-empty">
              No sales data yet.
            </p>
          ) : (
            <div className="top-dishes">
              {topDishes.map((dish, index) => (
                <div
                  className="top-dish"
                  key={dish.name}
                >
                  <div className="top-dish-number">
                    {index + 1}
                  </div>

                  <div className="top-dish-info">
                    <strong>{dish.name}</strong>
                    <span>
                      {dish.quantity} sold
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="dashboard-card">
          <div className="dashboard-card-header">
            <h2>Order Status</h2>
          </div>

          <div className="status-list">
            <div className="status-item">
              <span>Pending</span>
              <strong>{statusCounts.pending}</strong>
            </div>

            <div className="status-item">
              <span>Preparing</span>
              <strong>{statusCounts.preparing}</strong>
            </div>

            <div className="status-item">
              <span>Delivering</span>
              <strong>{statusCounts.delivering}</strong>
            </div>

            <div className="status-item">
              <span>Delivered</span>
              <strong>{statusCounts.delivered}</strong>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;