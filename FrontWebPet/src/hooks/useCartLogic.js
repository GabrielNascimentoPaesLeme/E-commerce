import { useState, useEffect, useContext } from 'react';
import { ContextApp } from '../context/ContextApp';

const STORAGE_KEY = 'quantidade';

export const useCartLogic = (cart) => {
  const {dispatch} = useContext(ContextApp)
  const [quantidade, setQuantidade] = useState({});
  const [price, setPrice] = useState({});

  // Carrega quantidades do localStorage e inicializa
  useEffect(() => {
    const loadQuantidades = () => {
      const storedQuantidades = localStorage.getItem(STORAGE_KEY);
      if (storedQuantidades && storedQuantidades.length >= 1) {
        return JSON.parse(storedQuantidades);
      }
      
      const initialQuantidades = {};
      cart.forEach((item) => {
        initialQuantidades[item.id] = 1;
      });
      return initialQuantidades;
    };

    setQuantidade(loadQuantidades());
  }, [cart]);

  // Atualiza localStorage e calcula preços
  useEffect(() => {
    if (Object.keys(quantidade).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quantidade));
      
      const priceItem = {};
      cart.forEach((item) => {
        priceItem[`priceItemId${item.id}`] = item.price * quantidade[item.id];
      });
      setPrice(priceItem);
      console.log(quantidade)
    }
  }, [quantidade, cart]);

  const addItem = (id) => {
    setQuantidade((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const removeItem = (id) => {
    if(quantidade[id] === 1){
      dispatch({ type: 'UPDATE_CART', payload: id });
    }
    setQuantidade((prev) => {
      if (prev[id] > 0) {
        return {
          ...prev,
          [id]: prev[id] - 1,
        };
      }
      return prev;
    });

    
  };

  const calculateTotal = () => {
    return Object.values(price).reduce((acc, curr) => acc + curr, 0);
  };

  return {
    quantidade,
    price,
    addItem,
    removeItem,
    calculateTotal,
  };
};