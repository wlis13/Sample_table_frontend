import React, { useContext, useEffect } from "react";
import MyContext from "../../context/myContext";
import "./historic.css";
import Header from "../Header/header";

function HistoricClients() {
  const { getOneClient, getClient } = useContext(MyContext);

  useEffect(() => {
    getOneClient();
  }, []);

  return (
    <div>
      <Header />
      <h3 id="title-name-Historic">{getClient.client}</h3>
      <ul>
        {
          getClient.historic ? getClient.historic.slice().reverse().map((cli, index) => (
            <li className="line-historic" key={index}>
              <pre>
                <div style={{ backgroundColor: cli.color }}></div>
                <h3>{`Atualização: ${!cli.updateAt ? cli.date : cli.updateAt}`}</h3>
              </pre>
              <p>{cli.update}</p>
            </li>
          )) : <h2>Loading...</h2>
        }
      </ul>
    </div>
  );
}

export default HistoricClients;
