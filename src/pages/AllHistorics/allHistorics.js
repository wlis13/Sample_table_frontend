import React, { useContext, useEffect, useState } from "react";
import "./allHistoric.css";
import Header from "../Header/header";
import returnOneToMany from "./returnOneToMany";
import returnOneToOne from "./returnOneToOne";
import { returnOneValue } from "./returnMain";
import MyContext from "../../context/myContext";

function AllHistorics() {

  const { getClients } = useContext(MyContext);

  const [getAllHistorics, setAllHistorics] = useState([]);
  const [getNames, setNames] = useState("");
  const [valuesFiltered, setValuesFiltered] = useState({});
  const [showOrdenate, setShowOrdenate] = useState("main");
  const [nameForFilter, setNameForFilter] = useState("");

  async function getAllClient() {
    const url = "https://table-lalef.vercel.app"
    const promise = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await promise.json();
    setAllHistorics(response);
  };

  useEffect(() => {
    getAllClient();
  }, [])


  const ordenateNames = getAllHistorics.map((item) => item.client).sort();

  function filteredClientsByFilter() {
    const getValue = getAllHistorics.filter((cli) => cli.client === getNames);
    setValuesFiltered(getValue);
  }

  useEffect(() => {
    filteredClientsByFilter();
  }, [getNames])

  function handleClickFilter({ target }) {
    const { value } = target
    setNames(value);
    filteredClientsByFilter();
    setShowOrdenate("first filter");
  }

  function showAllList() {
    setShowOrdenate("show-all-list");
    if (showOrdenate === "show-all-list") {
      setShowOrdenate("first filter");
    }
  }

  function filterShowAll() {
    setShowOrdenate("main");
  }

  function returnMainOne() {
    setNameForFilter("");
  }

  function oQuarto(value) {
    setNameForFilter(value);
  }

  function ShowClientsByFilter() {
    if (showOrdenate === "main") {
      return returnOneValue(getAllHistorics, oQuarto, nameForFilter, returnMainOne);
    } else if (showOrdenate === "show-all-list") {
      return returnOneToMany(valuesFiltered, showAllList);
    } else if (showOrdenate === "first filter") {
      return returnOneToOne(valuesFiltered, showAllList);
    }
  }

  return (
    <div className="container-all-historic">
      <Header />
      <header className="container-header-all-historic">
        <select
          onClick={((event) => handleClickFilter(event))}
          className="options-clients" size="5"
        >
          {
            ordenateNames && ordenateNames.map((item) => (
              <option>{item}</option>
            ))
          }
        </select>
        <button onClick={filterShowAll}>Todos</button>
      </header>
      <div className="container-body-all-historic">
        {ShowClientsByFilter()}
      </div>
    </div>
  );
}

export default AllHistorics;
