import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inventoryApi } from '../../services/inventoryApi';
import { useInventory } from '../../store/InventoryContext';
import ConfirmModal from './ConfirmModal';

const InventoryTable = ({ items }) => {
    const navigate = useNavigate();
    const { setInventory } = useInventory();
    const [modal, setModal] = useState({ open: false, id: null });

    const handleDelete = async () => {
        try {
            await inventoryApi.delete(modal.id);
            setInventory(prev => prev.filter(item => item.id !== modal.id));
            setModal({ open: false, id: null });
        } catch {
            alert('Помилка видалення');
        }
    };

    return (
        <>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }} border="1">
                <thead>
                    <tr>
                        <th>Фото</th>
                        <th>Назва</th>
                        <th>Опис</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td style={{ textAlign: 'center', padding: '10px' }}>
                                <img
                                    src={item.photoUrl || 'https://via.placeholder.com/50'}
                                    width="50"
                                    height="50"
                                    style={{ objectFit: 'cover', borderRadius: '4px' }}
                                    alt={item.inventory_name}
                                />
                            </td>
                            <td style={{ padding: '10px' }}>{item.inventory_name}</td>
                            <td style={{ padding: '10px' }}>{item.description}</td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>
                                <button onClick={() => navigate(`/admin/details/${item.id}`)}>Перегляд</button>
                                <button onClick={() => navigate(`/admin/edit/${item.id}`)}>Редагувати</button>
                                <button onClick={() => setModal({ open: true, id: item.id })} style={{ color: 'red' }}>Видалити</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {items.length === 0 && (
                <p style={{ textAlign: 'center', marginTop: '20px' }}>Інвентар порожній</p>
            )}

            <ConfirmModal
                isOpen={modal.open}
                onClose={() => setModal({ open: false, id: null })}
                onConfirm={handleDelete}
                message="Ви впевнені, що хочете видалити цей елемент?"
            />
        </>
    );
};

export default InventoryTable;