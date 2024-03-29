if(document.getElementById('newProjectAdmin')){
    document.getElementById('newProjectAdmin').addEventListener('click', (event) => {
        event.preventDefault();
        window.location.replace(`${window.location.origin}/projects/create`);
    });
}

if(document.getElementById('viewProjects')){
    document.getElementById('viewProjects').addEventListener('click', (event) => {
        event.preventDefault();
        window.location.replace(`${window.location.origin}/projects/getAllProjects`);
    });
}

if(document.getElementById('viewOpenProjects')){
    document.getElementById('viewOpenProjects').addEventListener('click', (event) => {
        event.preventDefault();
        window.location.replace(`${window.location.origin}/openProjects/getAllOpenProjects`);
    });
}

if(document.getElementById('viewUsers')){
    document.getElementById('viewUsers').addEventListener('click', (event) => {
        event.preventDefault();
        window.location.replace(`${window.location.origin}/users/getUsers`);
    });
}

if(document.getElementById('newProjectUser')){
    document.getElementById('newProjectUser').addEventListener('click', (event) => {
        event.preventDefault();
        window.location.replace(`${window.location.origin}/openProjects/new`);
    });
}

//id="viewUsersProjects"
if(document.getElementById('viewUsersProjects')){
    document.getElementById('viewUsersProjects').addEventListener('click', (event) => {
        event.preventDefault();
        window.location.replace(`${window.location.origin}/openProjects/usersOpenProjects`);
    });
}

//id="viewAllProjects"
if(document.getElementById('viewAllProjects')){
    document.getElementById('viewAllProjects').addEventListener('click', (event) => {
        event.preventDefault();
        window.location.replace(`${window.location.origin}/openProjects/viewAllProjects`);
    });
}