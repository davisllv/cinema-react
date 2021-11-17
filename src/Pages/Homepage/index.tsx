import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

import { IUsuario } from "../PaginaEntrada";
import Menu from "../../Components/Menu";

const Homepage: React.FC = () => {
  const { listaFilme, listaSalas, usuario, setUsuario } =
    useContext(AppContext);

  function handleClickEntrarSala(id: number): void {
    const salaSelecionada = listaSalas.find((it) => it.id === id);
    if (usuario && salaSelecionada) {
      setUsuario((prevState) => {
        const novoUsuario: IUsuario = {
          id: usuario.id,
          tipo: usuario.tipo,
          sala: prevState?.sala ? [...prevState.sala, salaSelecionada] : [],
        };
        return novoUsuario;
      });
    }
  }

  function handleClickSairSala(id: number): void {
    setUsuario((prevState) => {
      if (prevState) {
        const novaListaSalas = prevState.sala.filter((it) => it.id !== id);
        return { ...prevState, sala: novaListaSalas };
      } else {
        return prevState;
      }
    });
  }

  return (
    <>
      <Menu />
      <div className="container">
        <h4>Filmes em Cartaz</h4>
        {listaFilme.length === 0 ? (
          <div className="manutencao-box">
            <h2>Estamos em manutenção, para um melhor atendimento !</h2>
            <img
              src="https://www.linknacional.com.br/wp-content/uploads/2020/12/servico-manutencao-de-site-2.png"
              alt=""
            />
          </div>
        ) : (
          <div className="list-boxes">
            <ul>
              {listaFilme.map((filme) => {
                return (
                  <li>
                    <h3>{filme.nome}</h3>
                    <ul className="lista-salas">
                      {listaSalas
                        .filter((it) => it.filme.id === filme.id)
                        .map((salas) => {
                          return (
                            <li
                              className={
                                usuario?.sala.some((it) => it.id === salas.id)
                                  ? "box-lista-salas-cadastrado"
                                  : "box-lista-salas"
                              }
                            >
                              <div>
                                <span>{`Sala ${salas.identificacao}`}</span>
                              </div>
                              <button
                                className={
                                  usuario?.sala.some((it) => it.id === salas.id)
                                    ? "button-ativo"
                                    : ""
                                }
                                onClick={() => {
                                  if (
                                    usuario?.sala.some(
                                      (it) => it.id === salas.id
                                    )
                                  ) {
                                    handleClickSairSala(salas.id);
                                  } else {
                                    handleClickEntrarSala(salas.id);
                                  }
                                }}
                              >
                                {usuario?.sala.some((it) => it.id === salas.id)
                                  ? "Sair"
                                  : "Entrar"}
                              </button>
                            </li>
                          );
                        })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Homepage;
