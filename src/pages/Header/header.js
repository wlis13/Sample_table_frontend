import React, { useContext, useEffect } from "react";
import "./header.css";
import { Link, useHistory } from "react-router-dom";
import prevImage from "./images/return-image.png";
import MyContext from "../../context/myContext";

function Header() {

  const { getAllUser } = useContext(MyContext);

  const infoUser = JSON.parse(localStorage.getItem("user-lalef"));

  useEffect(() => {
    getAllUser();
  }, []);

  const history = useHistory();

  function handleGoBack() {
    history.goBack();
  }

  function messageUser() {
    if (!infoUser || !infoUser.name) {
      return <p>não encontrado</p>;
    }

    const hour = new Date().toLocaleTimeString();
    if (hour >= "05:00:00" && hour <= "11:59:59") {
      return <p>{`Bom dia, ${infoUser.name}`}</p>;
    } else if (hour >= "12:00:00" && hour <= "18:59:59") {
      return <p>{`Boa tarde, ${infoUser.name}`}</p>;
    } else {
      return <p>{`Boa noite, ${infoUser.name}`}</p>;
    }
  }

  function unload() {
    history.push("/");
    localStorage.removeItem("user-lalef");
  }

  function verifyUserAndShowLink() {
    const getUserInfo = JSON.parse(localStorage.getItem("user-lalef"));
    if (getUserInfo.role !== null) {
      return (
        <div id="between-links">
          <Link className="link-header-main" to="/register">Registro</Link>
          <Link className="link-header-main" to="/users">Usuários</Link>
        </div>
      )
    }
  }

  return (
    <header className="container-header">
      <img onClick={handleGoBack} id="image-return" src={prevImage} alt="voltar a página" />
      <img
        id="image-logo"
        src="https://lalef.com.br/wp-content/webp-express/webp-images/uploads/2022/11/Logo-LALEF-Solucoes-que-importam-e1676401117566.jpg.webp"
        alt="logo lalef"
      />
      <h1 id="title-funil">Funil</h1>
      <div className="container-header-links">
        <Link className="link-header-main" to="/table-clients">Nova Demanda</Link>
        <Link className="link-header-main" to="/main">Tabela</Link>
        <Link className="link-header-main link-login" to="/">login</Link>
        {verifyUserAndShowLink()}
      </div>
      {messageUser()}
      <button onClick={unload} type="button">Sair</button>
    </header>
  );
}

export default Header;
