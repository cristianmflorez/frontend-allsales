import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CartCard } from '../product/cards/CartCard';
import { BsCartFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Cart(params) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [products, setProducts] = useState ([]);

  const navigate = useNavigate();

  useEffect(()=> {
      if(sessionStorage.cart){
        let cartProducts = sessionStorage.cart.split(',');
        let ids = [];
        cartProducts.forEach(function (id) {
                ids.push(id);
        });
        
        fetch(`http://localhost:3001/filter/recentviews`, {method: 'POST', body:JSON.stringify(ids), headers: {"Content-Type": "application/json"}} )
          .then(response => response.json())
          .then(data => {
              setProducts(data);
          })
          .catch(error => console.log(error));
      }else{
        setProducts([]);
      }
  }, [params.lastCartUpdate]);

  function removeCart(idItem) {
    let cartItems = sessionStorage.cart.split(',');
    let newCartItems = cartItems.filter(item => parseInt(item) !== idItem);
    let ids = [];

    sessionStorage.cart=[newCartItems]
    newCartItems.forEach(function (id) {
              ids.push(id);
    });

    fetch(`http://localhost:3001/filter/recentviews`, {method: 'POST', body:JSON.stringify(ids), headers: {"Content-Type": "application/json"}} )
        .then(response => response.json())
        .then(data => {
            setProducts(data);
        })
        .catch(error => console.log(error));

    params.updateCart(`remove cart ${idItem}`)
  }

  function buy(){
    let cartProducts = sessionStorage.cart.split(',');
    let ids = [];
    
    cartProducts.forEach(function (id) {
            ids.push(id);
    });
      
    fetch(`http://localhost:3001/buy/`, {method: 'POST', body:JSON.stringify(ids), credentials:'include', headers: {"Content-Type": "application/json"}} )
        .then(response => response.json())
        .then(data => {
          if(data!=='Sesión no iniciada'){
            Swal.fire({
              title: data,
              confirmButtonColor: '#d33',
              confirmButtonText: 'Aceptar'
            });
            sessionStorage.cart=[];
            navigate(`/`)
          }else{
            Swal.fire({
              title: data,
              confirmButtonColor: '#d33',
              confirmButtonText: 'Aceptar'
            });
          }
          
        })
        .catch(error => console.log(error));

        handleClose();
  }

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        <BsCartFill className='fs-4'/>
      </Button>
      
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>CARRO DE COMPRAS</Modal.Title>
          </Modal.Header>

          {products[0]?<Modal.Body className='d-flex row m-auto justify-content-around'>
              {products.map((product,i) => (
                  <CartCard 
                    key={i}
                    product={product}
                    onAction={removeCart}
                  />
              ))}
          </Modal.Body>:null}

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="danger" onClick={buy}>
              Pagar
            </Button>
          </Modal.Footer>
        </Modal>
      
      
    </>
  );
}

export {Cart};