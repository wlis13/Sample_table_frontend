import React, { useContext, useEffect, useState } from "react";
import "./writePageUpDate.css";
import { Link, useHistory } from "react-router-dom";
import Header from "../Header/header";
import MyContext from "../../context/myContext";
import checkPositive from "../wirtePage/images/check-positive.png";
import gold from "../wirtePage/images/gold.png";
import silver from "../wirtePage/images/silver.png";
import bronze from "../wirtePage/images/bronze.png";
import checkPositiveSelectUpdate from "../wirtePage/images/check-positive-select.png";
import listCurrency from "../data/listCurrency";
import backgroundDescription from "../TableClients/backgroundRed";
import timeLimit from "../TableClients/images/time-limit-three.png";

function WritePageUpDate() {

  const history = useHistory();

  const {
    allNameClients,
    getAllClients,
    nameClientClickTable,
  } = useContext(MyContext);

  const [getSelectColor, setSelectColor] = useState("");
  const [getSelectColorForLast, setSelectColorForLast] = useState("");
  const [getValues, setValues] = useState({
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
    updateAt: "",
  });

  const [getMessageFetch, setMessageFetch] = useState("");

  useEffect(() => {
    getAllClients();
  }, [])

  function handleChange({ target }) {
    const { name, value } = target;
    setValues(prevState => ({ ...prevState, [name]: value }))
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
      setClients();
    }
  }

  async function setClients() {
    const dataHours = new Date().toLocaleString().replace(",", "");
    if (getValues.update === "") {
      const getUpdate = allNameClients.find((cli) => cli.client === getValues.client);
      const url = "https://table-lalef.vercel.app/insert/client";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...getValues,
          updateAt: dataHours,
          update: !getUpdate.update ? "" : getUpdate.update,
          color: getUpdate.color,
        }),
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
    } else {
      const url = "https://table-lalef.vercel.app/insert/client";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...getValues, updateAt: dataHours }),
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
  }

  const setColor = (color) => {
    setSelectColor(color);
    setValues({ ...getValues, color: color });
  };

  const setColorForLast = (color, update) => {
    setSelectColorForLast(color);
    setValues({ ...getValues, color: color, update: update });
  };

  function handleClickTableDemand() {
    const getInputClient = document.getElementById("demand-client");
    const getCurrencyInput = document.getElementById("input-pending-text-update");
    const getValuePendingInput = document.getElementById("input-pending-number-update");
    if (nameClientClickTable) {
      getInputClient.value = nameClientClickTable.demand;
      setValues(prevState => ({
        ...prevState,
        demand: nameClientClickTable.demand,
        currency: nameClientClickTable.currency,
        valuePending: nameClientClickTable.valuePending,
      }))
      getCurrencyInput.value = nameClientClickTable.currency;
      getValuePendingInput.value = nameClientClickTable.valuePending;
    } else {
      getInputClient.value = "";
    }
  }

  function handleClickTableName() {
    const getInputClient = document.getElementById("name-client");
    const inspectionField = document.getElementById("inspection-field");
    if (nameClientClickTable) {
      getInputClient.value = nameClientClickTable.client;
      setValues(prevState => ({
        ...prevState,
        client: nameClientClickTable.client,
        inspection: nameClientClickTable.inspection,
        classification: nameClientClickTable.classification
      }));
      if (nameClientClickTable.inspection === true) {
        inspectionField.style.backgroundImage = `url(${checkPositive})`;
        inspectionField.style.backgroundSize = "cover";
      }
    } else {
      getInputClient.value = "";
    }
  }

  useEffect(() => {
    handleClickTableName();
    handleClickTableDemand();
  }, [nameClientClickTable]);

  function alterInspectionUpdate({ target }) {
    const alterValueInspection = !getValues.inspection
    setValues({ ...getValues, inspection: alterValueInspection });
    if (alterValueInspection === true) {
      target.style.backgroundImage = `url(${checkPositive})`;
      target.style.backgroundSize = "cover";
    } else {
      target.style.backgroundImage = "none"
      target.style.backgroundColor = "white";
    }
  }

  function addClassificationUpdate({ target }) {
    console.log("algo")
    const valueClassification = target.getAttribute("data-custom-value");
    setValues(prevState => ({ ...prevState, classification: valueClassification }));
  }

  const [getCountUpdate, setCountUpdate] = useState(1);

  function initValueInput() {
    const input = document.getElementById("input-pending-text-update");
    input.value = listCurrency[0];
  }

  useEffect(() => {
    initValueInput();
  }, [])

  function insertCurrencyInput({ target }) {
    const { value } = target;
    const input = document.getElementById("input-pending-text-update");
    if (value === "up") {
      setCountUpdate(getCountUpdate + 1);
      if (getCountUpdate >= 2) {
        setCountUpdate(0);
      }
    } else {
      setCountUpdate(getCountUpdate - 1);
      if (getCountUpdate <= 0) {
        setCountUpdate(2);
      }
    }
    input.value = listCurrency[getCountUpdate];
    setValues((prevState) => ({ ...prevState, currency: input.value }));
  }

  function colorRedDescription(cli) {
    const getValue = backgroundDescription(cli);
    if (getValue.finalyDate >= 15 && getValue.finalyUpDate >= 15 && cli.updateAt) {
      const objectReturnTrue = {
        color: " #FF5000",
        isLimit: true,
      }
      return objectReturnTrue
    } else {
      const objectReturnFalse = {
        color: cli.color,
        isLimit: false,
      }
      return objectReturnFalse;
    }
  }

  return (
    <div onKeyDown={handleKeyPress}>
      <Header />
      <header className="container-header-write-page">
        <h2>Atualização de Demandas</h2>
        <Link id="view-table" to="/main">visualizar tabela</Link>
      </header>
      <div className="container-body-write">
        <label id="label-statics-values">
          <p>Cliente:</p>
          <input
            id="name-client"
            className="fields-insert"
            onChange={handleChange}
            name="client"
            type="text"
            readOnly
          />
          <p id="paragraph-demand-add">Demanda:</p> <input
            id="demand-client"
            className="fields-insert"
            onChange={handleChange}
            name="demand"
            type="text"
          />
        </label>
        <label htmlFor="test" className="label-classification-update">
          <p>Classificação:</p>
          <div
            style={{
              backgroundImage: `url(${gold})`,
              backgroundSize: "cover",
              backgroundColor: "#7FFFD4"
            }}
            data-custom-value="gold"
            onClick={addClassificationUpdate}
            role="button"
          >
            {getValues.classification === "gold" &&
              <img src={checkPositiveSelectUpdate} alt="imagem positiva" />}
          </div>
          <div
            style={{
              backgroundImage: `url(${silver})`,
              backgroundSize: "cover",
              backgroundColor: "#7FFFD4"
            }}
            data-custom-value="silver"
            onClick={addClassificationUpdate}

          >
            {getValues.classification === "silver" &&
              <img src={checkPositiveSelectUpdate} alt="imagem positiva" />}
          </div>
          <div
            style={{
              backgroundImage: `url(${bronze})`,
              backgroundSize: "cover",
              backgroundColor: "#7FFFD4"
            }}
            data-custom-value="bronze"
            onClick={addClassificationUpdate}
          >
            {getValues.classification === "bronze" &&
              <img src={checkPositiveSelectUpdate} alt="imagem positiva" />}
          </div>
        </label>
        <label>
          <div id="update-field">
            <p>Atualização:</p>
            <div className="colors-area">
              <div onClick={(() => setColor("red"))} className="red"></div>
              <div onClick={(() => setColor("yellow"))} className="yellow"></div>
              <div onClick={(() => setColor("green"))} className="green"></div>
              <div onClick={(() => setColor("white"))} className="white"></div>
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
        {
          allNameClients.map((cli) => (
            cli.client === getValues.client &&
            <label className="container-label-aside">
              <div id="first-div-aside">
                <div className="colors-area-prev">
                  <p>A.Anterior:</p>
                  <div onClick={(() => setColorForLast("red", cli.update))} className="red"></div>
                  <div onClick={(() => setColorForLast("yellow", cli.update))} className="yellow"></div>
                  <div onClick={(() => setColorForLast("green", cli.update))} className="green"></div>
                  <div onClick={(() => setColorForLast("white", cli.update))} className="white"></div>
                </div>
                <textarea
                  readOnly
                  style={{
                    backgroundColor: getSelectColorForLast !== ""
                      ? getSelectColorForLast
                      : cli.color = colorRedDescription(cli).color,
                  }}
                >{cli.update}
                </textarea>
              </div>
              {cli.historic.length > 1 &&
                <div id="second-div-aside">
                  <h3>{cli.historic[cli.historic.length - 2].updateAt
                    ? cli.historic[cli.historic.length - 2].updateAt
                    : `Início-${cli.historic[cli.historic.length - 2].date}`
                  }</h3>
                  <textarea
                    readOnly
                    style={{
                      backgroundColor: cli.historic[cli.historic.length - 2].color,
                    }}
                  >{cli.historic[cli.historic.length - 2].update}
                  </textarea>
                </div>
              }
            </label>
          ))
        }
        <label className="inspection-label-update">
          <p>Alterar Serviço</p>
          <div id="inspection-field" onClick={alterInspectionUpdate}></div>
        </label>
        {showMessage && <h2 className="show-message">{getMessageFetch}</h2>}
        <label htmlFor="nothing" id="input-pending">
          <form id="form-pending-update">
            <p>Pendências</p>
            <aside className="aside-pending-select">
              <button onClick={insertCurrencyInput}
                value="up"
                id="button-up-pending"
                type="button"
              >
                ▲
              </button>
              <input id="input-pending-text-update" type="text" />
              <button
                onClick={insertCurrencyInput}
                value="down"
                id="button-down-pending"
                type="button"
              >
                ▼
              </button>
            </aside>
            <input
              style={{
                color:
                  getValues && getValues.valuePending
                    && getValues.valuePending.trim().charAt(0) === "-" ? "red"
                    : "green",
                fontSize: "13pt"
              }}
              name="valuePending"
              onChange={handleChange}
              id="input-pending-number-update"
              type="number"
              step="0.10"
            />
          </form>
        </label>
        {showMessage && <h2 className="show-message">{getMessageFetch}</h2>}
      </div>
      <button id="send-button" onClick={setClients} type="button">Atualizar</button>
    </div >
  );
}

export default WritePageUpDate;
