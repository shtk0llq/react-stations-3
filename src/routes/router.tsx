import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../stores/hooks";
import Home from "../pages/home";
import Signup from "../pages/signup";
import Signin from "../pages/signin";
import Profile from "../pages/profile";
import NotFound from "../pages/notFound";

function Router() {
  const auth = useAppSelector((state) => state.auth.isSignin);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={auth ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/signin"
          element={auth ? <Navigate to="/" /> : <Signin />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
