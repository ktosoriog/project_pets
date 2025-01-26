import { useState, useEffect } from 'react';
import { LoadingService } from '../util/loadingService';
import './LoadingSpinner.css';

export function LoadingSpinner() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = LoadingService.subscribe(setIsLoading);
        return () => unsubscribe();
    }, []);

    if (!isLoading) return null;

    return (
        <div className="loading-overlay">
            <div className="spinner"></div>
        </div>
    );
}