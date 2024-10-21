import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Urls {
  id: string;
  shortURL: string;
  completeURL: string;
  clicks: number;
  createdAt: Date;
  baseUrl: string;
}

interface IUserUrl {
  _id: string;
  completeURL: string;
  shortURL: string;
  createdBy: string;
  clicks: string[];
  createdAt: string;
  __v: number;
}

interface DataI {
  success: boolean;
  userUrls: IUserUrl[];
  baseUrl: string;
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

const UrlBox = ({
  shortURL,
  completeURL,
  createdAt,
  clicks,
  baseUrl,
}: Urls) => {
  const fullShortUrl = `${baseUrl}/${shortURL}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullShortUrl);
      toast({
        title: "Copied!",
        description: "Short URL copied to clipboard",
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast({
        title: "Error",
        description: "Failed to copy URL",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-blue-900 to-black border-blue-700 mb-4">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-white">{shortURL}</h3>
            <span className="text-blue-300 text-sm">{clicks} clicks</span>
          </div>
          <p className="text-blue-200 truncate mb-2">{completeURL}</p>
          <div className="flex justify-between items-center text-sm text-blue-400 mb-2">
            <span>Created: {createdAt.toLocaleDateString()}</span>
            <a
              href={fullShortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition"
            >
              Visit
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-300 text-sm truncate mr-2">
              {fullShortUrl}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              className="h-8 w-8"
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy short URL</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function AllUrls() {
  const [urls, setUrls] = useState<Urls[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getAllUrls = useCallback(async () => {
    try {
      const userToken = localStorage.getItem("token"); // Assuming token is stored in localStorage
      const { data } = await axios.get<DataI>("/api/allurl", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const urls: Urls[] = data.userUrls.map((url) => ({
        id: url._id,
        shortURL: url.shortURL,
        completeURL: url.completeURL,
        clicks: url.clicks.length,
        createdAt: new Date(url.createdAt),
        baseUrl: data.baseUrl,
      }));
      setUrls(urls);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch URLs");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllUrls();
  }, [getAllUrls]);

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
        className="w-full max-w-4xl z-20"
      >
        <Card className="bg-gradient-to-br from-blue-900 to-black border-blue-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-white">
              Your Shortened URLs
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-blue-200 text-center">Loading...</p>
            ) : error ? (
              <p className="text-red-400 text-center">{error}</p>
            ) : (
              <ScrollArea className="h-[60vh]">
                {urls.map((url) => (
                  <UrlBox key={url.id} {...url} />
                ))}
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
