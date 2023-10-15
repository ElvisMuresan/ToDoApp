const submitSignUp = document.getElementById("submit-signUp");
const emailSignUp = document.getElementById("signUp-email");
const passSignUp = document.getElementById("signUp-password");

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#submit-signUp")
    .addEventListener("click", (event) => {
      event.preventDefault();
      SignUpAuth(emailSignUp, passSignUp);
    });
});

async function SignUpAuth(emailSignUp, passSignUp) {
  //const apiUrl = `https://todoapp-backend-kbsb.onrender.com/signUp`;
  const apiUrl = `http://localhost:4000/signUp`;
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailSignUp.value,
        password: passSignUp.value,
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
