import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextApp } from '../context/ContextApp';
import { useCartLogic } from '../hooks/useCartLogic';
import CartItem from '../components/CartItem';
import EmptyCart from '../components/EmptyCart';
import './Carrinho.css';

const Carrinho = () => {
  const navigate = useNavigate();
  const { state } = useContext(ContextApp);
  const { cart } = state;

  const {
    quantidade,
    price,
    addItem,
    removeItem,
    calculateTotal,
  } = useCartLogic(cart);

  if (cart.length < 1) {
    return <EmptyCart onNavigateHome={() => navigate('/')} />;
  }

  return (
    <div className="cart-container">
      <div className="cart-items">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            quantidade={quantidade[item.id]}
            onAdd={() => addItem(item.id)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </div>

      <div className="cart-summary">
        <h1>Total: R$ {calculateTotal().toFixed(2)}</h1>
        <button 
          className="checkout-btn"
          onClick={() => {/* Implementar finalização */}}
        >
          Finalizar
        </button>
      </div>
    </div>
  );
};

export default Carrinho;