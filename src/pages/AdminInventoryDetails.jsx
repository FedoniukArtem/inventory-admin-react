import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';

const AdminInventoryDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);

    useEffect(() => {
        inventoryApi.getById(id).then(res => setItem(res.data));
    }, [id]);

    if (!item) return <div>Завантаження...</div>;

    return (
        <div>
            <button onClick={() => navigate('/admin')}>← Назад</button>
            <h1>{item.inventory_name}</h1>
            <p><strong>Опис:</strong> {item.description}</p>
            <div className="image-container">
                <p><strong>Повне зображення:</strong></p>
                <img
                    src={item.photoUrl || 'https://via.placeholder.com/150'}
                    alt={item.inventory_name}
                    style={{ maxWidth: '100%', borderRadius: '8px' }}
                />
            </div>
        </div>
    );
};

export default AdminInventoryDetails;