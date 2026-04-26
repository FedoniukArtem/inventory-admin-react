import { useFavorites } from '../hooks/useFavorites';
import InventoryCard from '../components/gallery/InventoryCard';

const Favorites = () => {
    const { favorites } = useFavorites();

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>⭐ Ваші улюблені</h1>

            {favorites.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <p>Ви ще нічого не додали до улюблених.</p>
                    <a href="/" style={{ color: '#007bff' }}>Повернутися до галереї</a>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '25px'
                }}>
                    {favorites.map(item => (
                        <InventoryCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;