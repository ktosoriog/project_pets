import React from 'react';
import './Modal.css';

interface ModalProps {
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

function Modal({ onClose, title, children }: ModalProps) {
    return (
        <div className="modal-overlay">
            <div className="modal-backdrop" onClick={onClose}></div>
            <div className="modal-container">
                <h2>{title}</h2>
                {children}
            </div>
        </div>
    );
}

export default Modal;
