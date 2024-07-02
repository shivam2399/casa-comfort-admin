import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, deleteOrderById, updateOrderStatus } from '../store/orderSlice';

const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.items);
  const [editingOrder, setEditingOrder] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleEdit = (order) => {
    setEditingOrder(order);
    setStatus(order.status);
  };

  const handleDelete = (id) => {
    dispatch(deleteOrderById(id));
  };

  const handleUpdate = () => {
    const updatedOrder = { ...editingOrder, status };
    dispatch(updateOrderStatus(updatedOrder));
    setEditingOrder(null);
  };

  return (
    <div className='order-list'>
      <h3>Order List</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <div>
              <h4>Order ID: {order.id}</h4>
              <p>Email: {order.email}</p>
              <p>Product ID: {order.productId}</p>
              <p>Status: {order.status}</p>
              <button onClick={() => handleEdit(order)}>Edit</button>
              <button onClick={() => handleDelete(order.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {editingOrder && (
        <div>
          <h3>Edit Order</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <select value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="">Select Status</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="canceled">Canceled</option>
            </select>
            <button type="submit">Update Order</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default OrderList;
