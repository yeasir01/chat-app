import { useEffect, useState, useCallback } from "react";

const defaultOptions = {
    method: "GET",
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
    },
    body: undefined,
};

const useFetch = (URL = "", OPTIONS = { ...defaultOptions }, DATA = []) => {
    const [response, setResponse] = useState({
        ok: false,
        data: DATA,
        status: undefined,
        statusText: undefined,
        headers: {},
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState(URL);
    const [option, setOption] = useState({...defaultOptions, ...OPTIONS});

    const stringifyData = useCallback((data) => {
        const isFormData = data instanceof FormData;

        if (isFormData) {
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
        (url = "", options = { ...defaultOptions }) => {
            setUrl(url);
            setOption({
                ...defaultOptions,
                ...options,
                body: stringifyData(options.body),
            });
        },
        [stringifyData]
    );

    useEffect(() => {
        if (!url) return;

        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchData() {
            try {
                setIsLoading(true);
                setResponse(null);
                setError(null);
                const res = await fetch(url, { ...option, signal });
                const text = await res.text();
                const data = {
                    ok: res.ok,
                    data: parseToJSON(text),
                    status: res.status,
                    statusText: res.statusText,
                    headers: option?.headers || {},
                };
                if (signal.aborted) return;
                res.ok ? setResponse(data) : setError(data);
            } catch (err) {
                if (signal.aborted) return;
                setError({
                    ok: false,
                    data: err.message,
                    status: 400,
                    statusText: "Bad Request",
                    headers: option.headers || {},
                });
            } finally {
                if (signal.aborted) return;
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
