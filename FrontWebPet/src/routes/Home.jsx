import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import './home.css';
import { useNavigate } from 'react-router-dom';
import { ContextApp } from '../context/ContextApp';

const Home = () => {
  const { state, dispatch} = useContext(ContextApp);
  const products = state.data;

  const addToCart = (index) => {
    dispatch({type: 'ADD_CART', payload: products[index]})
  }
  const navigate = useNavigate();
  return (
    <div className="container-home">
      {products.map((product, index) => (
        <div className="container-card" key={index}>
          {/* <Card >
            <Card.Img variant="top" src="#" />
          </Card> */}
          <Card.Body>
            <div className="card-text">
              <h6>{product.name}</h6>
              <p>{product.description}</p>
            </div>
            <div className="linksCard">
              <p>R$ {product.price.toFixed(2)}</p>
              <Card.Link onClick={() => addToCart(index)}>
              <i className="bi bi-plus-circle-fill"></i>
              </Card.Link>
            </div>
          </Card.Body>
        </div>
      ))}
    </div>
  );
};

export default Home;
