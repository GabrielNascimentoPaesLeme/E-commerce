import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextApp } from '../context/ContextApp';

import './Register.css';

const Registro = () => {
  const emailRegex = /\S+@\S+\.\S+/;
  const {register, dispatch} = useContext(ContextApp)

  const navigate = useNavigate();

  const [formRegisterData, setFormRegisterData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    setFormRegisterData({
      ...formRegisterData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do registro:", formRegisterData);
    const validEmail = emailRegex.test(formRegisterData.email);
    console.log(formRegisterData.email);
    console.log(validEmail);
    if (validEmail) {
      register(dispatch, formRegisterData);
      navigate("/Login");
    }
  };

  return (
    <div className="container-register mt-5">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Registro;
