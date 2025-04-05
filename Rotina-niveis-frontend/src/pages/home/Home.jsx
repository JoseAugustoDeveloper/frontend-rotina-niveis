import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState({ level: 1, pontos: 0 });
  const [setAtividades] = useState([]);
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
      setUser({ level: data.user.level, pontos: data.user.points });
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
    <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"></link>
      <div className="background">
        <h1 className="bem-vindo">Bem vindo, Mihawk </h1>

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
          <br />
          <br />
          <br />
        <div>
        <strong>Nível:</strong> {user.level}
        <br />  
        <br />
        <strong>Pontos:</strong> {user.pontos}
        </div>
           
          
        </div>

        <div className="container-estatisticas">
          <h1 className="estatisticas">Estatisticas</h1>
          <canvas id="grafico-progresso"></canvas>
        </div>

        <div className="recent-activities">
  {setAtividades.length > 0 ? (
    setAtividades.slice(0, 3).map((atividade, index) => (
      <div key={atividade._id} className={`container-recentes ${index === 0 ? "top-left" : index === 1 ? "top-center" : "top-right"}`}>
        <div>{atividade.name}</div>
        <br />
        <div>
          Categoria: {atividade.category}
          <br />
          <br />
          Pontos: {atividade.points}
          <br />
          <br />
          Data: {new Date(atividade.date).toLocaleDateString()}
        </div>
      </div>
    ))
  ) : (
    <>
      <div className="container-recentes top-left">
        <div>Sem atividade recente</div>
      </div>
      <div className="container-recentes top-center">
        <div>Sem atividade recente</div>
      </div>
      <div className="container-recentes top-right">
        <div>Sem atividade recente</div>
      </div>
    </>
  )}
</div>

        <div className="container-amigos">
          <button className="adicionar-amigos-btn">+</button>
          <h1>Amigos</h1>
          <ul id="amigos-lista">
            {amigos.map((amigo) => (
              <li key={amigo._id}>{amigo.nickname}</li>
            ))}
          </ul>
        </div>

        <button className="responsive-button2">Nova Atividate</button>
      </div>
    </>
  );
}

export default App;
