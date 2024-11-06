import React, { createContext, useEffect, useState, useReducer } from 'react';
import api from '../services/api';

async function getProducts(dispatch) {
  try {
    const response = await api.get('/products');
    if (response.data) {
      dispatch({ type: 'SET_PRODUCTS', payload: response.data });
    }
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  }
}

async function login(dispatch, userData) {
  const {username, password} = userData
  try {
    const response = await api.post('/login', {username, password});
    dispatch ({type: 'LOGIN_USER', payload: response})  
    localStorage.setItem('user', JSON.stringify(response.data))
    return true
  } catch (error) {
    console.error('Erro ao efetuar o login:', error.message)
    return false
  }
}

async function register(dispatch, formRegisterData) {
  const {username, password, email} = formRegisterData;
  try {
    const response = await api.post('/register', {username, password, email})
    dispatch({type: 'REGISTER_USER', payload: response})
  } catch (error) {
    console.error("erro ao registrar: ", error)
  }
  
}


const initialState = {
  data: [],
  cart: [],
  users: null,
};

const contextAppReducer = (state, action) => {
  switch (action.type) {

    case 'SET_PRODUCTS':
      return {
        ...state,
        data: action.payload.map((product) => ({
          ...product,
        })),
      };

    case 'ADD_CART':
      const productInCart = state.cart.some(
        (cartItem) => cartItem.id == action.payload.id
      );

      if (productInCart) {
        return state;
      }
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case 'UPDATE_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case 'LOGIN_USER':
      return {
        ...state,
        users: action.payload
      };
    case 'REGISTER_USER':
      return {
        ...state,
        users: action.payload
      }
    default:
      return state;
  }
};

export const ContextApp = createContext();

export const ContextAppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contextAppReducer, initialState);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  return (
    <ContextApp.Provider value={{ state, dispatch, login, register}}>
      {children}
    </ContextApp.Provider>
  );
};
