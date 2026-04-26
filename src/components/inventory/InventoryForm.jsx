import { useState } from 'react';

const InventoryForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
    const [name, setName] = useState(initialData.inventory_name || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Валідація обов'язкових полів 
        if (!name.trim()) return alert('Назва обов’язкова!');

        const formData = new FormData();
        formData.append('inventory_name', name);
        formData.append('description', description);
        if (file) formData.append('photo', file);

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
            <label>
                Назва*:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>

            <label>
                Опис:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>

            <label>
                Фото:
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
            </label>

            <button type="submit">{isEdit ? 'Зберегти зміни' : 'Створити'}</button>
        </form>
    );
};

export default InventoryForm;