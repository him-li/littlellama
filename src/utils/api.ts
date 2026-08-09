import axios, { type AxiosRequestConfig } from 'axios';

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
	withCredentials: true,
});

const requestConfig = (): AxiosRequestConfig => ({
	headers: {
		Authorization:
			typeof window === 'undefined' ? '' : localStorage.getItem('USER') || '',
	},
});

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

export const PUT = async <T = any>(
	url: string,
	body?: unknown,
): Promise<T> => {
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
