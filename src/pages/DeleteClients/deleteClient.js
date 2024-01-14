import React, { useContext, useEffect } from "react";
import MyContext from "../../context/myContext";
import "./deleteClient.css";
import Header from "../Header/header";

function DeleteClient() {
  const { getClients, getAllClients } = useContext(MyContext);

  useEffect(() => {
    getAllClients();
  }, [])

  async function deleteClient(name) {
    const url = "https://table-lalef.vercel.app/delete/one-client";
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      });

      if (response.ok) {
        alert(`Cliente com nome ${name} foi deletado com sucesso!`);
      } else {
        alert("Não foi possível deletar cliente");
      }
      getAllClients();
    } catch (error) {
      console.error("Erro na solicitação:", error);
      alert("Ocorreu um erro na solicitação.");
    }
  }

  function handleClickDelete(name) {
    const responseUser = window.confirm("Você tem certeza Lalefoso?");
    if (responseUser === true) {
      deleteClient(name);
    }
  }

  return (
    <div className="container-delete-client">
      <Header />
      {getClients &&
        getClients.map((cli) => (
          <ul className="container-list-delete">
            <li key={cli.client}>
              {cli.client}
              <button type="button" onClick={() => handleClickDelete(cli.client)}>
                Deletar
              </button>
            </li>
          </ul>
        ))}
    </div>
  );
}

export default DeleteClient;

