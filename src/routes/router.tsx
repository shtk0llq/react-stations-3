import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import NotFound from "../pages/notFound";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
