import React, { useState,useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';
import { render } from '@testing-library/react';

function App() {
const baseUrl="https://localhost:5001/API/Empleados";
  const [data, setData]=useState([]);
  const [modalModificar,setModalModificar]=useState(false);
  const [modalAgregar,setModalAgregar]=useState(false);
  const [modalEliminar,setModalEliminar]=useState(false);
  const [modalLista,setModalLista]=useState(false);
  const [gestorSeleccionado,setGestorSeleccionado]=useState({
    id_Empleados: '',
    codigo: '',
    nombres: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    fecha_nacimiento: '',
    id_puesto: ''
  })
const handleChange=e=>{
  const {name,value}=e.target;
setGestorSeleccionado({
  ...gestorSeleccionado,
  [name]:value
});
console.log(gestorSeleccionado);
}
const AbrirCerrarModalAgregar=()=>{
  setModalAgregar(!modalAgregar);
}
const AbrirCerrarModalModificar=()=>{
  setModalModificar(!modalModificar);
}
const AbrirCerrarModalEliminar=()=>{
  setModalEliminar(!modalEliminar);
}
const AbrirCerrarModalLista=()=>{
  setModalLista(!modalLista);
}
const peticionGet=async()=>{
  await axios.get(baseUrl)
  .then(response=>{
    setData(response.data);
  }).catch(error=>{
    console.log('Error-->',error);
  })
}

const peticionPost=async()=>{
  delete gestorSeleccionado.id_Empleados;
  gestorSeleccionado.id_puesto=parseInt(gestorSeleccionado.id_puesto);
  await axios.post(baseUrl,gestorSeleccionado)
  .then(response=>{
    setData(data.concat(response.data));
    AbrirCerrarModalAgregar();
    peticionGet();
  }).catch(error=>{
    console.log('Error-->',error);
  })
}

const peticionPut=async()=>{
  gestorSeleccionado.id_Empleados=parseInt(gestorSeleccionado.id_Empleados);
  gestorSeleccionado.id_puesto=parseInt(gestorSeleccionado.id_puesto);
  
  await axios.put(baseUrl,gestorSeleccionado)
  .then(response=>{
    setData(data.concat(response.data));
   
    AbrirCerrarModalModificar();
    peticionGet();
  }).catch(error=>{
    console.log('Error-->');
  })
}
const peticionDelete=async()=>{
  gestorSeleccionado.id_Empleados=parseInt(gestorSeleccionado.id_Empleados);
  gestorSeleccionado.id_puesto=parseInt(gestorSeleccionado.id_puesto);
  
  await axios.delete(baseUrl+"/"+gestorSeleccionado.id_Empleados)
  .then(response=>{
    setData(data.filter(gestor=>gestor.id_Empleados!==response.data));
   
    AbrirCerrarModalEliminar();
    peticionGet();
  }).catch(error=>{
    console.log('Error-->');
  })
}

const seleccionarGestor=(gestor, caso)=>{
  setGestorSeleccionado(gestor);
(caso==="Modificar")?
AbrirCerrarModalModificar():AbrirCerrarModalEliminar();
}
useEffect(()=>{
 
peticionGet();
},[])

  return (
   
    <div className="App" >
<nav className="navbar navbar-expand-md bg-dark navbar-dark" style={{width:"100%"}} >
  <ul className="navbar-nav"style={{marginLeft:"35%"}}>

    <li className="nav-item">
    <button className="btn btn-primary" onClick={()=>AbrirCerrarModalLista()}><svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-clipboard-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
  <path fill-rule="evenodd" d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3zM8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"/>
</svg> &ensp;Lista de Empleados</button>&ensp;
    </li>
    <li className="nav-item">
    <button className="btn btn-primary" onClick={()=>AbrirCerrarModalAgregar()}><svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-card-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                            <path fill-rule="evenodd" d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"/>
                            <circle cx="3.5" cy="5.5" r=".5"/>
                            <circle cx="3.5" cy="8" r=".5"/>
                            <circle cx="3.5" cy="10.5" r=".5"/>
                            </svg>&ensp;Agregar Empleado</button>
    </li>
  </ul>
</nav>    
       <br></br>
       <br></br>
       
    <Modal isOpen={modalLista} className="modal-dialog modal-xl">
    <ModalHeader>Listado de  Empleados</ModalHeader>
       <ModalBody>
       
      <br></br>
     
      <br></br>
      <br></br>
     <table className="table table-dark table-hover" style={{textAlign:"center"}}>
        <thead>
          <tr>
            <td>Codigo</td>
            <td>Nombres</td>
            <td>Apellidos</td>
            <td>Direcion</td>
            <td>Telefono</td>
            <td>Fecha De Nacimiento</td>
            <td>Id Puesto</td>
            <td>Acciones</td>
          </tr>
        </thead>
        <tbody>
        {data.map(gestor=>(
          <tr key={gestor.id_Empleados}>
            <td>{gestor.codigo}</td>
            <td>{gestor.nombres}</td>
            <td>{gestor.apellidos}</td>
            <td>{gestor.direccion}</td>
            <td>{gestor.telefono}</td>
            <td>{gestor.fecha_nacimiento}</td>
            <td>{gestor.id_puesto}</td>
            <td>
              <button className="btn btn-primary" onClick={()=>seleccionarGestor(gestor,"Modificar")}>Modificar</button>{"    "}
              <button className="btn btn-danger" onClick={()=>seleccionarGestor(gestor,"Eliminar")}>Eliminar</button>
            </td>
          </tr>
        ))}
        </tbody>
     </table>
     </ModalBody>
     <ModalFooter>
     <button className="btn btn-danger" onClick={()=>AbrirCerrarModalLista()}>Cancelar</button>
       </ModalFooter>
     </Modal>
     <Modal isOpen={modalAgregar}>
       <ModalHeader>Agragar Un nuevo Empleado</ModalHeader>
       <ModalBody>
        <div className="form-group">
          <label>Codigo:</label>
          <br/>
          <input type="text" className="form-control" name="codigo" onChange={handleChange} placeholder="Introdusca su Codigo"/>
          <label>Nombres:</label>
          <br/>
          <input type="text" className="form-control" name="nombres" onChange={handleChange} placeholder="Introdusca su Nombre"/>
          <label>Apellidos:</label>
          <br/>
          <input type="text" className="form-control" name="apellidos" onChange={handleChange} placeholder="Introdusca su Apellido"/>
          <label>Direccion:</label>
          <br/>
          <input type="text" className="form-control" name="direccion" onChange={handleChange} placeholder="Introdusca su Direccion"/>
          <label>Telefono:</label>
          <br/>
          <input type="text" className="form-control" name="telefono" onChange={handleChange} placeholder="Introdusca su Telefono"/>
          <label>Fecha De Nacimiento:</label>
          <br/>
          <input type="date" className="form-control" name="fecha_nacimiento" onChange={handleChange}/>
          
          <label>Id Puesto:</label>
          <br/>
          <input type="number" className="form-control" name="id_puesto" onChange={handleChange} placeholder="Introdusca su Id de Puesto"/>
        </div>
       </ModalBody>
       <ModalFooter>
       <button className="btn btn-primary" onClick={()=>peticionPost()}>Agregar</button>{"    "}
       <button className="btn btn-danger" onClick={()=>AbrirCerrarModalAgregar()}>Cancelar</button>
       </ModalFooter>
     </Modal>

     
     <Modal isOpen={modalModificar}>
       <ModalHeader>Modificar Empleado</ModalHeader>
       <ModalBody>
        <div className="form-group">
          <label>ID:</label>
          <br/>
          <input type="number" className="form-control" name="id_Empleados" value={gestorSeleccionado && gestorSeleccionado.id_Empleados} readOnly/>
          <label>Codigo:</label>
          <br/>
          <input type="text" className="form-control" name="codigo" value={gestorSeleccionado && gestorSeleccionado.codigo} onChange={handleChange}/>
          <label>Nombres:</label>
          <br/>
          <input type="text" className="form-control" name="nombres" value={gestorSeleccionado && gestorSeleccionado.nombres} onChange={handleChange}/>
          <label>Apellidos:</label>
          <br/>
          <input type="text" className="form-control" name="apellidos" value={gestorSeleccionado && gestorSeleccionado.apellidos} onChange={handleChange}/>
          <label>Direccion:</label>
          <br/>
          <input type="text" className="form-control" name="direccion" value={gestorSeleccionado && gestorSeleccionado.direccion} onChange={handleChange}/>
          <label>Telefono:</label>
          <br/>
          <input type="text" className="form-control" name="telefono" value={gestorSeleccionado && gestorSeleccionado.telefono} onChange={handleChange}/>
          <label>Fecha De Nacimiento:</label>
          <br/>
          <input type="text" className="form-control" name="fecha_nacimiento" value={gestorSeleccionado && gestorSeleccionado.fecha_nacimiento} onChange={handleChange}/>
          <label>Id Puesto:</label>
          <br/>
          <input type="text" className="form-control" name="id_puesto" value={gestorSeleccionado && gestorSeleccionado.id_puesto} onChange={handleChange}/>
        </div>
       </ModalBody>
       <ModalFooter>
       <button className="btn btn-primary" onClick={()=>peticionPut()}>Modificar</button>
       <button className="btn btn-danger" onClick={()=>AbrirCerrarModalModificar()}>Cancelar</button>
       </ModalFooter>
     </Modal>


     <Modal isOpen={modalEliminar}>
       <ModalBody>
         ¡¿Estas Seguro que deseas Eliminar a {gestorSeleccionado && gestorSeleccionado.nombres} de la base de datos??!!
       </ModalBody>
       <ModalFooter>
         <button className="btn btn-danger" onClick={()=>peticionDelete()}>
           Sí
         </button>
         <button className="btn btn-secondary" onClick={()=>AbrirCerrarModalEliminar()}>
           No
         </button>
       </ModalFooter>
     </Modal>
    </div>
  );

}

export default App;
