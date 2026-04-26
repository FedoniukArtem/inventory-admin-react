import { useEffect } from 'react';
import { useInventory } from '../store/InventoryContext';
import InventoryCard from '../components/gallery/InventoryCard';

const Gallery = () => {
    const { inventory, loading, error, refreshInventory } = useInventory();

    useEffect(() => {
        refreshInventory(); // Завантажуємо актуальні дані з localStorage
    }, []);

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Завантаження галереї...</div>;
    if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Галерея інвентарю</h1>

            {inventory.length === 0 ? (
                <p style={{ textAlign: 'center' }}>Склад порожній. Додайте товари в адмінці.</p>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '25px',
                    padding: '10px'
                }}>
                    {inventory.map(item => (
                        <InventoryCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Gallery;