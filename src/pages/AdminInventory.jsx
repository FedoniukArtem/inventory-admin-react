import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import { useInventory } from '../store/InventoryContext';
import InventoryTable from '../components/inventory/InventoryTable.jsx';

const AdminInventory = () => {
    const { inventory, setInventory, loading, setLoading, error, setError } = useInventory();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await inventoryApi.getAll();
                setInventory(response.data);
                setError(null);
            } catch {
                setError('Не вдалося завантажити дані');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [setInventory, setLoading, setError]);

    if (loading) return <div>Завантаження...</div>; // Стан loading 
    if (error) return <div style={{ color: 'red' }}>{error}</div>; // Стан error 

    return (
        <div>
            <h1>Адмін-панель інвентарю</h1>
            <Link to="/admin/create">
                <button style={{ marginBottom: '20px' }}>Додати нову позицію</button>
            </Link>

            {inventory.length === 0 ? (
                <p>Інвентар порожній</p> // Стан empty 
            ) : (
                <InventoryTable items={inventory} />
            )}
        </div>
    );
};

export default AdminInventory;