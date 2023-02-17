async function signupFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector("#email-signUp").value.trim();
    const password = document.querySelector("#newUserPswd").value.trim();
    const username = document.querySelector("#username-signUp").value.trim();
  
    if (email && password) {
      const response = await fetch("/api/users", {
        method: "post",
        body: JSON.stringify({
          email,
          password,
          username
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document
    .querySelector(".signup-form")
    .addEventListener("submit", signupFormHandler);