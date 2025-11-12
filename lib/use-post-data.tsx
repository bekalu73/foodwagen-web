/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMutation } from "@tanstack/react-query";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosProgressEvent,
} from "axios";
import { toast } from "sonner";
import { useGetHeaders } from "@/hooks/use-get-headers";

type MutationOptions = {
  url: string;
  method: AxiosRequestConfig["method"];
  body?: any;
  headers?: { [key: string]: string };
  onSuccess?: (data: AxiosResponse["data"]) => void;
  onError?: (error: any) => void;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
};
const useDynamicMutation = ({
  type = "Json",
}: {
  type?: "FormData" | "Json";
}) => {
  const header = useGetHeaders({ type });
  const dynamicMutation = useMutation({
    mutationFn: async (options: MutationOptions) => {
      const {
        url,
        method,
        body,
        onUploadProgress,
        onDownloadProgress,
      } = options;
      try {
        // Validate URL to prevent SSRF
        if (!url || typeof url !== 'string') {
          throw new Error('Invalid URL provided');
        }
        
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!baseUrl) {
          throw new Error('API URL not configured');
        }
        
        const response = await axios.request({
          url: `${baseUrl}${url}`,
          method,
          headers: { ...header },
          data: body,
          onUploadProgress,
          onDownloadProgress,
          timeout: 10000, // 10 second timeout
        });
        return response.data;
      } catch (error) {
        console.error('API request failed:', error);
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      if (variables.onSuccess) {
        variables.onSuccess(data);
      }
    },
    onError: (error, variables) => {
      if (variables.onError) {
        variables.onError(error);
      }
      const isString =
        typeof (error as any)?.response?.data?.message === "string";
      if (isString && (error as any)?.response?.data?.message) {
        toast.error(
          isString
            ? (error as any)?.response?.data?.message
            : "Something went wrong"
        );
      }
    },
    retry: false,
  });

  return dynamicMutation;
};

export default useDynamicMutation;
