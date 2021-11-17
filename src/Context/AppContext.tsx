import React, { createContext, useState } from "react";
import { IFilme } from "../Pages/AdicionarFilme";
import { ISala } from "../Pages/AdicionarSala";
import { IUsuario } from "../Pages/PaginaEntrada";

export interface IAppContext {
  usuario: IUsuario | null;
  setUsuario: React.Dispatch<React.SetStateAction<IUsuario | null>>;
  listaFilme: IFilme[];
  setListaFilme: React.Dispatch<React.SetStateAction<IFilme[]>>;
  listaSalas: ISala[];
  setListaSalas: React.Dispatch<React.SetStateAction<ISala[]>>;
}

export const AppContext = createContext({} as IAppContext);

const AppProvider: React.FC = ({ children }) => {
  const [usuario, setUsuario] = useState<IUsuario | null>(null);
  const [listaFilme, setListaFilme] = useState<IFilme[]>([]);
  const [listaSalas, setListaSalas] = useState<ISala[]>([]);

  return (
    <AppContext.Provider
      value={{
        usuario,
        setUsuario,
        listaFilme,
        setListaFilme,
        listaSalas,
        setListaSalas,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
