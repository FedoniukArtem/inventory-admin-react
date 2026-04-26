import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';

const AdminInventoryDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItem = async () => {
            const res = await inventoryApi.getById(id);
            setItem(res.data.data);
            setLoading(false);
        };
        fetchItem();
    }, [id]);

    if (loading) return <p>Завантаження...</p>;
    if (!item) return <p>Елемент не знайдено</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <button onClick={() => navigate('/admin')}>← Назад до списку</button>
            <h1>{item.inventory_name}</h1>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <img
                    src={item.photoUrl || 'https://via.placeholder.com/300'}
                    alt={item.inventory_name}
                    style={{ width: '300px', borderRadius: '8px' }}
                />
                <div>
                    <h3>Опис:</h3>
                    <p>{item.description || 'Опис відсутній'}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminInventoryDetails;