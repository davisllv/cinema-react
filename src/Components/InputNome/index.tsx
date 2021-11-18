import React, { InputHTMLAttributes } from "react";

export interface IInputNome extends InputHTMLAttributes<HTMLInputElement> {
  handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  inputValor: string;
}
const InputNome: React.FC<IInputNome> = ({
  handleChange,
  inputValor,
  ...rest
}) => {
  return (
    <input
      placeholder="Nome"
      value={inputValor}
      type="text"
      onChange={handleChange}
    />
  );
};

export default InputNome;
