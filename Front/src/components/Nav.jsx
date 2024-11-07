import React, { useContext } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import { ContextApp } from '../context/ContextApp';
import { useState } from 'react';
import './Nav.css';

import BuscarCep from './BuscarCep';

const Nav = () => {
  const { state } = useContext(ContextApp);
  const { cart } = state;
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [endereco, setEndereco] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'))


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  const handleLogin = () => {
    navigate('/Login');
    handleClose()
  };

  const handleCart = () => {
    navigate('/Carrinho');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className='nav-container'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="burgerUser">
            <button
              className="btn"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBothOptions"
              aria-controls="offcanvasWithBothOptions"
              onClick={handleShow}
            >
              <span /* className="navbar-toggler-icon" */>&#x1F354;</span>
            </button>
          </div>

          <h2>
            <a onClick={handleHome}>Burger</a>
          </h2>

          <div className="links-nav">
            {/* <a className="link-user" onClick={handleLogin}>
              <i className="bi bi-person-circle"></i>
            </a> */}

            <button className="link-cart" onClick={handleCart}>
              🛒({cart.length})
            </button>
          </div>

          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                {user ? (
                  <p>Olá, {user.username}!</p>
                ) : (
                  <div className='user-login'>
                    <p>Olá! - <a onClick={handleLogin}>Login/Registro</a></p>
                  </div>
                )}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

              <BuscarCep endereco={endereco} setEndereco={setEndereco}/>

              <div className="contact">
                <button>WhatsApp</button>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
