import React from "react";
import { Link } from "react-router-dom";

import './styles.css'
import logoApp from '../../assets/home.png';

function Home() {
    return (
        <div>
            <div className="header">
                <h2>Bem-vindo ao FutBrasil – O Seu Portal do Brasileirão! </h2>
            </div>
            <div className="home-container">
                <section>
                    <p>Aqui você encontra tudo sobre os times que fazem a paixão do futebol brasileiro!</p>
                    <p>Fique por dentro das últimas notícias, escalações, estatísticas, análises de jogos e muito mais.</p>
                    <p>Acompanhe de perto o desempenho do seu time do coração e dos seus rivais, 
                        com conteúdos atualizados, curiosidades e debates sobre os campeonatos mais emocionantes do Brasil.
                    </p>
                    <p>Seja você um torcedor fanático ou apenas um amante do bom futebol,
                            este é o seu espaço para viver a emoção do Brasileirão!
                    </p>
                    <Link to="/teams">Ver times</Link>
                </section>
                <img src={logoApp} alt="Logo APP" />
            </div>
            
        </div>
    );
}

export default Home;