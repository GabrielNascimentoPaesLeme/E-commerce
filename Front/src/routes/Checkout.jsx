import React, { useContext } from 'react'
import { ContextApp } from '../context/ContextApp'
import { useCartLogic } from '../hooks/useCartLogic';
import CheckItem from '../components/CheckItem';
import './Checkout.css'


const Checkout = () => {
  const {state} = useContext(ContextApp)
  const {cart} = state

  const {quantidade, addItem, removeItem, calculateTotal} = useCartLogic(cart)

  
  return (
    <div className='container-checkout'>
       <div className="check-items">
        {cart.map((item) => (
          <CheckItem
            key={item.id}
            item={item}
            quantidade={quantidade[item.id]}
            onAdd={() => addItem(item.id)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </div>

      <div className="cart-summary summary-check">
        <h1>Total: R$ {calculateTotal().toFixed(2)}</h1>
        <button 
          className="checkout-btn"
        >
          Enviar Pedido
        </button>
      </div>
    </div>
  )
}

export default Checkout