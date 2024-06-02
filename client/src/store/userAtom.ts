import axios from "axios";
import { useEffect } from "react";
import { atom, selector, useRecoilState, useSetRecoilState } from "recoil";

export const token = atom({
  key: "userToken",
  default: selector({
    key: "tokenSelector",
    get: () => {
      return localStorage.getItem("token");
    },
  }),
});

export const authStatus = atom({
  key: "authStatus",
  default: selector({
    key: "authStatusSelector",
    get: async ({ get }) => {
      const userToken = get(token);
      if (!userToken) {
        return false;
      }
      try {
        const { data } = await axios.get("/api/me", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        return true;
      } catch (error) {
        return false;
      }
    },
  }),
});

