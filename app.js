document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");

    if (registerForm) {
        registerForm.addEventListener("submit", async(e) => {
            e.preventDefault();
            const username = document.getElementById("register-username").value;
            const password = document.getElementById("register-password").value;

            try {
                const res = await fetch("http://localhost:3000/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                });

                const data = await res.json();

                if (res.ok) {
                    alert("Registration successful!");
                } else {
                    alert(data.message || "Registration failed");
                }
            } catch (err) {
                console.error(err);
                alert("Server error");
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async(e) => {
            e.preventDefault();
            const username = document.getElementById("login-username").value;
            const password = document.getElementById("login-password").value;

            try {
                const res = await fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                });

                const data = await res.json();

                if (res.ok) {
                    localStorage.setItem("username", data.username);
                    window.location.href = "dashboard.html";
                } else {
                    alert(data.message || "Login failed");
                }
            } catch (err) {
                console.error(err);
                alert("Server error");
            }
            const questionForm = document.getElementById("question-form");
            const questionList = document.getElementById("questionList");

            if (questionForm) {
                // Submit a new question
                questionForm.addEventListener("submit", async(e) => {
                    e.preventDefault();
                    const title = document.getElementById("questionTitle").value;
                    const topic = document.getElementById("questionTopic").value;

                    try {
                        const res = await fetch("http://localhost:3000/questions", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ title, topic }),
                        });

                        if (res.ok) {
                            alert("Question posted!");
                            questionForm.reset();
                            loadQuestions(); // Refresh question list
                        } else {
                            alert("Failed to post question.");
                        }
                    } catch (err) {
                        console.error(err);
                        alert("Server error");
                    }
                });

                // Load all questions on page load
                async function loadQuestions() {
                    try {
                        const res = await fetch("http://localhost:3000/questions");
                        const questions = await res.json();

                        questionList.innerHTML = "";
                        questions.forEach((q) => {
                            const li = document.createElement("li");
                            li.textContent = `${q.title} ${q.topic}`;
                            li.classList.add("list-group-item");
                            li.style.cursor = "pointer";
                            li.addEventListener("click", () => {
                                alert(`You clicked on: ${q.title}`);
                            });
                            li.style.color = "blue";
                            li.style.textDecoration = "underline";
                            li.style.marginBottom = "5px";
                            li.style.padding = "10px";
                            li.style.border = "1px solid #ccc";
                            li.style.borderRadius = "5px";
                            li.style.backgroundColor = "#f9f9f9";
                            questionList.appendChild(li);
                        });
                    } catch (err) {
                        console.error(err);
                    }
                }

                loadQuestions();
            }
        });
    }
});