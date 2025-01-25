import { createContext, useState, useContext, ReactNode, useMemo } from 'react';

type AlertType = 'success' | 'error';

type AlertContextType = {
    alertMessage: string | null;
    alertType: AlertType | null;
    showAlert: (msg: string, type?: AlertType) => void;
    clearAlert: () => void;
};

const AlertContext = createContext<AlertContextType>({
    alertMessage: null,
    alertType: null,
    showAlert: () => { },
    clearAlert: () => { },
});

export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<AlertType | null>(null);

    const showAlert = (msg: string, type: AlertType = 'error') => {
        setAlertMessage(msg);
        setAlertType(type);
        setTimeout(() => {
            clearAlert();
        }, 5000);
    };

    const clearAlert = () => {
        setAlertMessage(null);
        setAlertType(null);
    };

    const contextValue = useMemo(
        () => ({ alertMessage, alertType, showAlert, clearAlert }),
        [alertMessage, alertType]
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