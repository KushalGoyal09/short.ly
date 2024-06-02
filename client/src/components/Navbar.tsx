import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { authStatus, token } from "../store/userAtom";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useEffect, useState } from "react";

const Navbar = () => {
  const isLogedInLoadable = useRecoilValueLoadable(authStatus);
  const [isLogedIn, setisLogedIn] = useState(false);
  const setToken = useSetRecoilState(token);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const navLinks = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "See all your short Urls",
      slug: "/allurl",
      active: isLogedIn,
    },
  ];

  useEffect(() => {
    if ((isLogedInLoadable.state === "loading")) {
      setLoading(true);
    }
    if ((isLogedInLoadable.state === "hasValue")) {
      setLoading(false);
    }
  }, [isLogedInLoadable]);

  useEffect(() => {
    if(!loading) {
      setisLogedIn(isLogedInLoadable.contents);
    }
  },[loading,isLogedInLoadable])

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <Logo width={50} height={50} onClick={() => navigate("/")} />
      </div>
      <div className="flex-1 flex justify-center">
        <ul className="flex space-x-6">
          {navLinks.map((link) => {
            if (link.active) {
              return (
                <li key={link.slug}>
                  <a href={link.slug} className="hover:text-gray-300 text-lg">
                    {link.name}
                  </a>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
      <div>
        {!isLogedIn ? (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600"
          >
            Login
          </button>
        ) : (
          <button
            onClick={logout}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
