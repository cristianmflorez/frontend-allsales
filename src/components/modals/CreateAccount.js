import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

function CreateAccount(params) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {register, formState: {errors}, handleSubmit, getValues } = useForm();
    

    const onSubmit = async (data) => {

      let formData = new FormData();
      
      formData.set('name', data.name);
      formData.set('email', data.email);
      formData.set('password', data.password);
      formData.set('image', data.image[0]);
      formData.set('description', data.description);

      await fetch('https://backend-allsales.vercel.app/profile/', {method: 'POST', body:formData, method:'no-cors'})
      .then(response => response.json())
      .then(data => {
        console.log(data)
        Swal.fire({
          title: data,
          confirmButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        });
      })
      .catch(error => console.log(error));
      handleClose();
    }

    return (
        <>
        <Button variant="dark" onClick={handleShow} className='me-auto '>
            Crear cuenta
        </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>CREAR CUENTA</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              
            <Form.Group className="mb-3" controlId="">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Nombre y apellido" name='name' {...register('name', {
                      required: true,
                    })}/>
                    {(errors.name?.type === 'required') && <p className="text-danger">Campo obligatorio</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" placeholder="Correo" {...register('email', {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                    })}/>
                    {(errors.email?.type === 'required') && <p className="text-danger">Campo obligatorio</p>}
                    {(errors.email?.type === 'pattern') && <p className="text-danger">Debes ingresar un email valido</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Password" name='password' {...register('password', {
                      required: true,
                      minLength: 6
                    })}/>
                    {(errors.password?.type === 'required') && <p className="text-danger">Campo obligatorio</p>}
                    {(errors.password?.type === 'minLength') && <p className="text-danger">La contraseña debe tener por lo menos 6 caracteres</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
                <Form.Label>Confirmar contraseña</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" name='confirmPassword'{...register('confirmPassword', {
                      required: true,
                      validate: (match) => {
                        const password = getValues("password")
                        return match === password || "Passwords should match!"
                    }
                  })}/>
                  {(errors.confirmPassword?.type === 'required') && <p className="text-danger">Campo obligatorio</p>}
                  {errors.confirmPassword?.message && <p className="text-danger">Las contraseñas no coinciden</p>}
            </Form.Group>

            <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>Foto de perfil</Form.Label>
                <Form.Control type="file" size="sm" {...register('image', {
                      required: true,
                      validate: {
                        acceptedFormats: files => ['image/jpeg', 'image/png', 'image/jpg'].includes(files[0]?.type)||'Only PNG, JPEG o JPG'}
                    })}/>
                    {(errors.image?.type === 'required') && <p className="text-danger">Campo obligatorio</p>}
                    {(errors.image?.message) && <p className="text-danger">La imagen debe ser formato JPG, JPEG o PNG</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Un poco sobre ti</Form.Label>
                <Form.Control as="textarea" rows={3} {...register('description', {
                      required: true,
                    })}/>
                    {(errors.description?.type === 'required') && <p className="text-danger">Campo obligatorio</p>}
            </Form.Group>
            </Modal.Body>
            
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="danger" type='submit' onClick={handleSubmit(onSubmit)}>
                Crear
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export {CreateAccount};