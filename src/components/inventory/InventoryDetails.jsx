const InventoryDetails = ({ item }) => {
    if (!item) return null;
    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>{item.inventory_name}</h2>
            <p>{item.description}</p>
            {/* Повне зображення*/}
            <img
                src={`http://localhost:5000/inventory/${item.id}/photo`}
                alt={item.inventory_name}
                style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
            />
        </div>
    );
};
export default InventoryDetails;