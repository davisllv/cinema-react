import React, { useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../../Context/AppContext";

import Menu from "../../Components/Menu";

const Filmes: React.FC = () => {
  const { listaFilme, setListaFilme, usuario } = useContext(AppContext);

  function handleDeleteFilme(id: number): void {
    setListaFilme((prevState) => {
      return prevState.filter((item) => item.id !== id);
    });
    toast.success("Filme removido com sucesso");
  }

  return (
    <>
      <Menu />
      <div className="container">
        <h4>Listagem de Filmes</h4>
        {listaFilme.length === 0 ? (
          <div className="manutencao-box">
            <h2>Sem filmes adicionados</h2>
          </div>
        ) : (
          <div className="movie-boxes">
            <ul>
              {listaFilme.map((filme) => {
                return (
                  <li className="movie-list">
                    <div>
                      <span>{filme.nome}</span>
                      <span>{`Duração: ${(filme.duracao / 60).toFixed(0)}h e ${(
                        (filme.duracao % 60) *
                        0.6
                      ).toFixed(0)} minutos`}</span>
                      <span>{`Faixa Etaria: ${filme.faixaEtaria}`}</span>
                    </div>

                    {usuario?.tipo === "Administrador" && (
                      <div className="button-delete">
                        <button
                          onClick={() => {
                            handleDeleteFilme(filme.id);
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

export default Filmes;
