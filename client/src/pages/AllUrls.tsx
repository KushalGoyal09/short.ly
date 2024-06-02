import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { token } from "../store/userAtom";
import { useRecoilValue } from "recoil";
import UrlBox from "../components/UrlBox";
interface Urls {
  id: string;
  shortURL: string;
  completeURL: string;
  clicks: number;
  createdAt: Date;
  baseUrl: string
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
  baseUrl: string
}

const AllUrls = () => {
  const [urls, setUrls] = useState<Urls[]>([]);
  const userToken = useRecoilValue(token);

  const getAllUrls = useCallback(async () => {
    try {
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
        baseUrl:data.baseUrl
      }));
      setUrls(urls);
    } catch (error) {
      console.log(error);
    }
  }, [userToken]);

  useEffect(() => {
    getAllUrls();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-4">
      {urls.map((url) => (
        <UrlBox
          shortUrl={url.shortURL}
          completeUrl={url.completeURL}
          createdAt={url.createdAt}
          clicks={url.clicks}
          id={url.id}
          baseUrl={url.baseUrl}
        />
      ))}
    </div>
  );
};

export default AllUrls;
