import { useCallback, useState } from "react";

export const useHttp = () => {
  const [loadingStatus, setLoadingStatus] = useState("pending");
  const token = localStorage.getItem("token");
  
  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    ) => {
      setLoadingStatus("loading");
      try {
        const response = await fetch(url, { method, body, headers });
        if (!response.ok) {
          const errorResponse = await response.json();
          const errorMessage = errorResponse.message;
          throw new Error(errorMessage);
        }
        const data = await response.json();
        return data;
      } catch (e) {
        throw e;
      }
    },
    []
  );

  return {
    token,
    loadingStatus,
    request,
    setLoadingStatus,
  };
};
