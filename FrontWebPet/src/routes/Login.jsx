import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContextApp } from "../context/ContextApp";
import "./Login.css";

const login = () => {
  const {login, dispatch, state} = useContext(ContextApp)

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/Registro");
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const loginSuccess = await login(dispatch, userData);

    if (loginSuccess) {
      navigate("/");
    } else {
      /* Manda para registro */
      navigate("/Registro");
    }


  }


  return (
    <div className="container-login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            required
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Senha
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </div>
        <div className="buttons">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <p>
            Não tem uma conta?!{" "}
            <span onClick={handleRegister}>Resgistre-se</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default login;
