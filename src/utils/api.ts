import axios, { type AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  withCredentials: true,
});

const requestConfig = (): AxiosRequestConfig => ({
  headers: {
    Authorization:
      typeof window === "undefined" ? "" : localStorage.getItem("USER") || "",
  },
});

export const getAuthToken = (): string => {
  if (typeof window === "undefined") return "";
  const value = localStorage.getItem("USER") || "";
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === "string" ? parsed : value;
  } catch {
    return value.replace(/^Bearer\s+/i, "");
  }
};

export const getWebSocketUrl = (path: string): string => {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  return `${base.replace(/^http/, "ws").replace(/\/$/, "")}${path}`;
};

export const getApiErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  if (!axios.isAxiosError(error)) return fallback;
  const detail = error.response?.data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((item) =>
        typeof item?.msg === "string"
          ? item.msg.replace(/^Value error, /, "")
          : "",
      )
      .filter(Boolean)
      .join(" ");
  }
  return fallback;
};

export const GET = async <T = any>(
  url: string,
  params: Record<string, unknown> = {},
): Promise<T> => {
  const response = await api.get<T>(url, { ...requestConfig(), params });
  return response.data;
};

export const POST = async <T = any>(
  url: string,
  body?: unknown,
): Promise<T> => {
  const response = await api.post<T>(url, body, requestConfig());
  return response.data;
};

export const PUT = async <T = any>(url: string, body?: unknown): Promise<T> => {
  const response = await api.put<T>(url, body, requestConfig());
  return response.data;
};

export const DELETE = async <T = any>(
  url: string,
  body?: unknown,
): Promise<T> => {
  const response = await api.delete<T>(url, {
    ...requestConfig(),
    data: body,
  });
  return response.data;
};
