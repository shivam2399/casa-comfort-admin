import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProductById, updateProduct } from '../store/productSlice';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [editingProduct, setEditingProduct] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setCategory(product.category);
    setQuantity(product.quantity);
    setDescription(product.description);
    setImage(product.image);
  };

  const handleDelete = (id) => {
    dispatch(deleteProductById(id));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedProduct = { ...editingProduct, name, category, quantity, description, image };
    dispatch(updateProduct(updatedProduct));
    setEditingProduct(null);
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} />
            <div>
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>Category: {product.category}</p>
              <p>Quantity: {product.quantity}</p>
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
            <button type="submit">Update Product</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductList;
