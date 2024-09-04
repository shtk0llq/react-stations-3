import "./App.scss";
import Provider from "./routes/Provider";
import Router from "./routes/router";

function App() {
  return (
    <Provider>
      <Router />
    </Provider>
  );
}

export default App;
