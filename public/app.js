async function signup() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            console.log("Signup successful");
        } else {
            console.error("Signup failed");
        }
    } catch (error) {
        console.error("Error during signup:", error);
    }
}

async function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Login successful. Session ID:", data.sessionId);
        } else {
            console.error("Login failed");
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
}
