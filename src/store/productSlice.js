import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [] },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter(product => product.id !== action.payload);
    },
    updateProductState: (state, action) => {
      const index = state.items.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { setProducts, addProduct, removeProduct, updateProductState } = productSlice.actions;

export const fetchProducts = () => async dispatch => {
  const response = await axios.get('https://casacomfort-5d739-default-rtdb.asia-southeast1.firebasedatabase.app/products.json');
  const productsData = response.data ? Object.keys(response.data).map(key => ({ id: key, ...response.data[key] })) : [];
  dispatch(setProducts(productsData));
};

export const createProduct = product => async dispatch => {
  const response = await axios.post('https://casacomfort-5d739-default-rtdb.asia-southeast1.firebasedatabase.app/products.json', product);
  dispatch(addProduct({ ...product, id: response.data.name }));
};

export const deleteProductById = id => async dispatch => {
  await axios.delete(`https://casacomfort-5d739-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json`);
  dispatch(removeProduct(id));
};

export const updateProduct = product => async dispatch => {
  await axios.put(`https://casacomfort-5d739-default-rtdb.asia-southeast1.firebasedatabase.app/products/${product.id}.json`, product);
  dispatch(updateProductState(product));
};

export default productSlice.reducer;
