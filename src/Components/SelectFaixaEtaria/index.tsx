import React, { InputHTMLAttributes } from "react";

export interface ISelectFaixaEtaria
  extends InputHTMLAttributes<HTMLSelectElement> {
  handleChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void;
  inputValor: string;
}

const SelectFaixaEtaria: React.FC<ISelectFaixaEtaria> = ({
  handleChange,
  inputValor,
}) => {
  return (
    <select defaultValue="Livre" value={inputValor} onChange={handleChange}>
      <option value="Livre">Livre</option>
      <option value="10">+10 Anos</option>
      <option value="12">+12 Anos</option>
      <option value="14">+14 Anos</option>
      <option value="16">+16 Anos</option>
      <option value="18">+18 Anos</option>
    </select>
  );
};

export default SelectFaixaEtaria;
