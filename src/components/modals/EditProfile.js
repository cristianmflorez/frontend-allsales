import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useForm } from 'react-hook-form';
import { FiEdit3 } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';

function EditProfile(params) {
    const [show, setShow] = useState(false);
    const [info, setInfo] = useState ([]);
    const {register, formState: {errors}, handleSubmit } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const cookies = new Cookies();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
      if(document.cookie){
          fetch(`http://localhost:3001/profile/`,{method: 'GET', credentials:'include'})
          .then(response => response.json())
          .then(data => {
              setInfo(data);
          })
          .catch(error => console.log(error));
      }
    }, []);

    const onSubmit = async (data) => {

      let formData = new FormData();
      formData.append('name', data.name);
      if(data.image.length>0)formData.append('image', data.image[0]);
      formData.append('description', data.description);

      await fetch(`http://localhost:3001/profile/${id}`, {method: 'PATCH',body:formData, credentials:'include'})
      .then(response => response.json())
      .then(data => {
        Swal.fire({
          title: data,
          confirmButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        });
      })
      .catch(error => console.log(error));
      handleClose();

      params.onAction();
      //navigate(`/profile/${id}`); falta forma de actualizar
    }

    const deleteUser = async () => {
      handleClose();
      const { value: password } = await Swal.fire({
        title: '¿Estás seguro?',
        input: 'password',
        inputLabel: 'Confirma tu contraseña y presiona ELIMINAR',
        inputPlaceholder: 'contraseña',
        inputAttributes: {
          autocapitalize: 'off',
          autocorrect: 'off'
        },
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      })

      if (password) {
        await fetch(`http://localhost:3001/profile/${id}`, {method: 'DELETE', body: JSON.stringify({password}), credentials:'include', headers: {'Content-type': 'application/json'}})
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: data,
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'Aceptar'
                });
                if(data!=='Contraseña incorrecta'){
                  navigate(`/`);
                  cookies.remove('auth');
                  window.location.reload(true);
                }
                
            })
            .catch(error => console.log(error));
      }
    }



    return (
        <>
        <Button variant="outline-danger" onClick={handleShow} className='mx-1 border-0 fs-4'>
            <FiEdit3/>
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>EDITAR PERFIL</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Form.Group className="mb-3" controlId="">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="name"  defaultValue={info.name} {...register('name')}/>
            </Form.Group>

            <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>Foto de perfil</Form.Label>
                <Form.Control type="file" size="sm" {...register('image', {
                     validate: {
                      acceptedFormats: files => {
                      
                            let formatoEr = true;
        
                            for(let file of files){
                              if(!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)){
                                    formatoEr = false
                              }
                            }
        
                            return formatoEr||'Only PNG, JPEG o JPG';
                        }}
                    })}/>
                    {(errors.image?.message) && <p className="text-danger">La imagen debe ser formato JPG, JPEG o PNG</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Un poco sobre ti</Form.Label>
                <Form.Control as="textarea" rows={3} defaultValue={info.description} {...register('description')}/>
            </Form.Group>

            </Modal.Body>
            <Modal.Footer>
              <div className='my-3 me-auto'>
                <Button variant="danger" className='mx-2' type='submit' onClick={handleSubmit(onSubmit)}>
                  Guardar
                </Button>
                <Button variant="secondary" className='mx-2' onClick={handleClose}>
                  Cancelar
                </Button>
              </div>
              <Button variant="danger" className='my-3' type='submit' onClick={deleteUser}>
                  Eliminar perfil
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export {EditProfile};