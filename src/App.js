import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import OrderList from './components/OrderList';

const router = createBrowserRouter([
  {path: '/', element: <Auth />},
  {path: '/dashboard', element: <Dashboard />},
  {path: '/addproduct', element: <ProductForm />},
  {path: '/products', element: <ProductList />},
  {path: '/orders', element: <OrderList />},
])


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
