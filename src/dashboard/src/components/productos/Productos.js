import React from 'react';
import "./Productos.css"

function Productos() {
    return (
        <div>
            <p>Productos:</p>
            <div className='container-productos'>

                <div className='container-tot-productos'>
                    <h3>Cantidad de Productos</h3>
                </div>
                <div className='container-ult-producto'>
                    <h3>Ultimo Producto creado</h3>
                </div>


            </div>
        </div>
     );
  }

export default Productos;