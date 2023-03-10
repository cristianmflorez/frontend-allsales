import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function CreateProduct(params) {

    const {register, formState: {errors}, handleSubmit } = useForm();
    const [id, setId] = useState ([]);
    const navigate = useNavigate();

    useEffect(()=>{
        if(document.cookie){
            fetch(`http://localhost:3001/profile/`,{method: 'GET', credentials:'include'})
            .then(response => response.json())
            .then(data => {
                setId(data.id);
            })
            .catch(error => console.log(error));
        }
    }, [id])

    const onSubmit = async (data) => {
        let formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        if(data.discount>0)formData.append('discount', data.discount);
        formData.append('amount', data.amount);
        formData.append('description', data.description);
        formData.append('categoryId', data.categoryId);
        formData.append('userId', id);

        for(let img of data.image){
            formData.append('image', img );
        }

        await fetch('http://localhost:3001/product/', {method: 'POST', body: formData, credentials:'include'})
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                title: data,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Aceptar'
            });
          navigate(`/profile/${id}`)
        })
        .catch(error => console.log(error));
    }

    return(
        <div className="w-75 m-auto my-5">
            <h3 className="text-center text-danger">CREAR PRODUCTO</h3>
            <h4 className="mt-5">Nombre del producto</h4>
            <Form.Control
                id="name"
                aria-describedby="passwordHelpBlock"
                {...register('name', {
                    required: true,
                })}/>
                {(errors.name?.type === 'required') && <p className="text-danger">Campo obligatorio</p>}
            <div className="d-flex justify-content-between row row-cols-1 row-cols-md-2">
                <div className="d-flex h-75">
                    <h4 className="mt-5">Precio</h4>
                    <Form.Control
                        type="number"
                        id="price"
                        className=" mt-auto mx-2 mb-2"
                        {...register('price', {
                            required: true,
                          })}/>
                          {(errors.price?.type === 'required') && <p className="text-danger mt-auto mb-2">Campo obligatorio</p>}
                </div>
                <div className="d-flex h-75">
                    <h4 className="mt-5">Descuento</h4>
                    <Form.Control
                        type="number"
                        id="discount"
                        className=" mt-auto mx-2 mb-2"
                        {...register('discount')}
                    />
                </div>
                <div className="d-flex h-75">
                    <h4 className="mt-5">Categoría</h4>
                    <Form.Select aria-label="Floating label select example" className="h-75 mt-auto mx-2 mb-2" {...register('categoryId', {
                            required: true,
                        })}>
                        <option value="1">Vestuario</option>
                        <option value="2">Tecnología</option>
                        <option value="3">Hogar</option>
                        <option value="4">Deportes</option>
                    </Form.Select>
                </div>
                <div className="d-flex h-75">
                    <h4 className="mt-5">Unidades</h4>
                    <Form.Control
                        type="number"
                        id="discount"
                        className=" mt-auto mx-2 mb-2"
                        {...register('amount', {
                            required: true,
                          })}/>
                    {(errors.amount?.type === 'required') && <p className="text-danger mt-auto mb-2">Campo obligatorio</p>}
                </div>
            </div>
            <h4 className="mt-5">Descripción</h4>
            <Form.Control
                as="textarea"
                placeholder="Descripción..."
                style={{ height: '100px' }}
                {...register('description', {
                    required: true,
                  })}/>
            {(errors.description?.type === 'required') && <p className="text-danger">Campo obligatorio</p>}
            <h4 className="mt-4">Imágenes</h4>
            <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Control type="file" multiple {...register('image', {
                required: true,
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
            {(errors.image?.type === 'required') && <p className="text-danger">Campo obligatorio</p>}
            {(errors.image?.message) && <p className="text-danger">La imagen debe ser formato JPG, JPEG o PNG</p>}

            <div className='d-flex gap-2 w-50 m-auto my-5 justify-content-around'>
                <Button variant="danger" size="lg"  type='submit' onClick={handleSubmit(onSubmit)}>Crear</Button>
                <Button variant="secondary" size="lg" href="#/">Cancelar</Button>
            </div>
            </Form.Group>
        </div>
    )
}

export { CreateProduct};