import { useState } from 'react';
import { useFavorites } from '../../hooks/useFavorites';
import InventoryQuickView from './InventoryQuickView'; // Імпортуємо модалку

const InventoryCard = ({ item }) => {
    const { toggleFavorite, isFavorite } = useFavorites();
    const [isModalOpen, setModalOpen] = useState(false); // Стан для відкриття модалки
    const favorite = isFavorite(item.id);

    return (
        <>
            <div
                style={{
                    border: '1px solid #ddd',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onClick={() => setModalOpen(true)} // Відкриваємо модалку при кліку на будь-яке місце картки
            >
                <div style={{ position: 'relative' }}>
                    <img
                        src={item.photoUrl || 'https://via.placeholder.com/250'}
                        alt={item.inventory_name}
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // ВАЖЛИВО: щоб при натисканні на зірочку не відкривалася модалка
                            toggleFavorite(item);
                        }}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '35px',
                            height: '35px',
                            cursor: 'pointer',
                            fontSize: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                    >
                        {favorite ? '⭐' : '☆'}
                    </button>
                </div>

                <div style={{ padding: '15px' }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{item.inventory_name}</h3>
                    <p style={{
                        color: '#666',
                        fontSize: '14px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {item.description}
                    </p>
                    <button
                        style={{
                            marginTop: '15px',
                            width: '100%',
                            padding: '8px',
                            borderRadius: '6px',
                            border: '1px solid #007bff',
                            background: 'transparent',
                            color: '#007bff',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Детальніше
                    </button>
                </div>
            </div>

            {/* Рендеримо модальне вікно тільки якщо стан true */}
            {isModalOpen && (
                <InventoryQuickView
                    item={item}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </>
    );
};

export default InventoryCard;