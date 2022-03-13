import { useEffect, useState } from "react";

export const useFetch = (URL = "", OPTION = {}) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState(URL);
    const [option, setOption] = useState(OPTION);

    const commonHeaders = {
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    };

    const stringifyData = (data) => {
        const isFormData = data instanceof FormData;
        return isFormData ? data : JSON.stringify(data);
    }

    const parseToJSON = (data) => {
        try {
            return JSON.parse(data);
        } catch (_) {
            return data;
        }
    }
    
    const request = {
        get(url = "", opt = {}) {
            setUrl(url);
            setOption({
                ...commonHeaders, 
                ...opt, 
                method: "GET" 
            });
        },
        post(url = "", data = {}, opt = {}) {
            setUrl(url);
            setOption({ 
                ...commonHeaders, 
                ...opt, 
                method: "POST" , 
                body: stringifyData(data) 
            });
        },
        put(url = "", data = {}, opt = {}) {
            setUrl(url);
            setOption({ 
                ...commonHeaders, 
                ...opt, 
                method: "PUT" , 
                body: stringifyData(data) 
            });
        },
        delete(url = "", opt = {}) {
            setOption({
                ...commonHeaders, 
                ...opt, 
                method: "DELETE" 
            });
        },
    };

    useEffect(() => {
        if (!url) return;
        
        const controller = new AbortController();
        const signal = controller.signal;

        async function callAPI(){
            try {
                setResponse(null);
                setError(null);
                setLoading(true);
                const res = await fetch(url, {...option, signal});
                const text = await res.text();
                const data = parseToJSON(text);
                res.ok ? setResponse(data): setError(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        callAPI();

        return () => controller.abort();
    }, [url, option]);

    return {response, error, loading, request};
};