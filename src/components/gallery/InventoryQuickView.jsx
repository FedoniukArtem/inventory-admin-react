const InventoryQuickView = ({ item, onClose }) => {
    if (!item) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: '#fff',
                padding: '30px',
                borderRadius: '15px',
                maxWidth: '800px',
                width: '100%',
                position: 'relative',
                display: 'flex',
                gap: '30px',
                flexWrap: 'wrap'
            }} onClick={e => e.stopPropagation()}>
                <button onClick={onClose} style={{
                    position: 'absolute', top: '10px', right: '15px',
                    border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer'
                }}>×</button>

                <img
                    src={item.photoUrl || 'https://via.placeholder.com/400'}
                    style={{ width: '100%', maxWidth: '350px', borderRadius: '10px', objectFit: 'cover' }}
                    alt={item.inventory_name}
                />

                <div style={{ flex: '1', minWidth: '300px' }}>
                    <h2 style={{ marginTop: 0 }}>{item.inventory_name}</h2>
                    <hr />
                    <h4>Опис:</h4>
                    <p style={{ lineHeight: '1.6', color: '#444' }}>{item.description}</p>
                </div>
            </div>
        </div>
    );
};

export default InventoryQuickView;