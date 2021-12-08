import React, { useReducer, useEffect } from "react";
import { AppRouter } from "./routes/AppRouter";
import { AuthContext } from "./context/AuthContext";
import { AuthReducer } from "./context/AuthReducer";

//import Cotizacion from "./components/Cot-list.component";
//import EditCotizacion from "./components/Cot-edit.component";
//import CreateCotizacion from "./components/Cot-create.component";

//import Presupuesto from "./components/Presupuesto";
//import CuadroAPU from "./components/CuadroAPU";

//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Header from "./components/Header";

//import Ingenieria from "./components/Home";

const init = () => {
  return JSON.parse(localStorage.getItem("user")) || { logged: false };
};

const App = () => {
  const [user, dispatch] = useReducer(AuthReducer, {}, init);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    /*    <React.Fragment>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            exact
            render={(props) => <Login {...props} />}
          ></Route>
          <Route
            path="/register"
            exact
            render={(props) => <Register {...props} />}
          ></Route>
          <Route
            path="/dashboard"
            exact
            render={(props) => <Dashboard {...props} />}
          ></Route>
          <Route
            path="/cotizacion-list"
            exact
            render={(props) => <Cotizacion {...props} />}
          ></Route>
          <Route
            path="/edit-cotizacion/:id"
            exact
            render={(props) => <EditCotizacion {...props} />}
          ></Route>
          <Route
            path="/create-cotizacion"
            exact
            render={(props) => <CreateCotizacion {...props} />}
          ></Route>
          <Route
            path="/presupuesto"
            exact
            render={(props) => <Presupuesto {...props} />}
          ></Route>
          <Route
            path="/apu"
            exact
            render={(props) => <CuadroAPU {...props} />}
          ></Route>
          <Route
            path="/material-list"
            exact
            render={(props) => <MaterialList {...props} />}
          ></Route>
          <Route
            path="/edit-material/:id"
            exact
            render={(props) => <EditMaterial {...props} />}
          ></Route>
          <Route
            path="/create-material"
            exact
            render={(props) => <CreateMaterial {...props} />}
          ></Route>
        </Routes>
      </Router>
    </React.Fragment>
  ); */

    <AuthContext.Provider value={{ user, dispatch }}>
      <AppRouter />
    </AuthContext.Provider>
  );
};

export default App;
