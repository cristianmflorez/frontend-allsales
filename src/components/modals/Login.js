import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useForm } from 'react-hook-form';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
 
const cookies = new Cookies();

function Login(params) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {register, formState: {errors}, handleSubmit } = useForm();
    

     const onSubmit = async (data) => {
        fetch('https://backend-allsales.vercel.app/login/', {method: 'POST',body: JSON.stringify(data), headers: {'Content-type': 'application/json'}})
        .then(response => response.json())
        .then(data => {
          if(data!=='Los datos no coinciden para ninguno de nuestros usuarios'){
            cookies.set('auth', data);
            window.location.reload(true);
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
        <Button variant="dark" onClick={handleShow} className='m-0'>
            Ingresar
        </Button>

          <Modal show={show} onHide={handleClose}>
              
                <Modal.Header closeButton>
                  <Modal.Title>INICIAR SESIÓN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control type="email" placeholder="correo@ejemplo.com" {...register('email', {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                    })}/>
                    {(errors.email?.type === 'pattern') && <p className="text-danger">Debes ingresar un email valido</p>}
                    {(errors.email?.type === 'required') && <p className="text-danger">Debes ingresar un email</p>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...register('password', {
                      required: true,
                      minLength: 6
                    })}/>
                    {(errors.password?.type === 'required') && <p className="text-danger">Debes ingresar una contraseña</p>}
                    {(errors.password?.type === 'minLength') && <p className="text-danger">La contraseña debe tener por lo menos 6 caracteres</p>}
                </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button variant="danger" type='submit' onClick={handleSubmit(onSubmit)}>
                    Entrar
                  </Button>
                </Modal.Footer>
            
          </Modal>
        </>
      );
}

export {Login};