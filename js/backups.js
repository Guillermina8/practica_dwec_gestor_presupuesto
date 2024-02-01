//const API_URL = "http://jsonplaceholder.typicode.com"
const API_URL = "https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/"
const usuario = 'guillePina';
const HTHLResponse = document.querySelector("#app")
//Creando con nodos DOM:

const tpl= document.createDocumentFragment();
fetch('${API_URL} + usuario')
    .then((Response) => Response.json())
    .then((users) => {
        
//Directo:
var tpl;
/*fetch('${API_URL} + usuario')
    .then((Response) => Response.json())
    .then((users) => { 
        const tpl = users.map((user) => '<li>${user.name} ${user.email}</li>');
        HTMLResponse.innerHTML = '<ul>${tpl}</ul>';
    });*/


//Antiguamente: 
/*let xhr = new XMLHttpRequest();
//Manejador de la petición
function onRequestHandler() {
    if (this.readyState == 4 && this.status == 200) {
        // UNSET, no se ha llamado al metodo open
        // 1 OPENED, se ha llamado al metodo open.
        // 2 HEADERS_RECEIVED, se está llamando al metodo send()
        // 3 = LOADING, está cargando, es decir, está recibiendo la respuesta.
        // 4 = DONE, se ha completado la operación.
        //console.log(this.response);
        let data = JSON.parse(this.response);
        console.log(data);
        const HTHLResponse = document.querySelector("#app")
        var tpl = data.map(user => '<li>${user.name} ${user.email}</li>');
        HTMLResponse.innerHTML = '<ul>${tpl}</ul>';
    }
}
xhr.addEventListener("load", onRequestHandler);
xhr.open("GET", '$API_URL}/users');
xhr.send();*/