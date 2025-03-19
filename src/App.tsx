import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import BodybuilderInfo from "./BodyBuilderInfo";
import { Provider } from "react-redux";
import { store } from "./store";
import DataDashboard from "./DataDashboard";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<h2>Welcome to Gains.com! Click a name to learn more.</h2>}
          />
          <Route
            path="/bodybuilder/jay-cutler"
            element={<BodybuilderInfo id="jay-cutler" />}
          />
          <Route
            path="/bodybuilder/rich-piana"
            element={<BodybuilderInfo id="rich-piana" />}
          />
          <Route
            path="/bodybuilder/ronnie-coleman"
            element={<BodybuilderInfo id="ronnie-coleman" />}
          />
          <Route
            path="/dashboard"
            element={<DataDashboard />}
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
