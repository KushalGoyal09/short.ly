import { FC, ReactNode, useEffect, useState } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { authStatus } from "../store/userAtom";
import { useNavigate } from "react-router-dom";

interface ProtectedProps {
  children: ReactNode;
  authentication: boolean;
}

const Protected: FC<ProtectedProps> = ({ children, authentication }) => {
  const isLogedIn = useRecoilValue(authStatus);
  const [render, setRender] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication === true) {
      if (!isLogedIn) {
        navigate("/login")
      } else {
        setRender(true);
      }
    } else {
      if (!isLogedIn) {
        setRender(true);
      } else {
        navigate("/");
      }
    }
  }, [isLogedIn,authentication]);

  return <>{render && children}</>;
};

export default Protected;
