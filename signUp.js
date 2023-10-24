const submitSignUp = document.getElementById("submit-signUp");
const emailSignUp = document.getElementById("signUp-email");
const passSignUp = document.getElementById("signUp-password");
const confirmPass = document.getElementById("signUp-confirmPassword");
const logOut = document.getElementById("logOut-button");

const notificationElement = document.getElementById("notification");
const NOTIFICATION_INFO_STYLE =
  "display: block; background-color: var(--clr-pink); color: var(--clr-gb-2)";

const NOTIFICATION_WARN_STYLE =
  "display: block; background-color: var(--notification-warn); color: var(--clr-gb-2)";

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#submit-signUp")
    .addEventListener("click", (event) => {
      event.preventDefault();
      if (
        emailSignUp.checkValidity() &&
        passSignUp.checkValidity() &&
        confirmPass.checkValidity()
      ) {
        SignUpAuth(emailSignUp, passSignUp, confirmPass);
      } else {
        let notificationConfig = {
          style: NOTIFICATION_WARN_STYLE,
          text: "Invalid user or password",
        };
        notificationElement.style = notificationConfig.style;
        notificationElement.innerText = notificationConfig.text;
        setTimeout(() => (notificationElement.style.display = "none"), 6000);
      }
    });
});

async function SignUpAuth(emailSignUp, passSignUp, confirmPass) {
  const apiUrl = `https://todoapp-backend-kbsb.onrender.com/signUp`;
  // const apiUrl = `http://localhost:4000/signUp`;
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailSignUp.value,
        password: passSignUp.value,
        confirmPassword: confirmPass.value,
      }),
    });

    if (response.ok) {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "toDoList.html";
    } else if (response.status === 400) {
      const data = await response.json();
      let notificationConfig = {
        style: NOTIFICATION_WARN_STYLE,
        text: "User already exists! Please sign In with this account",
      };
      notificationElement.style = notificationConfig.style;
      notificationElement.innerText = notificationConfig.text;
      setTimeout(() => (notificationElement.style.display = "none"), 6000);
      console.log(data.error);
    } else {
      console.log("Eroare la inregistrare.");
    }
  } catch (error) {
    console.error("Eroare la inregistrare", error);
  }
}
