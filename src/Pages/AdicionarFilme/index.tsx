import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../../Context/AppContext";
import * as yup from "yup";
import Menu from "../../Components/Menu";
import InputDuracao from "../../Components/InputDuracao";

export interface IFilme {
  id: number;
  nome: string;
  faixaEtaria?: string;
  duracao: number;
}

const AdicionarFilme: React.FC = () => {
  const { listaFilme, setListaFilme } = useContext(AppContext);

  const [inputNome, setInputNome] = useState("");
  const [inputDuracao, setInputDuracao] = useState("");
  const [faixaEtaria, setFaixaEtaria] = useState("Livre");

  function handleChangeNome(ev: React.ChangeEvent<HTMLInputElement>): void {
    setInputNome(ev.target.value);
  }

  function handleChangeDuracao(ev: React.ChangeEvent<HTMLInputElement>): void {
    ev.target.value = ev.target.value.replace(/\D/g, "");
    setInputDuracao(String(Number(ev.target.value) || ""));
  }

  function handleChangeFaixaEtaria(
    ev: React.ChangeEvent<HTMLSelectElement>
  ): void {
    setFaixaEtaria(ev.target.value);
  }

  function handleError(error: yup.ValidationError): void {
    error.inner.forEach((item) => {
      //Error é um objeto, que possui o inner, que é um array, por isso eu preciso do forEach
      toast.error(item.message);
    });
  }
  async function handleSubmitValues(
    ev: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    ev.preventDefault();
    const schema = yup.object().shape({
      inputNome: yup.string().required("Nome do filme é obrigatório"),
      inputDuracao: yup
        .string()
        .test({
          message: "No mínimo 45 minutos",
          test: (inputDuracao) => {
            let duracao = Number(inputDuracao);
            if (duracao > 45) {
              return true;
            } else {
              return false;
            }
          },
        })
        .test({
          message: "No máximo 220 minutos",
          test: (inputDuracao) => {
            let duracao = Number(inputDuracao);
            if (duracao > 220) {
              return false;
            } else {
              return true;
            }
          },
        })
        .required("Duração do filme é obrigatório"),
      inputFaixaEtaria: yup.number(),
    });

    const filmeExistente = listaFilme.some((it) => it.nome === inputNome);

    if (filmeExistente) {
      toast.error("Filme já adicionado");
      return;
    }

    try {
      await schema.validate(
        { inputNome, inputDuracao, faixaEtaria },
        { abortEarly: false }
      );
      setListaFilme((prevState) => {
        const newMovie: IFilme = {
          id: Math.round(Math.random() * 100 + 1),
          nome: inputNome,
          duracao: Number(inputDuracao),
          faixaEtaria: faixaEtaria,
        };
        const newList = [...prevState, newMovie];
        return newList;
      });
      setInputNome("");
      setInputDuracao("");
      setFaixaEtaria("Livre");
      toast.success("Filme Adicionado");
    } catch (error) {
      if (error instanceof yup.ValidationError) handleError(error);
    }
  }

  return (
    <>
      <Menu />
      <div className="container">
        <h4>Adicionar Filme</h4>
        <div className="inpt-boxes">
          <form onSubmit={handleSubmitValues}>
            <div className="nome-box">
              <label>Nome</label>
              <div className="nome-input-div">
                <input
                  placeholder="Nome"
                  value={inputNome}
                  type="text"
                  onChange={handleChangeNome}
                />
              </div>
            </div>
            <div className="duracao-box">
              <label>Duracação</label>
              <div className="duracao-input-div">
                <InputDuracao
                  inputValor={inputDuracao}
                  handleChange={handleChangeDuracao}
                />
              </div>
            </div>
            <div className="faixa-etaria-box">
              <label>Faixa Etaria</label>
              <div className="faixa-etaria-input-div">
                <select
                  defaultValue="Livre"
                  value={faixaEtaria}
                  onChange={handleChangeFaixaEtaria}
                >
                  <option value="Livre">Livre</option>
                  <option value="10">+10 Anos</option>
                  <option value="12">+12 Anos</option>
                  <option value="14">+14 Anos</option>
                  <option value="16">+16 Anos</option>
                  <option value="18">+18 Anos</option>
                </select>
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

export default AdicionarFilme;
