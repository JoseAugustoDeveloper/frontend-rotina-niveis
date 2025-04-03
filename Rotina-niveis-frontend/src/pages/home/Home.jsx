import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState({ nivel: 1, pontos: 0 });
  const [atividades, setAtividades] = useState([]);
  const [amigos, setAmigos] = useState([]);

  useEffect(() => {
    fetchPerfil();
    fetchAtividades();
    fetchAmigos();
  }, []);

  async function fetchPerfil() {
    try {
      const response = await fetch("http://localhost:3000/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setUser({ nivel: data.level, pontos: data.points });
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
      const data = await response.json();
      setAmigos(data);
    } catch (error) {
      console.error("Erro ao buscar amigos", error);
    }
  }
  return (
    <>
      <div className="background">
        <h1 className="bem-vindo">Bem vindo, </h1>

        <div className="side-panel">
          <h1>Menu</h1>
          <button id="notificacoes-btn">Notificações</button>
          <button id="configuracoes-btn">Configurações</button>
          <button id="acessar-perfil-btn">Acessar Perfil Completo</button>
        </div>

        <div className="small-box">
          <h1 className="perfil">Perfil</h1>
          <br />
          <br />
          <br />
        <div>
        <strong>Nível:</strong> {user.nivel}
        <br />  
        <br />
        <strong>Pontos:</strong> {user.pontos}
        </div>
           
          
        </div>

        <div className="medium-box">
          <h1 className="estatisticas">Estatisticas</h1>
          <canvas id="grafico-progresso"></canvas>
        </div>

        <div className="long-box top-left">
          <div>Nome da atividade</div>
          <br />
          <div>
            Categoria: 
            <br />
            <br />
            Pontos:
            <br />
            <br />
            Data:
          </div>
          <ul>
            {atividades.map((atividade) => (
              <li key={atividade._id}>
                {atividade.name} - {atividade.points} pontos
              </li>
            ))}
          </ul>
        </div>

        <div className="long-box top-center">
          <div>Nome da atividade</div>
          <br />
          <div>
            Categoria: 
            <br />
            <br />
            Pontos:
            <br />
            <br />
            Data:
          </div>
        </div>

        <div className="long-box top-right">
          <div>Nome da atividade</div>
          <br />
          <div>
            Categoria: 
            <br />
            <br />
            Pontos:
            <br />
            <br />
            Data:
          </div>
        </div>

        <div className="large-box">
          <button className="adicionar-amigos-btn"></button>
          <ul id="amigos-lista">
            {amigos.map((amigo) => (
              <li key={amigo._id}>{amigo.nickname}</li>
            ))}
          </ul>
        </div>

        <button className="responsive-button">Clique Aqui</button>
        <button className="responsive-button2">Clique Aqui</button>
      </div>
    </>
  );
}

export default App;
