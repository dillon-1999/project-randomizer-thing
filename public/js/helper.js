// -----FUNCTIONS-----

//Purpose: Generates A Project for the user
//Link Used: /openProjects/new
//Param: difficulty (int)
async function generateProject (difficulty)
{
    try
    {
        const response = await fetch(`${window.location.origin}/projects/${difficulty}`);
        try
        {
            const data = await response.json();
            console.log(data);
            let projectIndex = Math.floor(Math.random() * data.length);
            return data[projectIndex];
        }
        catch(err)
        {
            console.log(err);
        }
    }
    catch (err)
    {
        document.querySelector('.error').textContent = "Unknown error has occured..";
        console.log(err);
    }
}

//Purpose: Creates A New Project (admin only)
//Link Used: /projects/create 
//Param: name (string), description (string), difficulty(int)
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

//Purpose: Logs the user in
//Link Used: /login 
//Param: email (string), password (string)
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

//Purpose: Registers a new user
//Link Used: /register
//Param: email (string), password (string), username(int)
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

//Purpose: Opens a new Project (for users)
//Link Used: /openProjects/new 
//Param: project (string (projectID))
async function openNewProject(project) {
    try
    {
        const response = await fetch(`${window.location.origin}/openProjects/openProject`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({project})
        });
        if(response.ok){
            window.location.replace(`${window.location.origin}/openProjects/usersOpenProjects`);
        } else if(response.status >= 400 && response.status < 500) {
            console.log(response.status);
        }
    } catch (err) {
        console.log(err);
    }
}

//Purpose: Posts new comment
//Link Used: /openProjects/comments 
//Param: comment (comment (text), author (text), project (text))
async function postNewComment(openProjectID, commentText) {
    try
    {
        const response = await fetch(`${window.location.origin}/openProjects/postComment`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({openProjectID, commentText})
        })
        if(response.ok){
            location.reload();
        } else if(response.status >= 400 && response.status < 500) {
            console.log(response.status);
        }
    } catch (err) {
        console.log(err);
    }
}

//Is This Necessary?
async function commentReDirect(openProjectID) {
    try
    {
        
        window.location.replace(`${window.location.origin}/openProjects/${openProjectID}/comments`);
    }
    catch (err)
    {
        console.err(err);
    }
}

// -----FORMS-----
async function uploadFile(openID){
    try{
        console.log("in func")
        let form = document.getElementById('uploadForm');
        let formData = new FormData(form);
        const response = await fetch(`${window.location.origin}/openProjects/uploadSingle/${openID}`, {
            "method": "POST",
            "body": formData
        });
        if(response.ok){
            console.log('upload success');
            window.location.replace(`${window.location.origin}/openProjects/usersOpenProjects`);
        } else {
            document.querySelector('.error').textContent = "An error has occurred...";
        }
    } catch(err) {
        console.error(err)
    }
}

if(document.getElementById('submitCode')){
    document.getElementById('submitCode').addEventListener('click', (event) => {
        event.preventDefault();
        if(uploadFile(document.getElementById('submitCode').value)){
            console.log("Yooooo");
        } else {
            console.log("nooooo")
        }
    })
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

//Purpose: Logs in a user
//Used at: /login
if(document.getElementById('loginForm')){
        document.getElementById('loginForm').addEventListener('submit', (event) => {
        event.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        login(email, password);
    });
}

//Purpose: Creates a project (admin only)
//Used at: /projects/create
if(document.getElementById('createForm')){
    document.getElementById('createForm').addEventListener('submit', (event) => {
        event.preventDefault();
        //console.log("here")
        let name = document.getElementById('proj_name').value;
        let description = document.getElementById('proj_desc').value;
        let difficulty = document.getElementById('difficulty').value;
        newProject(name, description, difficulty);
    });
}

if(document.getElementById('difficultyForm')){
    document.getElementById('difficultyForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        let difficulty = document.getElementById('difficulty').value;
        const project = await generateProject(difficulty);

        console.log(project);
        console.log(difficulty);

        document.querySelector('#projectName').textContent = `Name: ${project.name}`;
        document.querySelector('#projectDesc').textContent = `Description: ${project.description}`;
        document.querySelector('#projDiff').textContent = `Difficulty: ${project.difficulty}`;

        //document.querySelector(".projectOffer");
        let newButton = document.createElement('button');
        newButton.textContent = 'Accept Project';
        newButton.className =  "bg-blue-500 hover:bg-blue-400 text-gray font-mono m-0.5 border-b-4 px-3 py-3 border-blue-700 hover:border-blue-500 rounded content-center align-middle"
        newButton.addEventListener('click', (event) => {
            console.log('Accepted Project');
            openNewProject(project.projectID);
        });
        document.querySelector('#projectOffer').append(newButton);

    });
}

//Purpose: Posts a new comment
//Used at: /openProjects/comments
if(document.getElementById('commentForm')){
    document.getElementById('commentForm').addEventListener('submit', (event) => {
        event.preventDefault();
        let commentText = document.getElementById('commentText').value;
        let openProjectID = document.getElementById('openProjectID').value;
        

        postNewComment(openProjectID, commentText);
    });
}

if(document.getElementById('commentsLink')){
    document.getElementById('commentsLink').addEventListener('click', (event) => {
        console.log("Attempting to redirect")
        let openID = document.getElementById('openProjectID');
        console.log(`OpenID: ${openID.value}`)
        event.preventDefault();
        window.location.replace(`${window.location.origin}/openProjects/comments/${openID.value}`);
    });
}