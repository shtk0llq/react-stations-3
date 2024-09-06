import Provider from "./routes/provider";
import Router from "./routes/router";

function App() {
  return (
    <Provider>
      <Router />
    </Provider>
  );
}

export default App;
