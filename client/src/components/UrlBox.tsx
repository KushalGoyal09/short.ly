import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo";

interface IUrlBoxProps {
  id: string;
  completeUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date;
  baseUrl: string
}

const UrlBox = (props: IUrlBoxProps) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(`${props.baseUrl}/${props.shortUrl}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div key={props.id} className="p-4 border rounded-lg shadow-md space-y-2">
      <div className="flex items-center space-x-4">
        <Logo width={32} height={32}/>
        <a
          href={`${props.baseUrl}/${props.shortUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline hover:text-blue-600 transition"
        >
          {props.shortUrl}
        </a>
        <button
          onClick={handleCopy}
          className="ml-4 px-2 py-1 bg-transparent text-black rounded hover:text-blue-600 transition"
          aria-label="Copy link"
          type="button"
        >
          <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
        </button>
      </div>
      <div className="space-y-1">
        <a
          href={props.completeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black underline hover:text-blue-600 transition block"
        >
          {props.completeUrl}
        </a>
        <span className="block">Number of Clicks: {props.clicks}</span>
        <span className="block">
          Created at: {props.createdAt.toDateString()}
        </span>
      </div>
    </div>
  );
};

export default UrlBox;
