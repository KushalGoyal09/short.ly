import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { authStatus, token } from "../store/userAtom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";

interface IUrlInput {
  longUrl: string;
  shortUrl: string;
}

export default function Home() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [link, setLink] = useState("");
  const isLogedIn = useRecoilValue(authStatus);
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<IUrlInput>();
  const userToken = useRecoilValue(token);
  const [copied, setCopied] = useState(false);

  const submit: SubmitHandler<IUrlInput> = async (userInput) => {
    setError("");
    setSuccess("");
    setLink("");
    if (!isLogedIn) {
      navigate("/login");
      return;
    }
    if (
      !/((\w+:\/\/)[-a-zA-Z0-9:@;?&=\/%\+\.\*!'\(\),\$_\{\}\^~\[\]`#|]+)/.test(
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
            Authorization: `Bearer ${userToken}`,
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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">URL Shortener</h1>
      <p className="mb-6 text-center">
        Enter a long URL to get a shorter version. Share it with your friends!
      </p>
      <form onSubmit={handleSubmit(submit)}>
        <div className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="longUrl" className="block text-gray-300 mb-2">
              Complete URL
            </label>
            <input
              type="text"
              id="longUrl"
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
              {...register("longUrl", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="shortUrl" className="block text-gray-300 mb-2">
              Short URL
            </label>
            <input
              type="text"
              id="shortUrl"
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
              {...register("shortUrl", { required: true })}
            />
          </div>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          {success && <div className="mb-4 text-green-500">{success}</div>}
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Make Short URL
          </button>
          {link && (
            <div className="mt-4 p-4 bg-gray-800 rounded">
              your link is active on{" "}
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline hover:text-blue-600 transition"
              >
                {link}
              </a>
              <button
                onClick={handleCopy}
                className="ml-4 px-2 py-1 bg-transparent text-white rounded hover:text-blue-600 transition"
                aria-label="Copy link"
                type="button"
              >
                <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
