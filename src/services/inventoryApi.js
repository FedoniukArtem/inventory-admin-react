import axios from 'axios';

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
        const imageUrl = file ? URL.createObjectURL(file) : 'https://via.placeholder.com/150';

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
        const updatedItem = updatedItems.find(i => i.id === Number(id));
        return { data: updatedItem };
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

        return { data: { photoUrl: imageUrl } };
    },

    delete: async (id) => {
        await delay(300);
        const current = JSON.parse(localStorage.getItem('mock_inventory') || '[]');
        const filtered = current.filter(item => item.id !== id);
        localStorage.setItem('mock_inventory', JSON.stringify(filtered));
        return { success: true };
    }
};