///////////////////////////Declaracion de Headers/////////////////////////////

let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');




//aqui agrego las cartas de los usuarios
let text="";
fetch('http://localhost:5000/obtenerPinturas')
.then(response => response.json())
.then(data =>{
    var i;
    for(i=0;i<data.length;i++){
      
        text+= `<br>
                <div class="col-sm-3 col-md-3 col-lg-3" style="margin-top: 25px;border-style: dotted;">
                <div class="card bg-light" style="width: auto;">
                <img class="card-img-top" src="${data[i].foto}" alt="Card image cap">
                <div class="card-body">
                    <h4 class="card-title">${data[i].nombre}</h4>
                    <h5 class="card-title">${data[i].descripcion}</h5>
                    <p class="card-text">K$${data[i].precio}</p>
                    <button href="#" class="btn btn btn-danger" onclick="comprar('${data[i].nombre}','${data[i].precio}')">Comprar</button>
                </div>
                </div>
                </div>
                <br>`
      
        
        console.log(data[i].nombre,'prueba')
    }
    document.getElementById("cardsc").innerHTML = text;
});

function comprar(nombre,precio){
    var nombre = nombre;
    var precio = precio;
    alert(nombre)
    alert(precio)

    

    fetch(`http://localhost:5000/pedido`,
    {
        method:`POST`,
        headers,
        body:   `{
            "nombre":"${nombre.value}",
            "precio":"${precio.value}"
                 }`
    })
    .then(response => response.json())
    .then(
        result => {
            console.log(`Success:`, result);
           
           
            alert(`Pedido Creado`)
        }
    )
    .catch(
        error => {
            console.error(`Error:`, error);
            
           
            alert(`Error `)
        }
        
    )
}