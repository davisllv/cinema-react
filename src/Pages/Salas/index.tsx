import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";

import Menu from "../../Components/Menu";

const Salas: React.FC = () => {
  const { listaSalas, setListaSalas, usuario } = useContext(AppContext);

  function handleDeleteSala(id: number): void {
    setListaSalas((prevState) => {
      return prevState.filter((it) => it.id !== id);
    });
    toast.success("Sala removida com sucesso");
  }

  return (
    <>
      <Menu />
      <div className="container">
        <h4>Listagem de Salas</h4>
        {listaSalas.length === 0 ? (
          <div className="manutencao-box">
            <h2>Sem Salas Adicionadas</h2>
          </div>
        ) : (
          <div className="movie-boxes">
            <ul>
              {listaSalas.map((salas) => {
                return (
                  <li className="movie-list">
                    <div>
                      <span>{`Sala: ${salas.identificacao}`}</span>
                      <span>{`Filme: ${salas.filme.nome}`}</span>
                    </div>

                    {usuario?.tipo === "Administrador" && (
                      <div className="button-delete">
                        <button
                          onClick={() => {
                            handleDeleteSala(salas.id);
                          }}
                        >
                          Deletar
                        </button>
                      </div>
                    )}
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

export default Salas;
