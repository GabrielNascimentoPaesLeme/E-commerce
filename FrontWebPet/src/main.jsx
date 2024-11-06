import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { ContextAppProvider } from './context/ContextApp.jsx';
import './index.css';
import App from './App.jsx';

/* Bootstrap */
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

/* Rotas */
import Home from './routes/Home.jsx';
import Carrinho from './routes/Carrinho.jsx';
import Login from './routes/Login.jsx';
import Registro from './routes/Registro.jsx';
import Checkout from './routes/Checkout.jsx';
import Produto from './routes/Produto.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/Produto',
        element: <Produto />,
      },
      {
        path: '/Checkout',
        element: <Checkout />,
      },
      {
        path: '/Carrinho',
        element: <Carrinho />,
      },
      {
        path: '/Login',
        element: <Login />,
      },
      {
        path: '/Registro',
        element: <Registro />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextAppProvider>
      <RouterProvider router={router} />
    </ContextAppProvider>
  </StrictMode>
);
