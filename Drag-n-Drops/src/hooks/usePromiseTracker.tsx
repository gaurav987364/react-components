import { useState, useEffect, useCallback } from 'react';

interface UsePromiseTrackerResult<T> {
    progress: number;
    results: T[];
    error: Error | null;
}

const usePromiseTracker = <T,>(promises: Promise<T>[]): UsePromiseTrackerResult<T> => {
    const [progress, setProgress] = useState<number>(0);
    const [results, setResults] = useState<T[]>([]);
    const [error, setError] = useState<Error | null>(null);

    const trackPromises = useCallback(async () => {
        let completed = 0;

        const updateProgress = (increment: number) => {
            completed += increment;
            setProgress((completed / promises.length) * 100);
        };

        try {
            const results = await Promise.all(
                promises.map((promise) =>
                    promise.then((result) => {
                        updateProgress(1);
                        return result;
                    })
                )
            );
            setResults(results);
        } catch (err) {
            setError(err as Error);
        }
    }, [promises]);

    useEffect(() => {
        trackPromises();
    }, [trackPromises]);

    return { progress, results, error };
};

export default usePromiseTracker;