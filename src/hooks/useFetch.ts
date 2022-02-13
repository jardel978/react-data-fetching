import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: 'https://api.github.com'
});

// PARA REQUISIÇÃO GET
// hook tipado com generics para receber qualquer tipo para a chamada api
export function useFetch<T = unknown>(url: string, options?: AxiosRequestConfig) {

    const [data, setData] = useState<T | null>(null);
    const [isFetching, setIsFetching] = useState(true);// estado que diz se está ou já terminou a chamada 
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        api.get(url, options)
            .then(response => {
                setData(response.data)
            })
            .catch(err => {
                setError(err);
            })
            .finally(() => {
                setIsFetching(false)
            })
    }, [])

    return { data, isFetching, error }
}