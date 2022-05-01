import { useEffect, useState, useCallback } from "react";

const initialConfig = {
    method: "GET",
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
    },
    body: undefined,
};

const initialState = (data) => {
    return {
        ok: false,
        data: data,
        status: undefined,
        statusText: undefined,
        headers: {},
    };
};

const useFetch = (URL = "", CONFIG = { ...initialConfig }, INITIAL_DATA = []) => {
    const [response, setResponse] = useState(initialState(INITIAL_DATA));
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState(URL);
    const [option, setOption] = useState({ ...initialConfig, ...CONFIG });

    const stringifyData = useCallback((data) => {
        if (!data) {
            return undefined;
        }

        if (data instanceof FormData) {
            return data;
        }

        return JSON.stringify(data);
    }, []);

    const parseToJSON = useCallback((data) => {
        try {
            return JSON.parse(data);
        } catch (_) {
            return data;
        }
    }, []);

    const request = useCallback(
        (url = "", config = { ...initialConfig }, initialData = []) => {
            setResponse(initialState(initialData));
            setError(null);
            setUrl(url);
            setOption({
                ...initialConfig,
                ...config,
                body: stringifyData(config.body),
            });
        },
        [stringifyData]
    );

    useEffect(() => {
        if (!url) return;

        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchData() {
            setIsLoading(true);
            try {
                const res = await fetch(url, { ...option, signal });
                const text = await res.text();
                const data = {
                    ok: res.ok,
                    data: parseToJSON(text),
                    status: res.status,
                    statusText: res.statusText,
                    headers: option?.headers || {},
                };

                res.ok ? setResponse(data) : setError(data);
            } catch (err) {
                setError({
                    ok: false,
                    data: err.message,
                    status: 400,
                    statusText: "Bad Request",
                    headers: option.headers || {},
                });
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();

        return () => controller.abort();
    }, [url, option, parseToJSON]);

    return {
        response,
        error,
        isLoading,
        request,
    };
};

export default useFetch;
