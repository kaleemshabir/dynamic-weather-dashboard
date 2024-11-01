import { useState, useEffect, useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";

type UseApiResponse<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  fetchData: (config?: AxiosRequestConfig) => void;
};

const useApi = <T>(initialConfig: AxiosRequestConfig): UseApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    async (config: AxiosRequestConfig = {}) => {
      setIsLoading(true);
      setError(null);

      try {
        const source = axios.CancelToken.source();
        const response = await axios({
          ...initialConfig,
          ...config,
          cancelToken: source.token,
        });
        setData(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "An error occurred");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [initialConfig]
  );

  useEffect(() => {
    if (initialConfig.url) {
      fetchData();
    }
  }, [initialConfig.url, fetchData]);

  return { data, error, isLoading, fetchData };
};

export default useApi;
