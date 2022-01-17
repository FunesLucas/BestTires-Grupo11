import React from 'react';
import "./Productos.css"
import { Component } from "react";


    class Usuarios extends Component {
        constructor(props) {
          super(props);
          this.state = {
            listadoProductos: [],
            ultimoProducto: []
          };
        }
      
        componentWillMount() {
          fetch("http://localhost:3001/api/products")
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
              this.setState({ listadoProductos: data });
              this.setState({
                ultimoProducto: data.data[data.data.length - 1].modelo,
              });
              this.setState({ marcaUltProducto: data.data[data.data.length - 1].marca });
            })
            .catch((error) => {
              console.log(error);
            });
        }
        render() {
          let productos = this.state.listadoProductos;
          let contenido;
          let ultimoProducto;
          let marcaUltProducto;
          if (productos.length === 0) {
            contenido = "Cargando...";
            ultimoProducto = "Cargando...";
          } else {
            contenido = productos.count;
            ultimoProducto = this.state.ultimoProducto;
            marcaUltProducto = this.state.marcaUltProducto;
          }
      
          return (
              <div>
                  <p>Productos:</p>
                  <div className='container-productos'>

                      <div className='container-tot-productos'>
                          <h3>Cantidad de Productos</h3> <h5>{contenido}</h5>
                      </div>
                      <div className='container-ult-producto'>
                          <h3>Ultimo Producto creado</h3>
                          <div className='ult-producto'>
                              <h5>{marcaUltProducto}</h5><h5>{ultimoProducto}</h5>
                          </div>

                      </div>


                  </div>
              </div>
          );
        }
      }


export default Usuarios;

