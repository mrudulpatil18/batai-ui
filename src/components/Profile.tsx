import { Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';


function Profile() {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    }

    return (
        <Container>
            <h1>Profile</h1>
            <p>Welcome, {user?.username}!</p>
            <button onClick={handleLogout}>Logout</button>
        </Container>
    );
}


export default Profile;