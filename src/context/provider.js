import React, { useState } from "react";
import MyContext from "./myContext";

function Provider({ children }) {
  const listStates = ['Selecione o estado', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const [getValuesLogin, setValuesLogin] = useState({
    name: '',
    password: ''
  });
  const [getDefinedNamesColumns, setDefinedNamesColumns] = useState([]);
  const [getIsCheck, setIsCheck] = useState(true);

  function desabledButton() {
    const { email } = getValuesLogin;
    const regexVerify = /\S+@\S+\.com/;
    if (regexVerify.test(email)) {
      setIsCheck(false);
    } else {
      setIsCheck(true);
    }
  };

  const [nameState, setNameState] = useState("");

  const [getClient, setClient] = useState({});
  const [allNameClients, setAllNameClients] = useState([]);
  const [getClients, setClients] = useState();
  const [nameClientClickTable, setNameClientClickTable] = useState({});

  async function getAllClients() {
    const url = "https://table-lalef.vercel.app"
    const promise = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await promise.json();
    setClients(response);
    setAllNameClients(response);
  };

  async function getOneClient() {
    const url = "https://table-lalef.vercel.app"
    const promise = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await promise.json();
    const getClientOne = response.find((cli) => cli.client === nameState)
    setClient(getClientOne);
  };

  const [allUsers, setAllUsers] = useState([]);
  async function getAllUser() {
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

  const contextValue = {
    listStates,
    desabledButton,
    getIsCheck,
    getValuesLogin,
    setValuesLogin,
    setDefinedNamesColumns,
    getDefinedNamesColumns,
    setNameState,
    nameState,
    getOneClient,
    getClient,
    getAllUser,
    allUsers,
    setAllNameClients,
    allNameClients,
    getAllClients,
    getClients,
    setClients,
    setNameClientClickTable,
    nameClientClickTable,
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  )
};

export default Provider;
