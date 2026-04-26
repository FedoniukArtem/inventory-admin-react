import axios from 'axios';

// Імітація затримки сервера
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const inventoryApi = {
    getAll: async () => {
        await delay(300);
        const data = JSON.parse(localStorage.getItem('mock_inventory') || '[]');
        return { data: { data: data } };
    },

    getById: async (id) => {
        await delay(200);
        const items = JSON.parse(localStorage.getItem('mock_inventory') || '[]');
        const item = items.find(i => i.id === Number(id));
        return { data: { data: item } };
    },

    create: async (formData) => {
        await delay(500);
        const file = formData.get('photo');
        const imageUrl = file ? URL.createObjectURL(file) : null;

        const newItem = {
            id: Date.now(),
            inventory_name: formData.get('inventory_name'),
            description: formData.get('description'),
            photoUrl: imageUrl
        };

        const current = JSON.parse(localStorage.getItem('mock_inventory') || '[]');
        localStorage.setItem('mock_inventory', JSON.stringify([...current, newItem]));
        return { data: newItem };
    },

    updateText: async (id, updatedData) => {
        await delay(300);
        const items = JSON.parse(localStorage.getItem('mock_inventory') || '[]');
        const updatedItems = items.map(item =>
            item.id === Number(id) ? { ...item, ...updatedData } : item
        );
        localStorage.setItem('mock_inventory', JSON.stringify(updatedItems));
        return { success: true };
    },

    updatePhoto: async (id, formData) => {
        await delay(500);
        const file = formData.get('photo');
        const imageUrl = file ? URL.createObjectURL(file) : null;

        const items = JSON.parse(localStorage.getItem('mock_inventory') || '[]');
        const updatedItems = items.map(item =>
            item.id === Number(id) ? { ...item, photoUrl: imageUrl } : item
        );
        localStorage.setItem('mock_inventory', JSON.stringify(updatedItems));
        return { success: true };
    },

    delete: async (id) => {
        await delay(300);
        const current = JSON.parse(localStorage.getItem('mock_inventory') || '[]');
        const filtered = current.filter(item => item.id !== id);
        localStorage.setItem('mock_inventory', JSON.stringify(filtered));
        return { success: true };
    }
};