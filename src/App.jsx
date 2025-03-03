import './App.css';
import ProductState from './context/Products/ProductState';
import { RouterProvider } from 'react-router-dom';
import { Router } from './Router.jsx';
import UserState from './context/Users/UserState.jsx';

function App() {
  return (
    <UserState>
      <ProductState>
        <RouterProvider router={Router} />
      </ProductState>
    </UserState>
  );
}

export default App;
