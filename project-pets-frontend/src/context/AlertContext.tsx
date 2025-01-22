import { createContext, useState, useContext, ReactNode, useMemo } from 'react';

type AlertContextType = {
    alertMessage: string | null;
    showAlert: (msg: string) => void;
    clearAlert: () => void;
};

const AlertContext = createContext<AlertContextType>({
    alertMessage: null,
    showAlert: () => { },
    clearAlert: () => { },
});

export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    const showAlert = (msg: string) => {
        setAlertMessage(msg);
    };

    const clearAlert = () => {
        setAlertMessage(null);
    };

    const contextValue = useMemo(
        () => ({ alertMessage, showAlert, clearAlert }),
        [alertMessage]
    );

    return (
        <AlertContext.Provider value={contextValue}>
            {children}
        </AlertContext.Provider>
    );
};

export function useAlert() {
    return useContext(AlertContext);
}
