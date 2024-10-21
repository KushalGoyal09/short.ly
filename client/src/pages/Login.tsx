import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSetRecoilState } from "recoil";
import { token } from "@/store/userAtom";

interface ILoginInputs {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
}

const MovingLine = ({ index }: { index: number }) => (
  <motion.div
    className="absolute bg-blue-500 opacity-20"
    style={{
      width: Math.random() * 200 + 100,
      height: 1,
      left: `${index * 10}%`,
      top: Math.random() * 100 + "%",
    }}
    animate={{
      y: [0, Math.random() * 500 - 250],
      rotate: [0, Math.random() * 360],
    }}
    transition={{
      duration: Math.random() * 10 + 10,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  />
);

const Glitter = ({ index }: { index: number }) => (
  <motion.div
    className="absolute bg-white rounded-full"
    style={{
      width: 2,
      height: 2,
      left: `${index * 5}%`,
      top: Math.random() * 100 + "%",
    }}
    animate={{
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: Math.random() * 2 + 1,
      repeat: Infinity,
      delay: Math.random() * 2,
    }}
  />
);

export default function Login() {
  const { handleSubmit, register } = useForm<ILoginInputs>();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const setToken = useSetRecoilState(token);

  const login: SubmitHandler<ILoginInputs> = async (userData) => {
    setError("");
    setSuccess("");
    try {
      const { data } = await axios.post<LoginResponse>("/api/login", {
        email: userData.email,
        password: userData.password,
      });
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setSuccess("Logged in successfully");
    } catch (error) {
      setError("Somthing is wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gray-900">
      {[...Array(10)].map((_, i) => (
        <MovingLine key={`line-${i}`} index={i} />
      ))}
      {[...Array(50)].map((_, i) => (
        <Glitter key={`glitter-${i}`} index={i} />
      ))}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-4xl z-20 bg-gradient-to-br from-blue-900 to-black border-blue-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-white">
              Login to Your Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(login)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-200">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="bg-blue-950 border-blue-800 text-white placeholder-blue-400"
                  placeholder="Email address"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-200">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="bg-blue-950 border-blue-800 text-white placeholder-blue-400"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Link
                  to="/signup"
                  className="text-sm font-medium text-blue-400 hover:text-blue-300 transition"
                >
                  Don't have an account? Sign up
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition"
              >
                Sign in
              </Button>
              {error && <p className="text-red-400">{error}</p>}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-green-400">{success}</p>
                  <Link
                    to="/"
                    className="text-blue-400 hover:text-blue-300 transition"
                  >
                    Go to home page
                  </Link>
                </motion.div>
              )}
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
