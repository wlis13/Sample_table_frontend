import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import MyContext from "../../context/myContext";
import { Link, useHistory } from "react-router-dom";

function Login() {

  const history = useHistory();

  useEffect(() => {
    // Impede que o usuário volte para a página de login após efetuar logout
    history.push("/");
    const unblock = history.block((_location, action) => {
      if (action === "POP" && !isUserAuthenticated()) {
        return false;
      }
    });

    return () => {
      unblock();
    };
  }, [history]);

  function isUserAuthenticated() {

    const tokenUser = JSON.parse(localStorage.getItem("user-lalef"));
    if (tokenUser) {
      return true
    } else {
      return false
    }
  }

  const {
    getValuesLogin,
    setValuesLogin,
  } = useContext(MyContext);

  function handleChange({ target }) {
    const { name, value } = target;
    setValuesLogin(prevState => ({ ...prevState, [name]: value }));
  };

  const [notUser, setNotUser] = useState();

  function notExistUser() {
    setNotUser("Usuário não existe!");
    setTimeout(() => {
      setNotUser("");
    }, 4000);
  }

  function invalidPassword() {
    setNotUser("Password Inválido!");
    setTimeout(() => {
      setNotUser("");
    }, 4000);
  }

  async function fetchLogin() {
    const url = "https://sample-table-backend.vercel.app/login-user";
    const promise = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getValuesLogin),
    });

    const response = await promise.json();
    if (response === "Usuário não existe!") {
      notExistUser();
    } else if (response === "password inválido!") {
      invalidPassword();
    } else {
      const { name, password, role } = response._doc
      const objectStorage = {
        name,
        password,
        role
      }
      localStorage.setItem("user-lalef", JSON.stringify(objectStorage))
      history.push("/main");
    }
  }

  return (
    <div className="container-main-login">
      <header>
        <h1 id="title-login">Login</h1>
      </header>
      <div className="container-login">
        <label className="labels">
          <input
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="digite seu email"
          />
        </label>
        <label className="labels">
          <input
            name="password"
            onChange={handleChange}
            type="text"
            placeholder="digite sua senha"
          />
        </label>
        <button onClick={fetchLogin} type="button">Entrar</button>
        <p id="link_register">Não tem conta? <Link to="/register">Registre-se</Link></p>
        <p id="not_exist_user">{notUser}</p>
      </div>
    </div>
  );
};

export default Login;
