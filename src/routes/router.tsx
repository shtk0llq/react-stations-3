import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/signup";
import Signin from "../pages/signin";
import NotFound from "../pages/notFound";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
