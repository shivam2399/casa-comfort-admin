import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../store/productSlice';
import './ProductForm.css';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = { name, price, category, description, image };
    dispatch(createProduct(product));
    setName('');
    setPrice(0)
    setCategory('');
    setDescription('');
    setImage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Choose category</option>
        <option value="grocery">Grocery</option>
        <option value="electronics">Electronics</option>
        <option value="wellness">Wellness</option>
        <option value="snacks">Snacks</option>
      </select>
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
