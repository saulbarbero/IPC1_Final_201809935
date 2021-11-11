//HEADERS
let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/jason');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
    headers.append('GET', 'POST', 'OPTIONS','DELETE', 'PUT');

//Funcion registrar usuarios

function CrearUsuario(){
    var nombre = document.getElementById("nombreRegistro");
    var apellido = document.getElementById("apellidoRegistro");
    var sex = document.getElementById("sexRegistro");
    var user = document.getElementById("userRegistro");
    var pass = document.getElementById("passRegistro");
    var foto = document.getElementById("fotoRegistro");
    

    if(nombre.value=='' || apellido.value=='' ||  user.value=='' || pass.value=='' || foto.value==''){
        alert('Debe llenar todos los campos con *')
        return
    }else if (pass.value.length < 8){
        alert('La contraseña debe tener 8 caracteres minimo')
        return
    }

    fetch(`http://localhost:5000/registrarUsuario`,
    {
        method:`POST`,
        headers,
        body:   `{
            "nombre":"${nombreRegistro.value}",
            "apellido":"${apellidoRegistro.value}",
            "sexo":"${sexRegistro.value}",
            "user":"${userRegistro.value}",
            "password":"${passRegistro.value}",
            "foto":"${fotoRegistro.value}"
                 }`
    })
    .then(response => response.json())
    .then(
        result => {
            console.log(`Success:`, result);
            nombreRegistro.value=``
            apellidoRegistro.value=``
            userRegistro.value=``
            passRegistro.value=``
            fotoRegistro.value=``
           
            alert(`Usuario Creado`)
        }
    )
    .catch(
        error => {
            console.error(`Error:`, error);
            nombreRegistro.value=``
            apellidoRegistro.value=``
            userRegistro.value=``
            passRegistro.value=``
            fotoRegistro.value=``
           
            alert(`Error Creando Usuario`)
        }
        
    )
    
}


//Funcion login
function InicioSesion(){
    let user = document.getElementById("loginUser");
    let pass = document.getElementById("loginPass");

    fetch(`http://localhost:5000/login/${user.value}/${pass.value}`)
    .then(response => response.json())
    .then(data => {
        

        if(data.user== "admin"){
            alert(`Bienvenido ${data.user}`)
            window.location.href='../Administrador/administrador.html'
       
        }else{
            alert(`Bienvenido ${data.user}`)
            window.location.href='../Usuario/usuario.html'
        }
        
        console.log(data.user)  
    })
        
    


}
    