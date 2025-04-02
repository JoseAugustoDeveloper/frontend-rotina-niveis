document.getElementById('loginBtn').addEventListener('click', login);
document.getElementById('logoutBtn').addEventListener('click', logout);

async function login(){
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  console.log("Tentando login com:", email, password);
  
  try {
    const response = await fetch('http://localhost:3000/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
      credentials: 'include' // Usar token para autenticação
    })

    const data = await response.json();
    console.log("Resposta do servidor:", data); // LOG PARA VER RESPOSTA
    
    if (response.ok) {
      showProfile(data.user);
    } else {
      document.getElementById('loginError').textContent = data.message;
      console.error("Erro no login:", data.message);
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error)
  }
}

async function showProfile(user) {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('profileContainer').style.display = 'block';
  document.getElementById('userEmail').textContent = `Email: ${user.email}`;
}

async function logout() {
  localStorage.removeItem('auth_token');
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('profileContainer').style.display = 'none'
}

async function searchUser(){
  const nickname = document.getElementById('searchInput').value;
  console.log("Buscando usuário:", nickname); // LOG PARA VER O NICKNAME
  if (!nickname) {
    alert("Digite um nickname!")
  }

  try {
   const response = await fetch(`http://localhost:3000/user/search?nickname=${nickname}`, {
    method: 'GET',
    headers: {
      "content-type": "application/json"
    },
    credentials: 'include'
   });
   
   const data = await response.json();
   console.log("Dados recebidos do servidor:", data); // LOG PARA VER OS DADOS RECEBIDOS
   if(response.ok){
    displaySearchResults(data);
   } else {
     alert(data.message || "Erro ao buscar usuário.")
   }
  } catch (error) {
    alert("Erro ao conectar com o servidor")
  }
}

function displaySearchResults(user) {
  const searchResults = document.getElementById("searchResults"); 
  searchResults.innerHTML = "";

  if (!user || !user.nickname) {
    searchResults.innerHTML = "<p>Usuário não encontrados</p>";
    return;
  }

  const userDiv = document.createElement("div");
    userDiv.innerHTML = `
        <p>Nickname: ${user.nickname}</p>
        <button onclick="sendFriendRequest('${user._id}', ${user.isPrivate})">
            ${user.isPrivate ? "Enviar Solicitação" : "Adicionar Amigo"}
        </button>
    `;
  searchResults.appendChild(userDiv);
}

async function sendFriendRequest(nickname, isPrivate) {  
 
  try {
     
    console.log("Enviando solicitação para:", nickname, "Perfil privado?", isPrivate);
    
    const response = await fetch("http://localhost:3000/user/add-friend", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json"
      }, 
      body: JSON.stringify({ nickname }),
    })
    
    const data = await response.json();
    console.log("Resposta do servidor:", data);
    
    if (response.ok) {
     alert(isPrivate ? "Solicitação de amizade enviada!" : "Amigo adicionado!")
    
    } else {
      console.error("Erro na solicitação de amizade:", data.message);
      
      alert(data.message || "Erro ao enviar solicitação de amizade");
    }
  } catch (error) {
    alert("Erro ao conectar com o servidor.")
  }
}

async function loadFriendRequests() {
  try {
    const response = await fetch("http://localhost:3000/user/friend-requests", {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    });

    const data = await response.json();

    if (response.ok) {
      displayFriendRequests(data);
    } else {
      alert("Erro ao carregar solicitações de amizade.")
    }
  } catch (error) {
    alert("Erro ao conectar com o servidor")
  }
}

function displayFriendRequests(requests) {
  const friendRequestDiv = document.getElementById("friendRequests");
  friendRequestDiv.innerHTML = "";

  if (!requests.length) {
    friendRequestsDiv.innerHTML = "<p>Sem novas solicitações.</p>";
    return
  }

  requests.forEach(request => {
    const requestDiv = document.createElement("div");
    requestDiv.innerHTML = `
    <p>${request.nickname} quer ser seu amigo!</p>
    <button onclick="acceptfriendRequest('${request._id}')"Aceitar</button>
    <button onclick="rejectFriendRequest('${request._id}')"Rejeitar</button>
    `;
    friendRequestDiv.appendChild(requestDiv);
  })
}

async function accpetFriend(friendId) {
  try {
    const response = await fetch("http://localhost:3000/user/accept-friend", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ friendId }),
      credentials: "include" // Usar token para autenticação
    });

    const data = await response.json();

    if (response.ok) {
      alert("Amigo aceito!")
      loadFriendRequests();
    } else {
      alert(data.message || "Erro ao aceitar amizade.")
    }
  } catch (error) {
    alert("Erro ao conectar com o servidor.")
  }
}

async function rejectFriend(friendId) {
  try {
      const response = await fetch("http://localhost:3000/user/reject-friend", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ friendId })
      });

      const data = await response.json();

      if (response.ok) {
          alert("Solicitação recusada!");
          loadFriendRequests();
      } else {
          alert(data.message || "Erro ao recusar amizade.");
      }
  } catch (error) {
      alert("Erro ao conectar com o servidor.");
  }
}

const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
  container.classList.add('active')
});

loginBtn.addEventListener('click', () => {
  container.classList.remove('active')
});
