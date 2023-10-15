const submitLogin = document.getElementById("submit-login");
const emailLogin = document.getElementById("login-email");
const passLogin = document.getElementById("login-password");

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#submit-login").addEventListener("click", (event) => {
    event.preventDefault();
    loginAuth(emailLogin, passLogin);
  });
});

async function loginAuth(emailLogin, passLogin) {
  //const apiUrl = `https://todoapp-backend-kbsb.onrender.com/login`;
  const apiUrl = `http://localhost:4000/login`;
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailLogin.value,
        password: passLogin.value,
      }),
    });

    if (response.ok) {
      window.location.href = "index.html";
    } else {
      console.log("Eroare la autentificare.");
    }
  } catch (error) {
    console.error("Eroare la mutarea ToDo-urilui in jos", error);
  }
}
