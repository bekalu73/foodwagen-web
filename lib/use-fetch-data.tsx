/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { signOut } from "next-auth/react";
import { EventEmitter } from "events";
import { toast } from "sonner";
import { useGetHeaders } from "@/hooks/use-get-headers";

export const sessionEventEmitter = new EventEmitter();
interface Header extends AxiosRequestConfig {
  headers: {
    "Content-Type": string;
    Accept: string;
    Authorization: string;
  };
}
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      if (error.response.status === 403 || error.response.status === 401) {
        if (error.response.status === 403) {
          toast.error("Insufficient Permissions!");
        } else {
          toast.error("Session Expired!");
        }

        await signOut({ redirect: true, callbackUrl: "/" });
      }
    }
    return Promise.reject(error);
  }
);

export const useFetchData = (
  queryKey: (string | number | boolean | undefined | null | any)[],
  url: string,
  headers?: Header["headers"] | any,
  enabled?: boolean
) => {
  const header = useGetHeaders({});
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}${url}`,
          { headers: headers ?? header }
        );
        return response.data;
      } catch (error: any) {
        if (error?.response?.data?.message)
          toast.error(error?.response?.data?.message);
      }
    },
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
    // retry: true,
    enabled: enabled,
  });
};
