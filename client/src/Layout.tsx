import * as React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Loding from "./components/Loding";

export default function Layout() {
  return (
    <>
      <Navbar />
      <React.Suspense fallback={<Loding />}>
        <Outlet />
      </React.Suspense>
    </>
  );
}
