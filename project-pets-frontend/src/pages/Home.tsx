import Header from '../components/Header';
import './Home.css';

function Home() {
    return (
        <>
            <Header />
            <div className="home-container">
                <h1>Bienvenido a Project Pets</h1>
                <p>Aquí puedes manejar tus servicios, citas y más.</p>
            </div>
        </>
    );
}

export default Home;
