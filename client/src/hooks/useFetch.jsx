import { useEffect, useState } from "react";

export const useFetch = (URL = "", OPTION = {}) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState(URL);
    const [option, setOption] = useState(OPTION);

    const defaultOptions = {
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    };

    const parseData = (data) => {
        const isFormData = data instanceof FormData;
        return isFormData ? data : JSON.parse(data);
    }
    
    const req = {
        get(url = "", opt = {}) {
            setUrl(url);
            setOption({
                ...defaultOptions, 
                ...opt, 
                method: "GET" 
            });
        },
        post(url = "", data = {}, opt = {}) {
            setUrl(url);
            setOption({ 
                ...defaultOptions, 
                ...opt, 
                method: "POST" , 
                body: parseData(data) 
            });
        },
        put(url = "", data = {}, opt = {}) {
            setUrl(url);
            setOption({ 
                ...defaultOptions, 
                ...opt, 
                method: "PUT" , 
                body: parseData(data) 
            });
        },
        delete(url = "", opt = {}) {
            setOption({
                ...defaultOptions, 
                ...opt, 
                method: "DELETE" 
            });
        },
    };

    useEffect(() => {
        if (!url) return;

        const controller = new AbortController();
        const signal = controller.signal;

        fetch(url, { ...option, signal })
            .then((res) => res.json())
            .then((json) => setResponse(json))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [url, option]);

    return { response, error, loading, req };
};