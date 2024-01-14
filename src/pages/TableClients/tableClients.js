import React, { useContext, useEffect, useState } from 'react';
import "./tableClients.css";
import MyContext from '../../context/myContext';
import Header from '../Header/header';
import { Link, useHistory } from 'react-router-dom';
import loadImage from "../images/oie_2920114UJU45VZf.gif";
import gold from "../wirtePage/images/gold.png";
import silver from "../wirtePage/images/silver.png";
import bronze from "../wirtePage/images/bronze.png";
import backgroundDescription from './backgroundRed';

function TableClients() {
  const {
    setNameState,
    getClients,
    getAllClients,
    setNameClientClickTable,
  } = useContext(MyContext);
  const LoadClient = getClients || [];

  const [getNameInput, setNameInput] = useState("");
  const [filteredClients, setFilteredClients] = useState([{}]);
  const [filteredWithColor, setFilteredWithColor] = useState([{}]);
  const [getValueColors, setValueColors] = useState("")
  const [activeList, setActiveList] = useState('main');

  const history = useHistory();

  useEffect(() => {
    getAllClients();
  }, []);

  useEffect(() => {
    filteredValuesTable();
  }, [getNameInput]);

  function getNameClient({ target }) {
    const { value } = target;
    setNameState(value);
    history.push("/historic-page");
  }

  function viewAllHistorics() {
    history.push("/all-historics");
  }

  function filteredValuesTable() {
    const getFilteredValues = LoadClient.filter((cli) => cli.client !== undefined &&
      cli.client.toLowerCase().includes(getNameInput.toLowerCase()));
    setFilteredClients(getFilteredValues);
  }

  function valuesFilteredColors() {
    const colorFiltered = LoadClient.filter((cli) => cli.color === getValueColors);
    setFilteredWithColor(colorFiltered);
  }

  useEffect(() => {
    valuesFilteredColors();
  }, [getValueColors]);

  function filteredByColors(event) {
    const value = event.target.dataset.customValue;
    setValueColors(value);
    valuesFilteredColors();
    setActiveList('colorFilter');
  }


  function handleChangeInput({ target }) {
    const { value } = target;
    setNameInput(value);
    filteredValuesTable();
    setActiveList('nameFilter');
  }

  function activeMain() {
    setActiveList('main');
  }

  function clikedNameTable(value) {
    setNameClientClickTable(value);
    history.push("/table-clients-update")
  }

  function clikedNameTablenewDemand() {
    history.push("/table-clients")
  }

  function verifyUserAndShowLink() {
    const getUserInfo = JSON.parse(localStorage.getItem("user-lalef"));
    if (getUserInfo.role === "admin") {
      return (
        <Link id="link-delete-client" to="/delete-client">Deletar cliente</Link>
      )
    }
  }

  function selectClassification(cli) {
    if (cli === "gold") {
      return gold;
    } else if (cli === "silver") {
      return silver;
    } else {
      return bronze;
    }
  }

  const listFilters = [
    LoadClient,
    filteredClients,
    filteredWithColor
  ];

  listFilters.forEach((list) => {
    list.sort((a, b) => {
      const dateAD = 'updateAt' in a ? new Date(`
        ${a.updateAt.slice(3, 5)}/
        ${a.updateAt.slice(0, 2)}/
        ${a.updateAt.slice(6, 10)}`) : new Date(`
        ${a.date.slice(3, 5)}/
        ${a.date.slice(0, 2)}/
        ${a.date.slice(6, 10)}`);

      const dateBD = 'updateAt' in b ? new Date(`
        ${b.updateAt.slice(3, 5)}/
        ${b.updateAt.slice(0, 2)}/
        ${b.updateAt.slice(6, 10)}`) : new Date(`
        ${b.date.slice(3, 5)}/
        ${b.date.slice(0, 2)}/
        ${b.date.slice(6, 10)}`);

      return dateBD - dateAD;
    });
  });

  function backgroundRed(cli) {
    const getResults = backgroundDescription(cli);
    if (getResults.finalyUpDate >= 15 && getResults.finalyDate >= 15 && cli.updateAt) {
      cli.color = "red";
      return (
        <td
          className='update-field'
          style={{
            backgroundColor: '#FF5000',
          }}>
          {cli.update}
        </td>
      );
    } else {
      return (
        <td className='update-field' style={{ backgroundColor: cli.color }}>
          {cli.update}
        </td>
      );
    }
  }


  function filteredAllValues() {
    if (activeList === 'main') {
      return (
        LoadClient.map((cli, index) => (
          cli.color !== "white" && <tbody
            key={cli._id}
          >
            <td style={{
              backgroundColor:
                cli.inspection === true ? "white" : cli.valuePending ? "#ADD8E6" : ""
            }}
              className='id-field-table'>{index + 1}</td>
            <td style={{
              backgroundColor:
                cli.inspection === true ? "white" : cli.valuePending ? "#ADD8E6" : ""
            }}
              className='demand-field'>{cli.demand}</td>
            <td
              className={
                `line-table-name ${cli.inspection ? "white-bg" : cli.valuePending ? "blue-bg" : ""} `
              }
            >
              <div
                className='div-click-table'
                onClick={(() =>
                  clikedNameTable(cli))}
              >
                {cli.client}
              </div>
            </td>
            <td
              style={{
                backgroundImage: cli.classification
                  ? `url(${selectClassification(cli.classification)
                  })`
                  : "",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                width: "100px",
                height: "100px",
                backgroundPosition: "center",
                backgroundColor: cli.inspection === true
                  ? "white"
                  : cli.valuePending
                    ? "#ADD8E6"
                    : "",
              }}
              className="classification-field"
            ></td>
            <td style={{
              textAlign: "center", backgroundColor:
                cli.inspection === true ? "white" : cli.valuePending ? "#ADD8E6" : ""
            }}
            >{cli.updateAt}</td>
            <td style={{
              backgroundColor:
                cli.inspection === true ? "white" : cli.valuePending ? "#ADD8E6" : "", textAlign: "center"
            }}
            >{cli.date}</td>
            {
              backgroundRed(cli)
            }
            < td style={{
              backgroundColor:
                cli.inspection === true ? "white" : cli.valuePending ? "#ADD8E6" : ""
            }}>
              <button
                onClick={getNameClient}
                value={cli.client}
                type='button'
              >
                Histórico
              </button>
            </td >
            <td style={{
              backgroundColor:
                cli.inspection === true && !cli.valuePending
                  ? "white" : cli.valuePending ? "#ADD8E6" : "",
              color: cli.valuePending && cli.valuePending[0] === "-" ? "red"
                : cli.valuePending && cli.valuePending[0] !== "-" ? "green" : ""
            }}>{cli.currency && cli.valuePending ? `${cli.currency} ${cli.valuePending} ` : "Nulo"}</td>
          </tbody >
        ))
      )
    } else if (activeList === 'nameFilter') {
      return (
        filteredClients.map((cli, index) => (
          cli.color !== "white" && <tbody key={cli._id}>
            <td style={{
              backgroundColor:
                cli.inspection === true ? "white" : cli.valuePending ? "#ADD8E6" : ""
            }}
              className='id-field-table'>{index + 1}</td>
            <td style={{
              backgroundColor:
                cli.inspection === true ? "white" : cli.valuePending ? "#ADD8E6" : ""
            }}
              className='demand-field'>{cli.demand}</td>
            <td
              className={`line-table-name ${cli.inspection ? "white-bg" : cli.valuePending ? "blue-bg" : ""} `}
            >
              <div
                className='div-click-table'
                onClick={(() =>
                  clikedNameTable(cli))}
              >
                {cli.client}
              </div>
            </td>
            <td
              style={{
                backgroundImage: cli.classification
                  ? `url(${selectClassification(cli.classification)
                  })`
                  : "",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                width: "100px",
                height: "100px",
                backgroundPosition: "center",
                backgroundColor: cli.inspection === true
                  ? "white"
                  : cli.valuePending
                    ? "#ADD8E6"
                    : "",
              }}
              className="classification-field"
            ></td>
            <td style={{
              textAlign: "center", backgroundColor:
                cli.inspection === true ? "white" : cli.valuePending ? "#ADD8E6" : ""
            }}
            >{cli.updateAt}</td>
            <td style={{
              backgroundColor:
                cli.inspection === true ? "white" : cli.valuePending ? "#ADD8E6" : "", textAlign: "center"
            }}
            >{cli.date}</td>
            {
              backgroundRed(cli)
            }
            <td style={{
              backgroundColor:
                cli.inspection === true ? "white" : cli.valuePending ? "#ADD8E6" : ""
            }}>
              <button
                onClick={getNameClient}
                value={cli.client}
                type='button'
              >
                Histórico
              </button>
            </td>
            <td style={{
              backgroundColor:
                cli.inspection === true && !cli.valuePending ? "white" : cli.valuePending ? "#ADD8E6" : "",
              color: cli.valuePending && cli.valuePending[0] === "-" ? "red"
                : cli.valuePending && cli.valuePending[0] !== "-" ? "green" : ""
            }}>{cli.currency && cli.valuePending ? `${cli.currency} ${cli.valuePending} ` : "Nulo"}</td>
          </tbody>
        ))
      )
    } else if (activeList === 'colorFilter') {
      return (
        filteredWithColor.map((cli, index) => (
          cli.color !== "white" && <tbody key={cli._id}>
            <td style={{
              backgroundColor:
                cli.inspection === true ? "white" : cli.valuePending ? "#ADD8E6" : ""
            }}
              className='id-field-table'>{index + 1}</td>
            <td style={{
              backgroundColor:
                cli.inspection === true ? "white" : cli.valuePending ? "#ADD8E6" : ""
            }}
              className='demand-field'>{cli.demand}</td>
            <td
              className={`line-table-name ${cli.inspection ? "white-bg" : cli.valuePending ? "blue-bg" : ""} `}
            >
              <div
                className='div-click-table'
                onClick={(() =>
                  clikedNameTable(cli))}
              >
                {cli.client}
              </div>
            </td>
            <td
              style={{
                backgroundImage: cli.classification
                  ? `url(${selectClassification(cli.classification)})`
                  : "",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                width: "100px",
                height: "100px",
                backgroundPosition: "center",
                backgroundColor: cli.inspection === true
                  ? "white"
                  : cli.valuePending
                    ? "#ADD8E6"
                    : "",
              }}
              className="classification-field"
            ></td>
            <td style={{
              textAlign: "center", backgroundColor:
                cli.inspection === true ? "white" : cli.valuePending ? "#ADD8E6" : ""
            }}
            >{cli.updateAt}</td>
            <td style={{
              backgroundColor:
                cli.inspection === true ? "white" : cli.valuePending ? "#ADD8E6" : "", textAlign: "center"
            }}
            >{cli.date}</td>
            {
              backgroundRed(cli)
            }
            <td style={{
              backgroundColor:
                cli.inspection === true ? "white" : cli.valuePending ? "#ADD8E6" : ""
            }}>
              <button
                onClick={getNameClient}
                value={cli.client}
                type='button'
              >
                Histórico
              </button>
            </td>
            <td style={{
              backgroundColor:
                cli.inspection === true && !cli.valuePending ? "white" : cli.valuePending ? "#ADD8E6" : "",
              color: cli.valuePending && cli.valuePending[0] === "-" ? "red"
                : cli.valuePending && cli.valuePending[0] !== "-" ? "green" : ""
            }}>{cli.currency && cli.valuePending ? `${cli.currency} ${cli.valuePending} ` : "Nulo"}</td>
          </tbody>
        ))
      )
    }
  }

  return (
    <div className='container-all-clients'>
      <Header />
      <div className='fields-filter-table'>
        <input onChange={handleChangeInput}
          id='input-filter-name-table'
          type='text'
          placeholder='filtrar por nome'
        />
        <div id='line-division-fields'></div>
        <div className='filter-by-color-table'>
          <div onClick={filteredByColors} data-custom-value="red" id='red-div'></div>
          <div onClick={filteredByColors} data-custom-value="yellow" id='yellow-div'></div>
          <div onClick={filteredByColors} data-custom-value="green" id='green-div'></div>
        </div>
        <div id='line-division-fields'></div>
        <button id='button-filter-main' onClick={activeMain}>Todos</button>
        <button
          id='new-demand-button'
          onClick={clikedNameTablenewDemand}
          type='button'
        >
          Nova Demanda
        </button>
        <a
          id='link-to-links-page'
          href='https://manager-links-lalef-front-end.vercel.app'
          target='_blank' rel="noopener noreferrer"
        >
          Acessar Quadro de links
        </a>
        <a
          id='link-for-calendly'
          href='https://calendly.com/grupozmfasia/reuniao?month=2023-08'
          target='_blank' rel="noopener noreferrer"
        >
          Marcar Reunião
        </a>
      </div>
      <table className='container-table'>
        <thead>
          <th>Código Id</th>
          <th>Demanda</th>
          <th>Cliente</th>
          <th>Classificação</th>
          <th>Data de Atualização</th>
          <th>Data de Início</th>
          <th>Atualização</th>
          <th>Históricos</th>
          <th><button
            onClick={viewAllHistorics}
            id='button-all-historics'
            type='button'
          >
            Todos os Históricos
          </button>
          </th>
        </thead>
        {getClients ? filteredAllValues() : <img
          id='load-image'
          src={loadImage}
          alt='imagem de carregamento'
        />}
      </table>
      {verifyUserAndShowLink()}
    </div >
  );
};

export default TableClients;
