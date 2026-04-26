import { useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import InventoryForm from '../components/inventory/InventoryForm';

const AdminInventoryCreate = () => {
    const navigate = useNavigate();

    const handleCreate = async (formData) => {
        try {
            await inventoryApi.create(formData);
            navigate('/admin'); // Повертаємось до списку після успіху
        } catch (err) {
            alert('Помилка при створенні');
        }
    };

    return (
        <div>
            <h1>Додати нову позицію</h1>
            <button onClick={() => navigate('/admin')}>Назад</button>
            <InventoryForm onSubmit={handleCreate} />
        </div>
    );
};

export default AdminInventoryCreate;