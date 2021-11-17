import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

const Menu: React.FC = () => {
  const { usuario, setUsuario } = useContext(AppContext);
  const { pathname } = useLocation();
  // console.log(pathname); Pega o valor da URL atual

  return (
    <div className="content">
      <header id="header">
        <nav>
          <Link
            to="/"
            className="logo"
            onClick={() => {
              setUsuario(null);
            }}
          >
            {/* <img src="movietheater-icon.png" alt="" /> */}
            Cine<span>Fun</span>.<div className="menu"></div>
          </Link>

          <ul className="grid">
            <li>
              {usuario?.tipo && (
                <Link to="/home">
                  <button className={pathname.includes("/home") ? "ativo" : ""}>
                    Home
                  </button>
                </Link>
              )}
            </li>
            <li>
              {usuario?.tipo === "Administrador" && (
                <Link to="/adicionar-filme">
                  <button
                    className={
                      pathname.includes("/adicionar-filme") ? "ativo" : ""
                    }
                  >
                    Adicionar Filme
                  </button>
                </Link>
              )}
            </li>
            <li>
              {usuario?.tipo === "Administrador" && (
                <Link to="/adicionar-sala">
                  <button
                    className={
                      pathname.includes("/adicionar-sala") ? "ativo" : ""
                    }
                  >
                    Adicionar Sala
                  </button>
                </Link>
              )}
            </li>
            <li>
              {usuario?.tipo && (
                <Link to="/filmes">
                  <button
                    className={pathname.includes("/filmes") ? "ativo" : ""}
                  >
                    Filmes
                  </button>
                </Link>
              )}
            </li>
            <li>
              {usuario?.tipo && (
                <Link to="/salas">
                  <button
                    className={pathname.includes("/salas") ? "ativo" : ""}
                  >
                    Salas
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Menu;
