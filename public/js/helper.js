async function generateProject (difficulty)
{
    try
    {
        const response = await fetch(`${window.location.origin}/projects/${difficulty}`);
        try
        {
            const data = await response.json();
        }
        catch(err)
        {
            console.log(err);
        }
    }
    catch (err)
    {
        document.querySelector('.error').textContent = "Unknown error has occured..";
    }
}

async function newProject (name, description, difficulty) {
    try {
        const response = await fetch(`${window.location.origin}/projects/create`, {
            "method": "POST",
            "headers": {
            "Content-Type": "application/json"
            },
            "body": JSON.stringify({name, description, difficulty})
        });
        if(response.ok){
            window.location.replace(`${window.location.origin}/users/homepage`);
        } else if(response.status >= 400 && response.status < 500) {
            document.querySelector('.error').textContent = "Invalid inputs. Possibilities: Name taken, Difficulty not (1-5)";
        } 
    } catch (err) {
        document.querySelector('.error').textContent = "Server Error..."
    }
}

async function login (email, password) {
    try {
        const response = await fetch(`${window.location.origin}/users/login`, {
            "method": "POST",
            "headers": {
            "Content-Type": "application/json"
            },
            "body": JSON.stringify({email, password})
        });
        console.log(response)
        if(response.redirected){
            window.location.replace(response.url);
        } else if(response.status >= 400 && response.status < 500) {
            document.querySelector('.error').textContent = "Invalid Username or Email"
        } 
    } catch (err) {
        document.querySelector('.error').textContent = "Unknown error has occured.."
    }
}

async function newUser(email, password, username) {
    try {
        const response = await fetch(`${window.location.origin}/users`, {
            "method": "POST",
            "headers": {
            "Content-Type": "application/json"
            },
            "body": JSON.stringify({email, password, username})
        });
        if(response.ok){
            window.location.replace(`${window.location.origin}/login`);
        } else if(response.status >= 400 && response.status < 500) {
            document.querySelector('.error').textContent = "Invalid inputs";
        } 
    } catch (err) {
        document.querySelector('.error').textContent = "Server Error..."
    }
}

if(document.getElementById('registerForm')){
    document.getElementById('registerForm').addEventListener('submit', (event) => {
        event.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let confirmPassword = document.getElementById('confirmPassword').value;
        let username = document.getElementById('username').value;
        if(password === confirmPassword){
            newUser(email, password, username);
        } else {
            document.querySelector('.error').textContent = "Passwords do not match!";
        }
        
    });
}

if(document.getElementById('loginForm')){
        document.getElementById('loginForm').addEventListener('submit', (event) => {
        event.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        login(email, password);
    });
}


if(document.getElementById('createForm')){
    document.getElementById('createForm').addEventListener('submit', (event) => {
        event.preventDefault();
        console.log("here")
        let name = document.getElementById('proj_name').value;
        let description = document.getElementById('proj_desc').value;
        let difficulty = document.getElementById('difficulty').value;
        newProject(name, description, difficulty);
    });
}
    
if(document.getElementById('uploadButton')){
    document.getElementById('uploadButton').addEventListener('click', (event) => {
        event.preventDefault();
        console.log("clicked")
    });
}

