////////////////////////////////////PDF///////////////////////////////////////////
function createHeaders(keys) {
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 55,
      align: "center",
      padding: 0
    });
  }
  return result;
}

function convertirdata(paciente){
  if(paciente.user!=='admin'){
    var data ={
      "Nombre":paciente.nombre,
      "Apellido":paciente.apellido,
      "Sexo":paciente.sexo,
      "User":paciente.user,
      "Password":paciente.password
    }
  
    return data
  }else{
    var data ={
      "Nombre":'',
      "Apellido":'',
      "Sexo":'',
      "User":'',
      "Password":''
    }
    return data
  }
 

  }

  



function crearpdf(){
  
  fetch('http://localhost:5000/obtenerUsuarios')
  .then(response => response.json())
  .then(data=>{
      //Declarando los headers
      let headers = createHeaders([
        "Nombre",
        "Apellido",
        "Sexo",
        "User",
        "Password"
      ]);
      // Insertamos la data
    let datos=[]
    for(let i =0;i<data.length;i++){
      datos.push(Object.assign({},convertirdata(data[i])))
    }
    console.log(datos)
    var contentJsPdf = {
      headers,
      datos
  };
    var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
    doc.table(1, 1, datos, headers, { autoSize: false });
    doc.save("usuarios.pdf")
  })
}

///////////////////////////Declaracion de Headers/////////////////////////////

let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');



////////////////////////cargar/////////////////////////////////////
function cargar(){
  actualizar()
  let file = document.getElementById("carga").files[0];
  if (file) {
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
          let cuerpo = {
              data:evt.target.result
          }
          actualizar()
          console.log(JSON.stringify(cuerpo))
          fetch('http://localhost:5000/cargamasivaUsuario', {
          method: 'POST',
          headers,
          body: JSON.stringify(cuerpo),
          })
          .then(response => response.json())
          .then(result => {
            actualizar()
              console.log('Success:', result);
              actualizar()
              
          })
          .catch(error => {
              console.error('Error:', error);
          });

      }
      reader.onerror = function (evt) {
          
      }
  }
}
///////////////////////////////Modificar//////////////////////////////////
function modificarUsuario(){
  
  let userOld = document.getElementById("vUsuario");
  let nombre = document.getElementById("nNombre");
  let apellido = document.getElementById("nApellido");
  let sex = document.getElementById("nSexo");
  let user = document.getElementById("nUsuario");
  let pass = document.getElementById("nPassword");
  let foto = document.getElementById("nFoto");


    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
      headers.append('Access-Control-Allow-Credentials', 'true');
      headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');
      
    let reque = `{
            "user":"${vUsuario.value}",
            "nombreNuevo":"${nNombre.value}",
            "apellidoNuevo":"${nApellido.value}",
            "sexoNuevo":"${nSexo.value}",
            "userNuevo":"${nUsuario.value}",
            "passwordNuevo":"${nPassword.value}",
            "fotoNuevo":"${nFoto.value}"
    }`

    console.log(reque)
    
    fetch('http://localhost:5000/usuarios/'+userOld.value, {
      method: 'PUT',
      headers,
      body: reque,
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
      
      actualizar()
            vUsuario.value=``
            nNombre.value=``
            nApellido.value=``
            nSexo.value=``
            nUsuario.value=``
            nPassword.value=``
            nFoto.value=``
            
            alert("Actualizado")
      
    })
    .catch(error => {
      console.error('Error:', error);

      vUsuario.value=``
      nNombre.value=``
      nApellido.value=``
      nSexo.value=``
      nUsuario.value=``
      nPassword.value=``
      nFoto.value=``
            alert("Error")
    });

}


function eliminar(user){

  console.log(user)
    alert(user)
  fetch('http://localhost:5000/usuarios/'+user,{
      method:'DELETE'
  })
  .then(res => res.text())
  .then(res=> {
      alert(res)
      actualizarTabla()
      actualizar()
  })
  
}


//aqui agrego las cartas de los usuarios
let text="";
fetch('http://localhost:5000/obtenerUsuarios')
.then(response => response.json())
.then(data =>{
    var i;
    for(i=0;i<data.length;i++){
      if(data[i].user !=="admin"){
        text+= `<br>
                <div class="col-sm-3 col-md-3 col-lg-3" style="margin-top: 25px;border-style: dotted;">
                <div class="card bg-light" style="width: auto;">
                <img class="card-img-top" src="${data[i].foto}" alt="Card image cap">
                <div class="card-body">
                    <h4 class="card-title">${data[i].nombre}</h4>
                    <h5 class="card-title">${data[i].apellido}</h5>
                    <p class="card-text">${data[i].user}</p>
                    <button href="#" class="btn btn btn-danger" onclick="eliminar('${data[i].user}')">Eliminar</button>
                </div>
                </div>
                </div>
                <br>`
      }
        
        console.log(data[i].nombre,'prueba')
    }
    document.getElementById("cardsc").innerHTML = text;
});







//aqui agrego las cartas de los pacientes por funcion
    function actualizar(){
      let text1="";
      fetch('http://localhost:5000/obtenerUsuarios')
      .then(response => response.json())
      .then(data =>{
          var i;
          for(i=0;i<data.length;i++){
            if(data[i].user !=="admin"){
              text1+= `<br>
                      <div class="col-sm-3 col-md-3 col-lg-3" style="margin-top: 25px;border-style: dotted;">
                      <div class="card bg-light" style="width: auto;">
                      <img class="card-img-top" src="${data[i].foto}" alt="Card image cap">
                      <div class="card-body">
                          <h4 class="card-title">${data[i].nombre}</h4>
                          <h5 class="card-title">${data[i].apellido}</h5>
                          <p class="card-text">${data[i].user}</p>
                          <button href="#" class="btn btn btn-danger" onclick="eliminar('${data[i].user}')">Eliminar</button>
                      </div>
                      </div>
                      </div>
                      <br>`
            }
              
              console.log(data[i].nombre,'prueba')
          }
          document.getElementById("cardsc").innerHTML = text1;
      });


    }
  
/////////////////////////////////////////////////////Tablas ///////////////////////////////////////////////////////////////////

//mostrar medicamentos por medio de una tabala

let text2=""
text2 = `<table class="table" style="margin=10px">
<thead>
<tr>

<th scope="col">Nombre</th>
<th scope="col">Apellido</th>
<th scope="col">Sexo</th>
<th scope="col">User</th>
<th scope="col">Password</th>
</tr>
</thead>
<tbody>`

fetch('http://localhost:5000/obtenerUsuarios')
.then(response => response.json())
.then(data =>{
  var i;
  

 

    for(i=0;i<data.length;i++){
      if(data[i].user !=="admin"){

        text2+= `
        <tr>
        
        <td>${data[i].nombre}</td>
        <td>${data[i].apellido}</td>
        <td>${data[i].sexo}</td>
        <td>${data[i].user}</td>
        <td>${data[i].password}</td>
        <td> <button href="#" class="btn btn-outline-danger btn-sm"  onclick="eliminar('${data[i].user}')">Eliminar</button> </td>
        </tr>
        `
      }

        
    
      
    }

  

  text2+=`</tbody>
          </table>`
  document.getElementById("tablauser").innerHTML = text2;
});

function actualizarTabla(){
  let text3=""
text3 = `<table class="table" style="margin=10px">
<thead>
<tr>

<th scope="col">Nombre</th>
<th scope="col">Apellido</th>
<th scope="col">Sexo</th>
<th scope="col">User</th>
<th scope="col">Password</th>
</tr>
</thead>
<tbody>`

fetch('http://localhost:5000/obtenerUsuarios')
.then(response => response.json())
.then(data =>{
  var i;
  

 

    for(i=0;i<data.length;i++){
      if(data[i].user !=="admin"){

        text3+= `
        <tr>
        
        <td>${data[i].nombre}</td>
        <td>${data[i].apellido}</td>
        <td>${data[i].sexo}</td>
        <td>${data[i].user}</td>
        <td>${data[i].password}</td>
        <td> <button href="#" class="btn btn-outline-danger btn-sm"  onclick="eliminar('${data[i].user}')">Eliminar</button> </td>
        </tr>
        `
      }

        
    
      
    }

  

  text3+=`</tbody>
          </table>`
  document.getElementById("tablauser").innerHTML = text3;
});
  
}