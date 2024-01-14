import React, { useContext, useEffect, useState } from "react";
import "./writePage.css";
import { Link, useHistory } from "react-router-dom";
import Header from "../Header/header";
import MyContext from "../../context/myContext";
import listDemands from "./listDemands";
import checkPositive from "./images/check-positive.png";
import gold from "./images/gold.png";
import silver from "./images/silver.png";
import bronze from "./images/bronze.png";
import checkPositiveSelect from "./images/check-positive-select.png";
import listCurrency from "../data/listCurrency";

function WritePage() {

  const history = useHistory();

  const { allNameClients, getAllClients, nameClientClickTable } = useContext(MyContext);

  const [getSelectColor, setSelectColor] = useState("");
  const [getValuesAdd, setValuesAdd] = useState({
    demand: "",
    allDemands: [],
    client: "",
    classification: "",
    update: "",
    historic: [],
    color: "",
    date: "",
    currency: "",
    valuePending: "",
    inspection: false,
  });

  const [getMessageFetch, setMessageFetch] = useState("");
  const [getNamesOption, setNamesOptions] = useState("");

  useEffect(() => {
    getAllClients();
  }, [])

  function handleChange({ target }) {
    const { name, value } = target;
    setValuesAdd(prevState => ({ ...prevState, [name]: value }));
  };

  function clearFields() {
    const fields = document.querySelectorAll(".fields-insert");
    fields.forEach((field) => {
      field.value = "";
    });
  }

  const [showMessage, setShowMessage] = useState(false);

  function displayMessage() {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      setCNewClients();
    }
  }

  async function setCNewClients() {
    const date = new Date().toLocaleDateString();
    if (getValuesAdd.client === "" || getValuesAdd.demand === "") {
      alert("Por favor preencha o nome do Cliente e a Demanda.");
      return;
    }
    const url = "https://table-lalef.vercel.app/insert/client";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...getValuesAdd, date }),
    });
    clearFields();

    if (response.ok === true) {
      setMessageFetch("Cliente adicionado com sucesso!");
      displayMessage();
      history.push("/main")
    } else {
      setMessageFetch("Não foi possível adicionar o cliente, provavelmente algum erro no servidor");
      displayMessage();
    }
    getAllClients();
  }

  const setColor = (color) => {
    setSelectColor(color);
    setValuesAdd({ ...getValuesAdd, color: color });
  };

  function alterInspection({ target }) {
    const alterValueInspection = !getValuesAdd.inspection
    setValuesAdd({ ...getValuesAdd, inspection: alterValueInspection });
    if (alterValueInspection === true) {
      target.style.backgroundImage = `url(${checkPositive})`;
      target.style.backgroundSize = "cover";
    } else {
      target.style.backgroundImage = "none"
      target.style.backgroundColor = "white";
    }
  }

  function handleChangeOptions({ target }) {
    const { value } = target;
    setNamesOptions(value)
  };

  function handleClickFilter() {
    const clientFiltered = allNameClients.find((cli) => cli.client === getNamesOption);
    const getInputClient = document.getElementById("name-client");
    if (clientFiltered) {
      getInputClient.value = clientFiltered.client;
      setValuesAdd(prevState => ({ ...prevState, client: clientFiltered.client }))
    } else {
      getInputClient.value = "";
    }
  }

  function handleClickTableName() {
    const clientFiltered = allNameClients.find((cli) => cli.client === nameClientClickTable);
    const getInputClient = document.getElementById("name-client");
    if (clientFiltered) {
      getInputClient.value = clientFiltered.client;
      setValuesAdd(prevState => ({ ...prevState, client: clientFiltered.client }))
    } else {
      getInputClient.value = "";
    }
  }

  useEffect(() => {
    handleClickTableName();
  }, [nameClientClickTable]);

  function addClassification({ target }) {
    const valueClassification = target.getAttribute("data-custom-value");
    setValuesAdd(prevState => ({ ...prevState, classification: valueClassification }));
  }

  const [getCount, setCount] = useState(0);
  function insertCurrencyInput({ target }) {
    const { value } = target;
    const input = document.getElementById("input-pending-text");
    if (value === "up") {
      setCount(getCount + 1);
      if (getCount >= 2) {
        setCount(0);
      }
    } else {
      setCount(getCount - 1);
      if (getCount <= 0) {
        setCount(2);
      }
    }
    input.value = listCurrency[getCount];
    setValuesAdd((prevState) => ({ ...prevState, currency: input.value }));
  }

  return (
    <div onKeyDown={handleKeyPress}>
      <Header />
      <header className="container-header-write-page">
        <h2>Adicionar Nova Demanda</h2>
        <Link id="view-table" to="/main">visualizar tabela</Link>
      </header>
      <div className="container-body-write">
        <label htmlFor="demand-client">
          <p>Demanda:</p> <input
            id="demand-client"
            className="fields-insert"
            onChange={handleChange}
            name="demand"
            type="text"
            list="demand-list"
          />
          <datalist
            id="demand-list"
          >
            {
              listDemands.map((list) => (
                <option key={list}>{list}</option>
              ))
            }
          </datalist>
        </label>
        <label htmlFor="name-client">
          <p>Cliente:</p>
          <input
            id="name-client"
            className="fields-insert"
            onChange={handleChange}
            name="client"
            type="text"
            list="client-list"
          />
          <datalist
            id="client-list"
            className="select-name-write-page "
            onChange={handleChangeOptions}
            onClick={handleClickFilter}
          >
            {allNameClients && allNameClients.sort().map((cli) => (
              <option key={cli._id} value={cli.client}>
                {cli.client}
              </option>
            ))}
          </datalist>
        </label>
        <label htmlFor="second-nothig" className="label-classification">
          <p>Classificação:</p>
          <div
            style={{
              backgroundImage: `url(${gold})`,
              backgroundSize: "cover",
              backgroundColor: "#7FFFD4"
            }}
            data-custom-value="gold"
            onClick={addClassification}
          >
            {getValuesAdd.classification === "gold" &&
              <img src={checkPositiveSelect} alt="imagem positiva" />}
          </div>
          <div
            style={{
              backgroundImage: `url(${silver})`,
              backgroundSize: "cover",
              backgroundColor: "#7FFFD4"
            }}
            data-custom-value="silver"
            onClick={addClassification}
          >
            {getValuesAdd.classification === "silver" &&
              <img src={checkPositiveSelect} alt="imagem positiva" />}
          </div>
          <div
            style={{
              backgroundImage: `url(${bronze})`,
              backgroundSize: "cover",
              backgroundColor: "#7FFFD4"
            }}
            data-custom-value="bronze"
            onClick={addClassification}
          >
            {getValuesAdd.classification === "bronze" &&
              <img src={checkPositiveSelect} alt="imagem positiva" />}
          </div>
        </label>
        <label>
          <div id="update-field">
            <p>Atualização:</p>
            <div className="colors-area">
              <div
                onClick={(() => setColor("red"))}
                className="red"
              >
              </div>
              <div
                onClick={(() => setColor("yellow"))}
                className="yellow"
              >
              </div>
              <div
                onClick={(() => setColor("green"))}
                className="green"
              >
              </div>
            </div>
          </div>
          <textarea
            className="fields-insert"
            onChange={handleChange}
            name="update"
            cor="color"
            style={{ backgroundColor: getSelectColor }}
          ></textarea>
        </label>
        <label htmlFor="inputId" className="inspection-label">
          <aside>
            <p>Serviço de Inspeção?</p>
            <div onClick={alterInspection}></div>
          </aside>
          <form id="form-pending">
            <aside className="aside-pendig-select">
              <button onClick={insertCurrencyInput}
                value="up" id="button-up-pendig"
                type="button"
              >
                ▲
              </button>
              <input id="input-pending-text" type="text" />
              <button
                onClick={insertCurrencyInput}
                value="down"
                id="button-down-pending"
                type="button"
              >
                ▼
              </button>
            </aside>
            <h3>Pendências</h3>
            <input
              style={{
                color: getValuesAdd.valuePending.trim().charAt(0) === "-" ? "red"
                  : "green",
                fontSize: "13pt"
              }}
              name="valuePending"
              onChange={handleChange}
              id="input-pending-number"
              type="number"
              step="0.10"
            />
          </form>
        </label>
        {showMessage && <h2 className="show-message">{getMessageFetch}</h2>}
      </div>
      <button id="add-button" onClick={setCNewClients} type="button">Adicionar</button>
    </div>
  );
}

export default WritePage;
