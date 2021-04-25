async function login (email, password) {
    try {
        const response = await fetch("http://localhost:8005/users/login", {
            "method": "POST",
            "headers": {
            "Content-Type": "application/json"
            },
            "body": JSON.stringify({email, password})
        });
        if(response.redirected){
            window.location.replace(response.url);
        } else if(response.status >= 400 && response.status < 500) {
            document.querySelector('.error').textContent = "Invalid Username or Email"
        } 
    } catch (err) {
        document.querySelector('.error').textContent = "Unknown error has occured.."
    }
}

document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    login(email, password);
});

