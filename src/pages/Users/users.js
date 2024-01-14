import React, { useEffect, useState } from "react";
import Header from "../Header/header";
import "./users.css";

function Users() {

  const [getAllUsers, setAllUsers] = useState([]);

  async function fetchUsers() {
    const url = "https://table-lalef.vercel.app/all-users";
    const promise = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await promise.json();
    setAllUsers(response);
  }

  async function fetchDeleteUser(id) {
    const url = `https://table-lalef.vercel.app/delete-one-user/${id}`;
    const promise = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchUsers();
    if (promise.ok === true) {
      alert("Usuário foi removido.")
    } else {
      alert("Não foi possível remover o usuário, algum problema com servidor!")
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  function deleteUser(userId) {
    const getConfirm = window.confirm("Deseja continuar?");
    if (getConfirm === true) {
      fetchDeleteUser(userId);
    }
  }

  return (
    <div>
      <Header />
      <h2 id="title-users">Usuários existentes</h2>
      <div>
        <ul className="container-link-delete-user">
          {
            getAllUsers && getAllUsers.map((user) => (
              <li key={user.name}>{(`${user.name}   ${user.role}`)}
                <button onClick={(() => deleteUser(user._id))}>Apagar</button></li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default Users;
