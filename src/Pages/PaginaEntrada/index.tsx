import Menu from "../../Components/Menu";
import "../../styles.css";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TipoUsuario } from "../../App";
import { AppContext } from "../../Context/AppContext";
import { ISala } from "../AdicionarSala";

export interface IUsuario {
  id: number;
  tipo: TipoUsuario;
  sala: Array<ISala>;
}
const PaginaEntrada: React.FC = () => {
  // const { listaUsuario, setListaUsuario } = useContext(AppContext);
  const { setUsuario } = useContext(AppContext);

  function handleClickVisitor(): void {
    const novoUsuario: IUsuario = {
      id: Math.round(Math.random() * 100 + 1),
      tipo: TipoUsuario.visitante,
      sala: [],
    };
    setUsuario(novoUsuario);
  }

  function handleClickAdministrador(): void {
    const novoUsuario: IUsuario = {
      id: Math.round(Math.random() * 100 + 1),
      tipo: TipoUsuario.administrador,
      sala: [],
    };
    setUsuario(novoUsuario);
  }

  return (
    <>
      <Menu />
      <div className="container">
        <h4>Bem Vindo</h4>

        <div className="btns-boxes">
          <div className="admin-div">
            <span>Administrador</span>
            <div className="admin-button">
              <Link to="/home" onClick={handleClickAdministrador}>
                <button>Administrador</button>
              </Link>
            </div>
          </div>
          <div className="visitante-div">
            <span>Visitante</span>
            <div className="visitante-button">
              <Link to="/home" onClick={handleClickVisitor}>
                <button>Visitante</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaginaEntrada;
