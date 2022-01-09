import React from 'react';
import "./Fabricantes.css"
import { Component } from "react";


    class Fabricantes extends Component {
        constructor(props) {
          super(props);
          this.state = {
            listadoFabricantes: [],
          };
        }
      
        componentWillMount() {
          fetch("https://besttires.herokuapp.com/api/fabricantes")
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
              this.setState({ listadoFabricantes: data });
            })
            .catch((error) => {
              console.log(error);
            });
        }
        render() {
          let productos = this.state.listadoFabricantes;
          let contenido;
          if (productos.length === 0) {
            contenido = "Cargando...";
          } else {
            contenido = productos.count;
          }
      
          return (
              <div>
                  <p>Fabricantes:</p>
                  <div className='container-fabricantes'>

                      <div className='container-tot-fabricantes'>
                          <h3>Cantidad de Fabricantes</h3>
                          <h5>{contenido}</h5>
                      </div>

                  </div>
              </div>
          );
        }
      }


export default Fabricantes;



        

