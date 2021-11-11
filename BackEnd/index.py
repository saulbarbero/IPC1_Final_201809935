#importaciones de flask
from flask import Flask, request,jsonify
from flask_cors import CORS 
from Controlador import Controlador

#crear la aplicacion
app = Flask(__name__)
app.config["DEBUG"] = True

CORS(app)

gestor = Controlador()


#EndPoints

@app.route('/',methods = ['GET'])
def home():
    return 'SERVER FINAL IS WORKING'


#Comprar
@app.route('/pedido',methods=['POST'])
def comprar():
    dato = request.json
    gestor.comprar(dato['nombre'], dato['precio'])
    return '{"Estado":"Pedido Creado"}'

@app.route('/obtenerPedido')
def obtenerPedido():
    return gestor.obtenerPedido()

#Obtener
@app.route('/obtenerUsuarios')
def obtenerUsuarios():
    return gestor.obtenerUsuarios()

@app.route('/obtenerPinturas')
def obtenerPinturas():
    return gestor.obtenerPinturas()


#POST Crear
@app.route('/usuarios',methods=['POST'])
def crearUsuario():
    dato = request.json
    gestor.crearUsuario(dato['nombre'],dato['apellido'],dato['sexo'],dato['user'],dato['password'],dato['foto'])
    return '{"Estado":"Usuario Creado"}'

@app.route('/pinturas',methods=['POST'])
def crearPintura():
    dato = request.json
    gestor.crearPintura(dato['nombre'],dato['precio'],dato['descripcion'],dato['foto'])
    return '{"Estado":"Pintura Creada"}'

#DELETE
@app.route('/usuarios/<user>',methods=['DELETE'])
def eliminarUsuario(user):
    if(gestor.eliminarUsuario(user)):
        return '{"data":"Eliminada"}'
    return '{"data":"Error"}'

@app.route('/pinturas/<nombre>',methods=['DELETE'])
def eliminarPintura(nombre):
    if(gestor.eliminarPintura(nombre)):
        return '{"data":"Eliminada"}'
    return '{"data":"Error"}'


#PUT Actualizar  
@app.route('/usuarios/<user>',methods=['PUT']) 
def actualizarUsuario(user):
    dato = request.json
    if gestor.actualizarUsuario(user,dato['nombreNuevo'],dato['apellidoNuevo'],dato['sexoNuevo'],dato['userNuevo'],dato['passwordNuevo'],dato['fotoNuevo']):
        return '{"data":"Actualizada"}'
    return '{"data":"Error"}' 

@app.route('/pinturas/<nombre>',methods=['PUT']) 
def actualizarPintura(nombre):
    dato = request.json
    if gestor.actualizarPintura(nombre,dato['nombreNuevo'],dato['precioNuevo'],dato['descripcionNuevo'],dato['fotoNuevo']):
        return '{"data":"Actualizada"}'
    return '{"data":"Error"}'


#POST Registro
@app.route('/registrarUsuario',methods=['POST'])
def registrarUsuario():
    dato=request.json
    gestor.registrarUsuario(dato['nombre'],dato['apellido'],dato['sexo'],dato['user'],dato['password'],dato['foto'])
    return '{"data":"Creado"}'


#Cargas
@app.route('/cargamasivaUsuario',methods=['POST'])
def cargamasivaUsuario():
    dato = request.json
    print(dato)
    gestor.cargamasivaUsuario(dato['data'])
    return '{"data":"Cargados"}'

@app.route('/cargamasivaPintura',methods=['POST'])
def cargamasivaPintura():
    dato = request.json
    print(dato)
    gestor.cargamasivaPintura(dato['data'])
    return '{"data":"Cargados"}'

#Login
@app.route('/login/<user>/<password>')
def inicio(user,password):
    return gestor.inicioSesion(user,password)

#Iniciar el server
if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)


 