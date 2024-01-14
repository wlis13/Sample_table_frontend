import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./register.css";
import MyContext from "../../context/myContext";

function Register() {

  const { allUsers, getAllUser } = useContext(MyContext);

  useEffect(() => {
    getAllUser();
  }, [getAllUser]);

  const history = useHistory();

  const [getRegister, setRegister] = useState(false);
  const [getValuesRegister, setValuesRegister] = useState({
    name: "",
    password: "",
    role: "user"
  })

  const [getMessage, setMessage] = useState();
  const [getMessageExistUser, setMessageExistUser] = useState();

  function desabledButton() {
    const verifyFields = getValuesRegister.name !== "" && getValuesRegister.password !== "";
    if (verifyFields) {
      setRegister(true);
    } else {
      setRegister(false);
    }
  }

  function handleChangeRegister({ target }) {
    const { name, value } = target;
    setValuesRegister(prevState => ({ ...prevState, [name]: value }));
    desabledButton();
  }

  function messageField() {
    if (getRegister === false) {
      setMessage("Todos os campos devem ser preenchidos");
      setTimeout(() => {
        setMessage("")
      }, 2000);
    }
  }

  async function registerUser() {
    const url = "https://table-lalef.vercel.app/insert-user";
    const promise = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getValuesRegister)
    });
    const response = await promise.json();

    const { name } = getValuesRegister;
    const verifyUserExist = allUsers.find((user) => user.name === name);
    if (verifyUserExist) {
      setMessageExistUser("Usuário já existe, faça login:");
      return;
    }
    if (getRegister === true) {
      if (response.ok === true) {
        history.push("/")
      } else {
        setMessage("Não foi possível registrar o usuário");
        setTimeout(() => {
          setMessage("")
        }, 2000);
      }
    } else {
      messageField();
    }
  }

  return (
    <div className="container-main-register">
      <header>
        <h1 id="title-register">Registre-se</h1>
      </header>
      <div className="container-register">
        <label className="labels">
          <input
            name="name"
            onChange={handleChangeRegister}
            type="text"
            placeholder="digite seu nome"
          />
        </label>
        <label className="labels">
          <input
            name="password"
            onChange={handleChangeRegister}
            type="text"
            placeholder="digite sua senha"
          />
        </label>
        <button
          onClick={registerUser}
          type="submit"
        >
          Registrar
        </button>
        <p id="message-register">{getMessage}</p>
        <p
          id="message-exist-user">{getMessageExistUser}
          <Link id="link-exist-user" to="/"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
