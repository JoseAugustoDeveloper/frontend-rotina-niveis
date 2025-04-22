import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false); // Estado para controlar a aba ativa
  const navigate = useNavigate();

  async function registerUser(username, email, password) {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname: username, email, password }),
      credentials: 'include',
    });

    const data = await response.json();
    console.log("Resposta do servidor:", data);

    if (response.ok) {
      // Após o cadastro bem-sucedido, mudamos a aba para login
      setIsActive(false); // Altera o estado para a aba de login
      navigate("/login");  // Redireciona para a tela de login
    } else {
      alert("Erro no cadastro: " + data.message); // Caso ocorra erro no cadastro
    }
  }

  async function loginUser(event) {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
        credentials: 'include',
      });

      const data = await response.json();
      console.log("Resposta do servidor:", data);

      if (response.ok) {
        console.log("Login bem sucedido!");
        navigate("/home");
      } else {
        document.getElementById('loginError').textContent = data.message;
        console.error("Erro no login:", data.message);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  }

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"></link>
      <div className={`container ${isActive ? "active" : ""}`}>
        {/* Formulário de Login */}
        <div className="form-box login">
          <form onSubmit={loginUser}>
            <h1>Login</h1>

            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box">
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>

            <div className="forgot-link">
              <a href="#">Esqueceu a senha?</a>
            </div>

            <button type="submit" className="btn">Login</button>
            <p>ou faça login com plataformas sociais</p>

            <div className="social-icons">
              <a href="#"><i className="bx bxl-google"></i></a>
              <a href="#"><i className="bx bxl-facebook"></i></a>
              <a href="#"><i className="bx bxl-github"></i></a>
              <a href="#"><i className="bx bxl-linkedin"></i></a>
            </div>
          </form>
        </div>

        {/* Formulário de Registro */}
        <div className="form-box register">
          <form onSubmit={async (e) => {
            e.preventDefault();
            const username = e.target[0].value;
            const email = e.target[1].value;
            const password = e.target[2].value;
            await registerUser(username, email, password);
          }}>
            <h1>Register</h1>
            <div className="input-box">
              <input type="text" placeholder="Nome de Usuário" required />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input type="email" placeholder="Email" required />
              <i className="bx bxs-envelope"></i>
            </div>
            <div className="input-box">
              <input type="password" placeholder="Senha" required />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <button type="submit" className="btn">Cadastre-se</button>
            <p>ou faça login com plataformas sociais</p>
            <div className="social-icons">
              <a href="#"><i className="bx bxl-google"></i></a>
              <a href="#"><i className="bx bxl-facebook"></i></a>
              <a href="#"><i className="bx bxl-github"></i></a>
              <a href="#"><i className="bx bxl-linkedin"></i></a>
            </div>
          </form>
        </div>

        {/* Toggle de troca entre login e registro */}
        <div className="togle-box">
          <div className="toggle-panel toggle-left">
            <h1>Olá, Bem Vindo!</h1>
            <p>Registre-se para começar a usar nosso sistema.</p>
            <button className="btn" onClick={() => setIsActive(true)}>Cadastre-se</button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Olá, Bem Vindo!</h1>
            <p>Faça login para começar a usar nosso sistema.</p>
            <button className="btn" onClick={() => setIsActive(false)}>Login</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
