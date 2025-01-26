import { useAlert } from '../context/AlertContext';

function AlertDisplay() {

    const { alertMessage, alertType, clearAlert } = useAlert();

    if (!alertMessage) return null;

    const backgroundColor = alertType === 'success' ? '#4CAF50' : '#f44336';

    return (
        <div
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                backgroundColor,
                color: '#fff',
                padding: '1rem',
                borderRadius: '4px',
                zIndex: 9999,
                minWidth: '200px',
            }}
        >
            {alertMessage}
            <button
                onClick={clearAlert}
                style={{
                    marginLeft: '10px',
                    background: 'transparent',
                    border: '1px solid #fff',
                    cursor: 'pointer',
                    color: '#fff',
                    float: 'right',
                }}
            >
                X
            </button>
        </div>
    );
}

export default AlertDisplay;
