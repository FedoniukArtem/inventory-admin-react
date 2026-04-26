import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import { useInventory } from '../store/InventoryContext';
import InventoryForm from '../components/inventory/InventoryForm';

const AdminInventoryEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setInventory } = useInventory();
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            const res = await inventoryApi.getById(id);
            if (res.data.data) {
                setInitialData(res.data.data);
            }
        };
        fetchItem();
    }, [id]);

    const handleUpdate = async (formData) => {
        try {
            // 1. Оновлюємо текст
            const updatedText = {
                inventory_name: formData.get('inventory_name'),
                description: formData.get('description')
            };
            await inventoryApi.updateText(id, updatedText);

            // 2. Оновлюємо фото, якщо вибрано новий файл
            const photoFile = formData.get('photo');
            let newPhotoUrl = initialData.photoUrl;

            if (photoFile && photoFile.size > 0) {
                const photoData = new FormData();
                photoData.append('photo', photoFile);
                const resPhoto = await inventoryApi.updatePhoto(id, photoData);
                newPhotoUrl = resPhoto.data.photoUrl;
            }

            // 3. Оновлюємо глобальний стан
            setInventory(prev => prev.map(item =>
                item.id === Number(id)
                    ? { ...item, ...updatedText, photoUrl: newPhotoUrl }
                    : item
            ));

            alert('Дані та фото успішно оновлено!');
            navigate('/admin');
        } catch (error) {
            console.error(error);
            alert('Помилка при оновленні');
        }
    };

    if (!initialData) return <p>Завантаження...</p>;

    return (
        <div>
            <h1>Редагувати позицію</h1>
            <InventoryForm
                onSubmit={handleUpdate}
                initialData={initialData}
                isEdit={true}
            />
        </div>
    );
};

export default AdminInventoryEdit;