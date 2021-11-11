import json
import re
from Usuario import Usuario
from Pintura import Pintura
from Pedido import Pedido

class Controlador:
    def __init__(self):
        self.usuario = []
        self.pintura = []
        self.pedido = []
        resultado=0
       
        self.usuario.append(Usuario('Herbert','Reyes','M','admin','1234','https://lh3.googleusercontent.com/proxy/bTkqooWpEj848fcROatMBN2que4imczbtw6Poy3C4D34_0Sb1y-j42aZxYiu_y14JCqY9T-2ypjN_BgI5A3VBJUVhQyczT39AjBNm-Yy3Dpfrp01eaPlmPMa9UCadaMJ'))
        

    #Comprar
    def comprar(self,nombre,precio):
        self.pedido.append(Pedido(nombre,precio))

    def obtenerPedido(self):
        return json.dumps([ob.__dict__ for ob in self.pedido])

    def total(self):
        for x in self.pedido:
            resultado=self.usuario.index(x)+resultado
            return resultado
        return resultado


    #Create
    def crearUsuario(self,nombre,apellido,sexo,user,password,foto):
        self.usuario.append(Usuario(nombre,apellido,sexo,user,password,foto))
    
    def crearPintura(self,nombre,precio,descripcion,foto):
        self.pintura.append(Pintura(nombre,precio,descripcion,foto))

    #Read 
    def obtenerUsuarios(self):
        return json.dumps([ob.__dict__ for ob in self.usuario])

    def obtenerPinturas(self):
        return json.dumps([ob.__dict__ for ob in self.pintura])

    #Update
    def actualizarUsuario(self,user,nombreNuevo,apellidoNuevo,sexoNuevo,userNuevo,passwordNuevo,fotoNuevo):
        for x in self.usuario:
            print(user)
            if x.user==user:
                self.usuario[self.usuario.index(x)]=Usuario(nombreNuevo,apellidoNuevo,sexoNuevo,userNuevo,passwordNuevo,fotoNuevo)
                return True
        return False
    
    def actualizarPintura(self,nombre,nombreNuevo,precioNuevo,descripcionNuevo,fotoNuevo):
        for x in self.pintura:
            
            if x.nombre==nombre:
                self.pintura[self.pintura.index(x)]=Pintura(nombreNuevo,precioNuevo,descripcionNuevo,fotoNuevo)
                return True
        return False
 
    #Delete 
    def eliminarUsuario(self,user):
        for x in self.usuario:
            if x.user==user:
                self.usuario.remove(x)
                return True
        return False
    
    def eliminarPintura(self,nombre):
        for x in self.pintura:
            if x.nombre==nombre:
                self.pintura.remove(x)
                return True
        return False

    #iniciar sesion
    def inicioSesion(self,user,password):
        for x in self.usuario:
            if x.password==password and x.user==user:
                return json.dumps(x.__dict__)   
        return '{"data":"Usuario no existe"}'

    #Registar usuarios
    def registrarUsuario(self,nombre,apellido,sexo,user,password,foto):
        self.usuario.append(Usuario(nombre,apellido,sexo,user,password,foto))

    #Carga Masiva
    def cargamasivaUsuario(self,data):
        informacion = re.split('\n',data)
        
        i=1
        print(len(informacion))
        while i < len(informacion):
            
            texto = re.split(',',informacion[i])
            print(texto)
            self.crearUsuario(texto[0],texto[1],texto[2],texto[3],texto[4],texto[5])
            i = i+1

    def cargamasivaPintura(self,data):
        informacion = re.split('\n',data)
        
        i=1
        print(len(informacion))
        while i < len(informacion):
            
            texto = re.split(',',informacion[i])
            print(texto)
            self.crearPintura(texto[0],texto[1],texto[2],texto[3])
            i = i+1
