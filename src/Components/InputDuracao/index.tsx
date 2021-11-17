import React, { InputHTMLAttributes } from "react";

export interface IInputDuracao extends InputHTMLAttributes<HTMLInputElement> {
  handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  inputValor: string;
}

const InputDuracao: React.FC<IInputDuracao> = ({
  handleChange,
  inputValor,
  ...rest
}) => {
  function handleValidar(ev: React.ChangeEvent<HTMLInputElement>): void {
    ev.target.value = ev.target.value.replace(/\D/g, "");
  }

  return (
    <input
      type="text"
      placeholder="Duração"
      value={inputValor}
      onChange={(ev) => {
        handleValidar(ev);
        handleChange(ev);
      }}
    />
  );
};

export default InputDuracao;
