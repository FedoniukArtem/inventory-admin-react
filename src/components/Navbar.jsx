import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ padding: '15px', background: '#222', display: 'flex', gap: '20px' }}>
            <Link shadow to="/" style={{ color: 'white', textDecoration: 'none' }}>🏠 Галерея</Link>
            <Link to="/favorites" style={{ color: 'white', textDecoration: 'none' }}>⭐ Улюблені</Link>
            <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>🛠 Адмінка</Link>
        </nav>
    );
};

export default Navbar;