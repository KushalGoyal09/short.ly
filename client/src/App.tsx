import { lazy } from "react";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
import NotFound from "./pages/NotFound";
const Signup = lazy(() => import("./pages/Signup"));
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout";
import { RecoilRoot } from "recoil";
import AllUrls from "./pages/AllUrls";
import { ErrorBoundary } from "react-error-boundary";
import Protected from "./components/AuthLayout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="login"
          element={
            <Protected authentication={false}>
              <Login /> 
            </Protected>
          }
        />
        <Route
          path="signup"
          element={
            <Protected authentication={false}>
              <Signup />
            </Protected>
          }
        />
        <Route
          path="allurl"
          element={
            <Protected authentication={true}>
              <AllUrls />
            </Protected>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
