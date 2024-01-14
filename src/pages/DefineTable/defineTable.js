// import React, { useContext } from "react";
// import MyContext from "../../context/myContext";
// import { Link } from "react-router-dom";
// import Header from "../Header/header";
// import { firstList } from "./dataProperts";

// function DefineTable() {
//   const { setDefinedNamesColumns } = useContext(MyContext);
//   // const [getValuesColumns, setValuesColumns] = useState({
//   //   nameColumns: ""
//   // });

//   // function handleChangeColumns({ target }) {
//   //   const { name, value } = target;
//   //   setValuesColumns(prevState => ({ ...prevState, [name]: value }));
//   // }

//   function cleanTextArea() {
//     let textAre = document.querySelector('.text-area');
//     textAre.value = "";
//   }

//   // function handleClick() {
//   //   const arrayValuesColumns = getValuesColumns.nameColumns.split(",");
//   //   setDefinedNamesColumns(arrayValuesColumns);
//   //   cleanTextArea();
//   // }

//   function handleChange({ target }) {
//     const { value } = target;
//     if (value === "tabela add novos clientes") {
//       setDefinedNamesColumns(firstList)
//     }
//     if (value === "tabela de informações dos clientes") {

//     }
//   };

//   return (
//     <div>
//       <Header />
//       <header>
//         <h1>Defina os nomes das colunas</h1>
//       </header>
//       <h3>insira os nomes das colunas separados por vírgula.</h3>
//       <label>
//         <input onClick={handleChange} type="radio" name="tables" value="tabela add novos clientes" />
//         tabela para adicionar novos clientes
//       </label>
//       <label>
//         <input onClick={handleChange} type="radio" name="tables" value="tabela de informações dos clientes" />
//         tabela para informações dos clientes
//       </label>
//       <Link to="/main" onClick={handleClick}>definir</Link>
//     </div>
//   );
// };

// export default DefineTable;
