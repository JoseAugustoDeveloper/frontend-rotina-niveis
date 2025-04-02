import "./style.css";
import { useState } from "react";


function Register(){
  const [isActive, setIsActive] = useState(false);

  async function registerUser(username, email, password){
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
      credentials: 'include'
    });

    const data = await response.json();
    console.log("Resposta do servidor:", data);
  };

  async function loginUser(email, password){
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });

    const data = await response.json();
    console.log("Resposta do servidor:", data);
  };

//   async function getProfile() {
//     const response = await fetch("http://localhost:3000/profile", {
//       method: "GET",
//       credentials: "include",
//     });
//     return response.json();
// }

// const container = document.querySelector('.container');
// const registerBtn = document.querySelector('.register-btn');
// const loginBtn = document.querySelector('.login-btn');

// registerBtn.addEventListener('click', () => {
//   container.classList.add('active')
// });

// loginBtn.addEventListener('click', () => {
//   container.classList.remove('active')
// });

  return (
    <>
     <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"></link>
    <div className={`container ${isActive ? "active" : ""}`}>
    <div className="form-box login">
      <form onSubmit={async (e)=>{
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const result = await loginUser(email, password);
        console.log(result);
      }}>
        <h1>Login</h1>

        <div className="input-box">
          <input type="text" placeholder="Nome de Usuário" required />
          <i className="bx bxs-user"></i>
        </div>

        <div className="input-box">
          <input type="password" placeholder="Senha" required />
          <i className="bx bxs-lock-alt"></i>
        </div>

        <div className="forgot-link">
          <a href="#">Esqueceu a senha?</a>
        </div>

        <button type="submit" class="btn">
          Login
        </button>
        <p>ou faça login com plataformas sociais</p>

        <div className="social-icons">
          <a href="#">
            <i className="bx bxl-google"></i>
          </a>
          <a href="#">
            <i className="bx bxl-facebook"></i>
          </a>
          <a href="#">
            <i className="bx bxl-github"></i>
          </a>
          <a href="#">
            <i className="bx bxl-linkedin"></i>
          </a>
        </div>
      </form>
    </div>

    <div className="form-box register">
      <form onSubmit={async(e)=>{
        e.preventDefault();
        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        await registerUser(username, email, password);
        console.log("Usuário registrado com sucesso!");
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
          <a href="#">
            <i className="bx bxl-google"></i>
          </a>
          <a href="#">
            <i className="bx bxl-facebook"></i>
          </a>
          <a href="#">
            <i className="bx bxl-github"></i>
          </a>
          <a href="#">
            <i className="bx bxl-linkedin"></i>
          </a>
        </div>
      </form>
    </div>

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