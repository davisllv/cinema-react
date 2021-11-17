import React from "react";
import AppProvider from "./Context/AppContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//==========================COMPONENTES==========================
import PaginaEntrada from "./Pages/PaginaEntrada";
import Homepage from "./Pages/Homepage";
import AdicionarFilme from "./Pages/AdicionarFilme";
import AdicionarSala from "./Pages/AdicionarSala";
import Filmes from "./Pages/Filmes";
import Salas from "./Pages/Salas";

export enum TipoUsuario {
  administrador = "Administrador",
  visitante = "Visitante",
}

const App: React.FC = () => {
  return (
    <>
      <ToastContainer autoClose={3000} pauseOnHover={false} />
      <Router>
        <AppProvider>
          <Switch>
            <Route path="/" exact component={PaginaEntrada} />
            <Route path="/home" exact component={Homepage} />
            <Route path="/adicionar-filme" exact component={AdicionarFilme} />
            <Route path="/adicionar-sala" exact component={AdicionarSala} />
            <Route path="/filmes" exact component={Filmes} />
            <Route path="/salas" exact component={Salas} />
          </Switch>
        </AppProvider>
      </Router>
    </>
  );
};

export default App;
