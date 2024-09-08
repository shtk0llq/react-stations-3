import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../stores/hooks";
import NotFound from "../pages/notFound";
import Layout from "./layout";

const Home = lazy(() => import("../pages/home"));
const Signup = lazy(() => import("../pages/signup"));
const Signin = lazy(() => import("../pages/signin"));
const New = lazy(() => import("../pages/new"));
const Show = lazy(() => import("../pages/show"));
const Profile = lazy(() => import("../pages/profile"));

function Router() {
  const auth = useAppSelector((state) => state.auth.isSignin);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={auth ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/signin"
            element={auth ? <Navigate to="/" /> : <Signin />}
          />
          <Route path="/new" element={<New />} />
          <Route path="/detail/:id" element={<Show />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
