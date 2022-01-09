import React from 'react';
import "./Usuarios.css"
import { Component } from "react";


    class Usuarios extends Component {
        constructor(props) {
          super(props);
          this.state = {
            listadoUsuarios: [],
            ultimoUsuario: []
          };
        }
      
        componentWillMount() {
          fetch("https://besttires.herokuapp.com/api/users")
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
              this.setState({ listadoUsuarios: data });
              this.setState({
                ultimoUsuario: data.data[data.data.length - 1].email,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
        render() {
          let usuarios = this.state.listadoUsuarios;
          let contenido;
          let ultimoUsuario;
      
          if (usuarios.length === 0) {
            contenido = "Cargando...";
            ultimoUsuario = "Cargando...";
          } else {
            contenido = usuarios.count;
            ultimoUsuario = this.state.ultimoUsuario;
          }
      
          return (
              
            <div>

                  <div>
                      <p>Usuarios:</p>
                      <div className='container-usuarios'>

                          <div className='container-tot-usuarios'>
                              <h3>Cantidad de Usuarios</h3> <h5>{contenido}</h5>
                          </div>
                          <div className='container-ult-usuario'>
                              <h3>Ultimo usuario creado</h3> <h5>{ultimoUsuario}</h5>
                          </div>


                      </div>
                  </div>

             
            </div>
          );
        }
      }


export default Usuarios;