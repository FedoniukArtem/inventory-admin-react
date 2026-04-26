import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';

const AdminInventoryEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        inventoryApi.getById(id).then(res => {
            setName(res.data.inventory_name);
            setDescription(res.data.description);
        });
    }, [id]);

    // Частина 1: Оновлення тексту (JSON) 
    const handleUpdateText = async (e) => {
        e.preventDefault();
        try {
            await inventoryApi.updateText(id, { inventory_name: name, description });
            alert('Текст оновлено!');
        } catch (err) { alert('Помилка оновлення тексту'); }
    };

    // Частина 2: Оновлення фото (Multipart)
    const handleUpdatePhoto = async () => {
        if (!file) return alert('Виберіть файл!');
        const formData = new FormData();
        formData.append('photo', file);
        try {
            await inventoryApi.updatePhoto(id, formData);
            alert('Фото оновлено!');
            window.location.reload(); // Перевантажимо, щоб побачити нове фото
        } catch { alert('Помилка оновлення фото'); }
    };

    return (
        <div>
            <h1>Редагування</h1>
            <button onClick={() => navigate('/admin')}>Назад</button>

            <form onSubmit={handleUpdateText} style={{ marginTop: '20px' }}>
                <h3>Текстові дані</h3>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
                <button type="submit">Оновити текст</button>
            </form>

            <div style={{ marginTop: '30px', padding: '10px', border: '1px solid #ccc' }}>
                <h3>Змінити фото</h3>
                <input type="file" onChange={e => setFile(e.target.files[0])} />
                <button onClick={handleUpdatePhoto}>Завантажити нове фото</button>
            </div>
        </div>
    );
};

export default AdminInventoryEdit;