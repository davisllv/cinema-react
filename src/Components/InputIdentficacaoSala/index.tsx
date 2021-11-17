import React, { InputHTMLAttributes } from "react";

export interface IInputFaixaEtaria
  extends InputHTMLAttributes<HTMLInputElement> {
  handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  inputValor: string;
}

const InputIdentficacaoSala: React.FC<IInputFaixaEtaria> = ({
  handleChange,
  inputValor,
  ...rest
}) => {
  function handleValidar(ev: React.ChangeEvent<HTMLInputElement>): void {
    const string = Array.from(ev.target.value.toUpperCase());
    if (string[0]) {
      string[0] = string[0].replace(/([G-Z])|\d|\W/g, "");
      ev.target.value = string.join("");
    }

    if (string[1]) {
      string[1] = string[1].replace(/\D/g, "");
      ev.target.value = string.join("");
    }
  }

  return (
    <input
      type="text"
      placeholder="Nome da Sala"
      maxLength={2}
      pattern="[A-F]{1}[1-9]{1}"
      title="One letter and one number"
      value={inputValor}
      onChange={(ev) => {
        handleValidar(ev);
        handleChange(ev);
      }}
    />
  );
};

export default InputIdentficacaoSala;
