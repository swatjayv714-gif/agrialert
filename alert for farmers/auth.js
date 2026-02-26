async function login() {
    const phone = document.getElementById("loginPhone").value;
    const password = document.getElementById("loginPassword").value;
    const res = await apiFetch("/auth/login", "POST", { phone, password });
    if (res.token) {
        localStorage.setItem("token", res.token);
        window.location.href = "crops.html";
    } else {
        alert(res.error || "Login failed");
    }
}

async function register() {
    const name = document.getElementById("regName").value;
    const phone = document.getElementById("regPhone").value;
    const location = document.getElementById("regLocation").value;
    const password = document.getElementById("regPassword").value;
    const res = await apiFetch("/auth/register", "POST", { name, phone, location, password });
    if (res.message) alert("Registered successfully! You can now login.");
    else alert(res.error || "Registration failed");
}
