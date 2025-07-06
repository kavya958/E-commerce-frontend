import React, { useState } from 'react';
import axios from 'axios';

const tabs = ['All', 'Completed', 'Continuing', 'Restitute', 'Canceled', 'Pending', 'Shipped'];

const OrderDashboard = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [orders, setOrders] = useState([]);

  const [filters, setFilters] = useState({
    orderId: '',
    customer: '',
    orderItem: '',
    startDate: '',
    endDate: '',
    minPrice: '',
    maxPrice: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const fetchOrders = async () => {
    try {
      const params = {
        ...filters,
        status: activeTab !== 'All' ? activeTab : undefined,
      };
      const response = await axios.get("http://localhost:8080/api/orders", { params });
      console.log("Orders received:", response.data); // debug
      setOrders(response.data);
      setCurrentPage(1); // Reset pagination
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="container py-4">
      <h2 className="mb-4">📦 Order Dashboard</h2>

      {/* Tabs */}
      <div className="btn-group mb-4 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`btn btn-sm ${activeTab === tab ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="row mb-4 g-2">
        <div className="col-md-2">
          <input
            type="text"
            name="orderId"
            className="form-control"
            placeholder="Order ID"
            value={filters.orderId}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            name="customer"
            className="form-control"
            placeholder="Customer"
            value={filters.customer}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            name="orderItem"
            className="form-control"
            placeholder="Order Item"
            value={filters.orderItem}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-2">
          <input
            type="date"
            name="startDate"
            className="form-control"
            value={filters.startDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-2">
          <input
            type="date"
            name="endDate"
            className="form-control"
            value={filters.endDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-1">
          <input
            type="number"
            name="minPrice"
            className="form-control"
            placeholder="Min ₹"
            value={filters.minPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-1">
          <input
            type="number"
            name="maxPrice"
            className="form-control"
            placeholder="Max ₹"
            value={filters.maxPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12 text-end mt-2">
          <button className="btn btn-success" onClick={fetchOrders}>
            🔍 Apply Filters
          </button>
        </div>
      </div>
      
      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-light">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Order Item</th>
              <th>Delivery Date</th>
              <th>Pricing</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No orders found</td>
              </tr>
            ) : (
              currentOrders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.customer}</td>
                  <td>{order.orderItem}</td>
                  <td>{order.deliveryDate}</td>
                  <td>₹ {order.deliveryPricing.toFixed(2)}</td>
                  <td>{order.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ⬅ Prev
          </button>
          <span className="align-self-center px-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-outline-secondary ms-2"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderDashboard;