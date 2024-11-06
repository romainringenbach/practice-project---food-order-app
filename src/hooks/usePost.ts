import {useState} from "react";

export function usePost<T,D>(fetchFn: (data: D) => Promise<T>, initialValue: T) {
    const [isPosting, setIsPosting] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [result, setResult] = useState<T>(initialValue);

    const post = (data: D) => {
        async function postDataFn() {
            setIsPosting(true);
            try {
                const d = await fetchFn(data);
                setResult(d);
            } catch (e: unknown) {
                let message: string = "Failed to fetch data.";

                if (typeof e === "string") {
                    message = e;
                } else if (e instanceof Error) {
                    message = e.message;
                }
                setError(message);
            }

            setIsPosting(false);
        }

        postDataFn();
    }

    return {
        post,
        result,
        isPosting,
        error
    };
}