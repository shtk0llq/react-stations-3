import Provider from "./routes/provider";
import Router from "./routes/router";
import "./App.scss";

function App() {
  return (
    <Provider>
      <Router />
    </Provider>
  );
}

export default App;
