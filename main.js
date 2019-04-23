var divContenedorBotonesUsuario = document.getElementById("divBotones");
var divContenedorPost = document.getElementById("div-contenedor-lista-posts");
const DATAGLOBAL = []
//buscar la data
fetchUsers(FetchPosts);

function fetchUsers(cbFetchPosts) {
    console.log("Fetching data...");
    
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let objetoParseado = JSON.parse(this.responseText)
            if (objetoParseado != undefined) {
                for (let i = 0; i < objetoParseado.length; i++) {
                    let user = {
                        name: objetoParseado[i].name,
                        id: objetoParseado[i].id,
                        posts: []
                    }
                    DATAGLOBAL.push(user)
                }
                cbFetchPosts(renderButton);
            } else {
                console.log("No hay usuarios definidos");
            }
        }   
    }

    request.open('GET', 'https://jsonplaceholder.typicode.com/users');
    request.send();
}

function FetchPosts(cbRenderButton) {
    let request = new XMLHttpRequest();
    //me traigo un array de objetos que contienen: title, userID, id y body
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            
            let resultadoParseado = JSON.parse(this.responseText)
            
            for (let i = 0; i < DATAGLOBAL.length; i++) {
                for (let j = 0; j < resultadoParseado.length; j++) {
                    
                    if (DATAGLOBAL[i].id == resultadoParseado[j].userId) {
                        DATAGLOBAL[i].posts.push(
                        {
                            title: resultadoParseado[j].title,
                            body: resultadoParseado[j].body
                        })
                    }
                }
            }
            cbRenderButton(DATAGLOBAL, renderPosts)
        }
    }

    request.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    request.send();
}

function renderButton(users, cbEventHandler) {
    //delete
    //users es dataglobal, user es cada item del array(con un objeto dentro)
    users.forEach(user => {
        
    let boton = document.createElement("button");

    boton.setAttribute("class", "boton-usuario");

    boton.appendChild(document.createTextNode(user.name));

    boton.addEventListener("click", function () {
        cbEventHandler(user.posts);
    });
    
    divContenedorBotonesUsuario.appendChild(boton);
    console.log(user.posts, user.name);    
});
    
    
}
//le pase user.post(que es un array)
function renderPosts(posts) {
    //delete
    
        let divchild = document.createElement("div");
        let article = document.createElement("p");
        let title = document.createElement("h2");
        
        divchild.setAttribute("class", "post");

        title.appendChild(document.createTextNode(posts[0].title));
        
        article.appendChild(document.createTextNode(posts[0].body))
        
        divchild.appendChild(title)
        divchild.appendChild(article)
        
        divContenedorPost.appendChild(divchild);

    
}