import { useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import { useInventory } from '../store/InventoryContext';
import InventoryForm from '../components/inventory/InventoryForm';

const AdminInventoryCreate = () => {
    const navigate = useNavigate();
    const { setInventory } = useInventory();

    const handleCreate = async (formData) => {
        try {
            const res = await inventoryApi.create(formData);
            setInventory(prev => [...prev, res.data]);
            navigate('/admin');
        } catch {
            alert('Помилка створення');
        }
    };

    return (
        <div>
            <h1>Нова позиція</h1>
            <InventoryForm onSubmit={handleCreate} />
        </div>
    );
};

export default AdminInventoryCreate;