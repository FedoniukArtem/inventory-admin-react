const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
                <p>{message}</p>
                <button onClick={onConfirm} style={{ background: 'red', color: 'white' }}>Так, видалити</button>
                <button onClick={onClose}>Скасувати</button>
            </div>
        </div>
    );
};

export default ConfirmModal;