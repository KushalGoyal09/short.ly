import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IUrlInput {
  longUrl: string;
  shortUrl: string;
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

export default function Home() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const { handleSubmit, register } = useForm<IUrlInput>();

  const submit = async (userInput: IUrlInput) => {
    setError("");
    setSuccess("");
    setLink("");

    if (
      !/((\w+:\/\/)[-a-zA-Z0-9:@;?&=\/%\+\.\*!'$$$$,\$_\{\}\^~\[\]`#|]+)/.test(
        userInput.longUrl
      )
    ) {
      setError("Please enter a valid long URL");
      return;
    }
    if (!/^[a-z0-9-]+$/i.test(userInput.shortUrl)) {
      setError("Short url is not valid");
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/url",
        {
          completeUrl: userInput.longUrl,
          shortUrl: userInput.shortUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccess("Short Url created successfully");
      setLink(data.link);
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
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
        <Card className="w-full max-w-md z-20 bg-gradient-to-br from-blue-900 to-black border-blue-700">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-white">
              URL Shortener
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-center text-blue-200">
              Enter a long URL to get a shorter version. Share it with your
              friends!
            </p>
            <form onSubmit={handleSubmit(submit)} className="space-y-4">
              <div>
                <Label htmlFor="longUrl" className="text-blue-200">
                  Complete URL
                </Label>
                <Input
                  type="text"
                  id="longUrl"
                  className="mt-1 bg-blue-950 border-blue-800 text-white placeholder-blue-400"
                  {...register("longUrl", { required: true })}
                />
              </div>
              <div>
                <Label htmlFor="shortUrl" className="text-blue-200">
                  Short URL
                </Label>
                <Input
                  type="text"
                  id="shortUrl"
                  className="mt-1 bg-blue-950 border-blue-800 text-white placeholder-blue-400"
                  {...register("shortUrl", { required: true })}
                />
              </div>
              {error && <div className="text-red-400">{error}</div>}
              {success && <div className="text-green-400">{success}</div>}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition"
              >
                Make Short URL
              </Button>
            </form>
            {link && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-blue-950 rounded-lg"
              >
                <p className="text-blue-200">
                  Your link is active on{" "}
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300 transition"
                  >
                    {link}
                  </a>
                </p>
                <Button
                  onClick={handleCopy}
                  className="mt-2 bg-blue-800 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span className="ml-2">{copied ? "Copied!" : "Copy"}</span>
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
