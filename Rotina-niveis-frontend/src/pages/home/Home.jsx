import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState({ level: 1, pontos: 0 });
  const [atividade, setAtividades] = useState([]);
  const [amigos, setAmigos] = useState([]);

  useEffect(() => {
    fetchPerfil();
    fetchAtividades();
    fetchAmigos();
  }, [] );

  async function fetchPerfil() {
    try {
      const response = await fetch("http://localhost:3000/user/perfil", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log("Dados do perfil", data)
      setUser({ nickname: data.user.nickname, level: data.user.level, pontos: data.user.points });
    } catch (error) {
      console.error("Erro ao buscar perfil", error);
    }
  }

  async function fetchAtividades() {
    try {
      const response = await fetch("http://localhost:3000/user/activities", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setAtividades(data);
    } catch (error) {
      console.error("Erro ao buscar atividades", error);
    }
  }

  async function fetchAmigos() {
    try {
      const response = await fetch("http://localhost:3000/user/friends", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const friends = await response.json();
      console.log("Amigos recebidos:", friends)
      setAmigos(friends.map(f => ({
        id: f.id,
        nickname: f.nickname,
        level: f.level,
        points: f.points,
      })));
    } catch (error) {
      console.error("Erro ao buscar amigos", error);
    }
  }
  return (
    <>
    <link rel="preconnect" href="https://fonts.googleapis.com"></link>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
<link href="https://fonts.googleapis.com/css2?family=Edu+AU+VIC+WA+NT+Hand:wght@400..700&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Oxygen:wght@300;400;700&display=swap" rel="stylesheet">
</link>
    <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"></link>
      <div className="background">
        <h1 className="bem-vindo">Bem vindo, {user.nickname}👋 </h1>

        <div className="container-menu">
          <h1>Menu</h1>
          <button id="notificacoes-btn">
            <i className="bx bxs-arrow-from-left"></i>
            Notificações</button>
          <button id="configuracoes-btn">Configurações</button>
          <button id="acessar-perfil-btn">Acessar Perfil Completo</button>
        </div>

        <div className="container-perfil">
  <h1 className="perfil">Perfil</h1>
  <div className="perfil-info">
    <img src="/img/perfil.jpeg" alt="Foto de Perfil" className="perfil-img" />
    <div className="perfil-detalhes">
      <strong>Nível:</strong> {user.level}
      <br />
      <strong>Pontos:</strong> {user.pontos}
    </div>
  </div>
</div>

        <div className="container-estatisticas">
          <h1>Estatisticas</h1>
          <h2>Ver tudo</h2>
          
        </div>

        <div className="recent-activities">
  {Array.from({ length: 3 }).map((_, index) => {
    const atividadeAtual = atividade[index]; // Pega a atividade correspondente

    return (
      <div
        key={index}
        className={`container-recentes ${
          index === 0 ? "top-left" : index === 1 ? "top-center" : "top-right"
        }`}
      >
        {atividadeAtual ? (
          <>
            <h3 className="title">{atividadeAtual.name}</h3>
            <div className="info">
              <p><strong>Classe:</strong> {atividadeAtual.classe}</p>
              <p><strong>Pontos:</strong> {atividadeAtual.points}</p>
              <p><strong>Data:</strong> {new Date(atividadeAtual.date).toLocaleDateString()}</p>
            </div>
          </>
        ) : (
          <p className="no-activities">Nenhuma atividade recente.</p>
        )}
      </div>
    );
  })}
</div>

        <div className="container-amigos">
          <button className="adicionar-amigos-btn">+</button>
          <p className="adicionar-amigo-texto">Add Novo</p>
          <ul id="amigos-lista">
            {amigos.map((amigo) => (
              <li key={amigo.id}>{amigo.nickname}</li>
            ))}
          </ul>
        </div>

        <button className="responsive-button2">Nova Atividate</button>
      </div>
    </>
  );
}

export default App;
