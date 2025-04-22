import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState({ nickname: "", level: 1, pontos: 0 });
  const [atividade, setAtividades] = useState([]);
  const [amigos, setAmigos] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    fetchPerfil();
    fetchAtividades();
    fetchAmigos();
  }, []);

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
      console.log("Dados do perfil", data);
      setUser({
        nickname: data.user.nickname,
        level: data.user.level,
        pontos: data.user.points,
      });
      setImagePreview(data.user.fotoPerfil || "");
    } catch (error) {
      console.error("Erro ao buscar perfil", error);
    }
  }

  const handleImageClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:3000/user/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        console.log("Upload result:", result);
      } catch (error) {
        console.error("Erro ao fazer upload:", error);
      }
    }
  };

  const handleRemove = () => {
    setImagePreview("/img/perfil-placeholder.png");
    setMenuOpen(false);
  };

  const handleView = () => {
    window.open(imagePreview, "_blank");
    setMenuOpen(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
    setMenuOpen(false);
  };

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
      setAmigos(
        friends.map((f) => ({
          id: f.id,
          nickname: f.nickname,
          level: f.level,
          points: f.points,
        }))
      );
    } catch (error) {
      console.error("Erro ao buscar amigos", error);
    }
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      ></link>
      <div className="background">
        <h1 className="bem-vindo">Bem vindo, {user.nickname} </h1>

        <div className="container-menu">
          <h1>Menu</h1>
          <button id="notificacoes-btn">
            <i className="bx bxs-arrow-from-left"></i>
            Notificações
          </button>
          <button id="configuracoes-btn">Configurações</button>
          <button id="acessar-perfil-btn">Acessar Perfil Completo</button>
        </div>

        <div className="container-perfil">
          <h1 className="perfil">Perfil</h1>
          <div className="perfil-info">
            <div className="perfil-img-wrapper" onClick={handleImageClick}>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Foto de Perfil"
                  className="perfil-img"
                />
              ) : (
                <div className="perfil-img placeholder">Sem Foto</div>
              )}

              {menuOpen && (
                <div className="perfil-menu">
                  <button onClick={handleRemove}>Remover</button>
                  <button onClick={handleUploadClick}>Alterar/Adicionar</button>
                  <button onClick={handleView}>Visualizar</button>
                </div>
              )}
            </div>
            <div className="perfil-detalhes">
              <strong>Nível:</strong> {user.level}
              <br />
              <strong>Pontos:</strong> {user.pontos}
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <div className="container-estatisticas">
          <h1 className="estatisticas">Estatísticas</h1>
          <canvas id="grafico-progresso"></canvas>
        </div>

        <div className="recent-activities">
          {Array.from({ length: 3 }).map((_, index) => {
            const atividadeAtual = atividade[index];
            return (
              <div
                key={index}
                className={`container-recentes ${
                  index === 0
                    ? "top-left"
                    : index === 1
                    ? "top-center"
                    : "top-right"
                }`}
              >
                {atividadeAtual ? (
                  <>
                    <h3 className="title">{atividadeAtual.name}</h3>
                    <div className="info">
                      <p>
                        <strong>Classe:</strong> {atividadeAtual.classe}
                      </p>
                      <p>
                        <strong>Pontos:</strong> {atividadeAtual.points}
                      </p>
                      <p>
                        <strong>Data:</strong>{" "}
                        {new Date(atividadeAtual.date).toLocaleDateString()}
                      </p>
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
          <h1>Amigos</h1>
          <ul id="amigos-lista">
            {amigos.map((amigo) => (
              <li key={amigo._id}>{amigo.nickname}</li>
            ))}
          </ul>
        </div>

        <button className="responsive-button2">Nova Atividade</button>
      </div>
    </>
  );
}

export default App;
