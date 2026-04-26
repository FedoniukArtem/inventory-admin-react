import { useNavigate } from 'react-router-dom';
import { inventoryApi } from '../../services/inventoryApi';
import { useInventory } from '../../store/InventoryContext';

const InventoryTable = ({ items }) => {
    const navigate = useNavigate();
    const { setInventory } = useInventory();

    const handleDelete = async (id) => {
        // Тут в ідеалі має бути ConfirmModal, але для тесту зробимо window.confirm
        if (window.confirm('Ви впевнені, що хочете видалити цей елемент?')) {
            try {
                await inventoryApi.delete(id);
                // Оновлюємо локальний стан, щоб елемент зник зі списку [cite: 101]
                setInventory(prev => prev.filter(item => item.id !== id));
            } catch (err) {
                alert('Помилка при видаленні');
            }
        }
    };

    return (
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
                <tr>
                    <th>Фото</th>
                    <th>Назва</th>
                    <th>Опис</th>
                    <th>Дії</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>
                            {/* Відображення прев'ю фото [cite: 57] */}
                            <img
                                src={`http://localhost:5000/inventory/${item.id}/photo`}
                                alt={item.inventory_name}
                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            />
                        </td>
                        <td>{item.inventory_name}</td>
                        <td>{item.description}</td>
                        <td>
                            <button onClick={() => navigate(`/admin/details/${item.id}`)}>Переглянути</button>
                            <button onClick={() => navigate(`/admin/edit/${item.id}`)}>Редагувати</button>
                            <button onClick={() => handleDelete(item.id)} style={{ color: 'red' }}>Видалити</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default InventoryTable;