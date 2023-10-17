const submitLogin = document.getElementById("submit-login");
const emailLogin = document.getElementById("login-email");
const passLogin = document.getElementById("login-password");
const urlParams = new URLSearchParams(window.location.search);
const logoutSuccess = urlParams.get("logoutSuccess");

const notificationElement = document.getElementById("notification");
const NOTIFICATION_INFO_STYLE =
  "display: block; background-color: var(--clr-pink); color: var(--clr-gb-2)";

const NOTIFICATION_WARN_STYLE =
  "display: block; background-color: var(--notification-warn); color: var(--clr-gb-2)";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#submit-login").addEventListener("click", (event) => {
    event.preventDefault();
    loginAuth(emailLogin, passLogin);
  });
  if (logoutSuccess === "true") {
    let notificationConfig = {
      style: NOTIFICATION_INFO_STYLE,
      text: "User log Out succesfully!",
    };

    notificationElement.style = notificationConfig.style;
    notificationElement.innerText = notificationConfig.text;
    setTimeout(() => (notificationElement.style.display = "none"), 6000);
  }
});

async function loginAuth(emailLogin, passLogin) {
  //const apiUrl = `https://todoapp-backend-kbsb.onrender.com/login`;
  const apiUrl = `http://localhost:4000/logIn`;
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
      window.location.href = "toDoList.html";
    } else if (response.status === 401) {
      const data = await response.json();
      let notificationConfig = {
        style: NOTIFICATION_WARN_STYLE,
        text: "Invalid credentials. Please check your password or email.",
      };
      notificationElement.style = notificationConfig.style;
      notificationElement.innerText = notificationConfig.text;
      setTimeout(() => (notificationElement.style.display = "none"), 6000);
      console.log(data.error);
    } else {
      console.log("Eroare la autentificare.");
    }
  } catch (error) {
    console.error("Eroare la autentificare", error);
  }
}
