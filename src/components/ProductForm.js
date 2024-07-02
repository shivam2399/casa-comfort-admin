import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../store/productSlice';
import './ProductForm.css';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = { name, category, quantity, description, image };
    dispatch(createProduct(product));
    setName('');
    setCategory('');
    setQuantity(0);
    setDescription('');
    setImage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Choose category</option>
        <option value="tables">Tables</option>
        <option value="chairs">Chairs</option>
        <option value="beds">Beds</option>
        <option value="sofa">Sofa</option>
      </select>
      <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
