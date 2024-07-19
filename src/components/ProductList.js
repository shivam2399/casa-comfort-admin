import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProductById, updateProduct } from '../store/productSlice';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [editingProduct, setEditingProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setDescription(product.description);
    setImage(product.image);
  };

  const handleDelete = (id) => {
    dispatch(deleteProductById(id));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedProduct = { ...editingProduct, name,price, category, description, image };
    dispatch(updateProduct(updatedProduct));
    setEditingProduct(null);
  };

  const filteredProducts = filterCategory
    ? products.filter((product) => product.category === filterCategory)
    : products;

  return (
    <div className="product-list">
      <h3>Product List</h3>

      <div className="filter-section">
        <label htmlFor="filterCategory">Filter by Category: </label>
        <select
          id="filterCategory"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="grocery">Grocery</option>
          <option value="electronics">Electronics</option>
          <option value="wellness">Wellness</option>
          <option value="snacks">Snacks</option>
        </select>
      </div>

      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} />
            <div>
              <h4>{product.name}</h4>
              <p>₹{product.price}</p>
              <p>{product.description}</p>
              <p>Category: {product.category}</p>
              <button onClick={() => handleEdit(product)}>Edit</button>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {editingProduct && (
        <div className="product-form">
          <h3>Edit Product</h3>
          <form onSubmit={handleUpdate}>
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
            <button type="submit">Update Product</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductList;
