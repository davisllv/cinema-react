import React, { useContext, useState, useRef } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../../Context/AppContext";
import * as yup from "yup";

import { IFilme } from "../AdicionarFilme";
import Menu from "../../Components/Menu";
import InputIdentficacaoSala from "../../Components/InputIdentficacaoSala";

export interface ISala {
  id: number;
  identificacao: string;
  filme: IFilme;
}

const AdicionarSala: React.FC = () => {
  const { listaFilme, listaSalas, setListaSalas } = useContext(AppContext);
  const [inputIdentficacaoSala, setInputidentificacaoSala] = useState("");
  const selectRef = useRef<HTMLSelectElement>(null);

  function handleChangeIdentificacaoSala(
    ev: React.ChangeEvent<HTMLInputElement>
  ): void {
    const string = Array.from(ev.target.value.toUpperCase());
    if (string[0]) {
      string[0] = string[0].replace(/([G-Z])|\d|\W/g, "");
      ev.target.value = string.join("");
    }

    if (string[1]) {
      string[1] = string[1].replace(/\D/g, "");
      ev.target.value = string.join("");
    }
    setInputidentificacaoSala(ev.target.value);
  }

  function handleError(error: yup.ValidationError): void {
    error.inner.forEach((item) => {
      toast.error(error.message);
    });
  }

  async function handleSubmitValues(
    ev: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    ev.preventDefault();

    const schema = yup.object().shape({
      inputIdentficacaoSala: yup
        .string()
        .max(2, "Apenas uma letra e um Número")
        .required("Nome da sala é obrigatório"),
    });

    const filmeSelecionado = listaFilme.find(
      (it) => it.id === Number(selectRef.current?.value)
    ); // Para eu conseguir selecionar o filme que está no momento
    const salaExistente = listaSalas.some(
      (it) => it.identificacao === inputIdentficacaoSala
    ); // Se a sala já está cadastrada em alguma outra, então não pode ser cadastrada novamente
    if (salaExistente) {
      toast.error("Sala Já Existente");
      setInputidentificacaoSala("");
      return;
    }
    try {
      await schema.validate({ inputIdentficacaoSala }, { abortEarly: false });
      if (filmeSelecionado) {
        setListaSalas((prevState) => {
          const newSala: ISala = {
            id: Math.round(Math.random() * 100 + 1),
            identificacao: inputIdentficacaoSala,
            filme: filmeSelecionado,
          };
          const newList = [...prevState, newSala];
          return newList;
        });
        toast.success("Sala Criada");
        setInputidentificacaoSala("");
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) handleError(error);
    }
  }

  return (
    <>
      <Menu />
      <div className="container">
        <h4>Adicionar Sala</h4>
        <div className="sala-boxes">
          <form onSubmit={handleSubmitValues}>
            <div>
              <div className="select-box">
                <label>Filme</label>
                <div className="filme-select-div">
                  <select defaultValue="" ref={selectRef}>
                    {listaFilme.map((item) => {
                      return <option value={item.id}>{item.nome}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="nome-box">
                <label>Nome da Sala</label>
                <div className="nome-input-div">
                  <InputIdentficacaoSala
                    inputValor={inputIdentficacaoSala}
                    handleChange={handleChangeIdentificacaoSala}
                  />
                </div>
              </div>
            </div>
            <div className="button-box">
              <button>Salvar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdicionarSala;
