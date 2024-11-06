import {useEffect, useState} from "react";

export function useFetch<T>(fetchFn: () => Promise<T>, initialValue: T) {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [fetchedData, setFetchedData] = useState<T>(initialValue);

    useEffect(() => {
        async function fetchDataFn() {
            setIsFetching(true);
            try {
                const d = await fetchFn();
                setFetchedData(d);
            } catch (e: unknown) {
                let message: string = "Failed to fetch data.";

                if (typeof e === "string") {
                    message = e;
                } else if (e instanceof Error) {
                    message = e.message;
                }
                setError(message);
            }

            setIsFetching(false);
        }

        fetchDataFn();
    }, [fetchFn]);

    return {
        fetchedData,
        isFetching,
        error
    };
}