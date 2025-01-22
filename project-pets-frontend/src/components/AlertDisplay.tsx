import { useAlert } from '../context/AlertContext';

function AlertDisplay() {

    const { alertMessage, clearAlert } = useAlert();

    if (!alertMessage) return null; // si no hay alerta, no renderiza

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#f44336',
            color: '#fff',
            padding: '1rem',
            borderRadius: '4px',
            zIndex: 9999
        }}>
            {alertMessage}
            <button
                onClick={clearAlert}
                style={{
                    marginLeft: '10px',
                    background: 'transparent',
                    border: '1px solid #fff',
                    cursor: 'pointer',
                    color: '#fff'
                }}
            >
                X
            </button>
        </div>
    );
}

export default AlertDisplay;
