function returnOneToMany(valuesFiltered, showAllList) {
  return (
    <ul className="container-list">
      <button
        className="button-show-One-values"
        type="button"
        onClick={showAllList}
      >
        Esconder
      </button>
      {valuesFiltered
        ? valuesFiltered.slice().reverse().map((cli, index) => (
          <li className="line-historic" key={index}>
            <h3>{cli.client}</h3>
            <ul>
              {cli.historic.slice().reverse().map((update, updateIndex) => (
                <li className="line-all-historic" key={updateIndex}>
                  <span>
                    <div style={{ backgroundColor: update.color }}></div>
                    <h3>{!update.updateAt ? update.date : update.updateAt}</h3>
                  </span>
                  <h4>Atualização:</h4>
                  <p>{update.update}</p>
                  <h4>Demanda:</h4>
                  <li key={index}>
                    {!cli.demand ? cli.allDemands.slice().reverse()[updateIndex] : cli.demand}
                  </li>
                </li>
              ))}
            </ul>
          </li>
        ))
        : <h1>Not Found</h1>
      }
    </ul>
  )
}

export default returnOneToMany;
