import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const orderSlice = createSlice({
  name: 'orders',
  initialState: { items: [] },
  reducers: {
    setOrders: (state, action) => {
      state.items = action.payload;
    },
    addOrder: (state, action) => {
      state.items.push(action.payload);
    },
    removeOrder: (state, action) => {
      state.items = state.items.filter(order => order.id !== action.payload);
    },
    updateOrder: (state, action) => {
      const index = state.items.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { setOrders, addOrder, removeOrder, updateOrder } = orderSlice.actions;

export const fetchOrders = () => async dispatch => {
  const response = await axios.get('https://casacomfort-5d739-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json');
  const ordersData = response.data ? Object.keys(response.data).map(key => ({ ...response.data[key], id: key })) : [];
  dispatch(setOrders(ordersData));
};

export const createOrder = order => async dispatch => {
  const response = await axios.post('https://casacomfort-5d739-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', order);
  dispatch(addOrder({ ...order, id: response.data.name }));
};

export const deleteOrderById = id => async dispatch => {
  await axios.delete(`https://casacomfort-5d739-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${id}.json`);
  dispatch(removeOrder(id));
};

export const updateOrderStatus = order => async dispatch => {
  await axios.put(`https://casacomfort-5d739-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${order.id}.json`, order);
  dispatch(updateOrder(order));
};

export default orderSlice.reducer;
