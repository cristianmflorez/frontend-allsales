import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";
import {useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function EditProduct(params) {

    const [product, setProduct] = useState ([]);
    const {register,formState: {errors}, handleSubmit } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(document.cookie){
            fetch(`http://localhost:3001/product/${id}`,{method: 'GET'})
            .then(response => response.json())
            .then(data => {
                setProduct(data.rta);
            })
            .catch(error => console.log(error));
        }
      }, []);
  
      const onSubmit = async (data) => {

        let formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        if(data.discount>0)formData.append('discount', data.discount);
        formData.append('amount', data.amount);
        formData.append('description', data.description);
        formData.append('categoryId', data.categoryId);

        if(data.image.length>0){
            for(let img of data.image){
                formData.append('image', img );
            }
        }

        await fetch(`http://localhost:3001/product/${id}`, {method: 'PATCH',body: formData, credentials:'include'})
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                title: data,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Aceptar'
            });;
          navigate(`/product/${id}`);
        })
        .catch(error => console.log(error));        
      }

      const deleteProduct = async () => {

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
            await fetch(`http://localhost:3001/product/${id}`, {method: 'DELETE', body: JSON.stringify({password}), credentials:'include', headers: {'Content-type': 'application/json'}})
                .then(response => response.json())
                .then(data => {
                    Swal.fire({
                        title: data,
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'Aceptar'
                    });
                    navigate(`/profile/${product.user.id}`);
                })
                .catch(error => console.log(error));
          }
      }

    return(
        <div className="w-75 m-auto my-5">
            <h3 className="text-center text-danger">EDITAR PRODUCTO</h3>
            <h4 className="mt-5">Nombre del producto</h4>
            <Form.Control
                type="name"
                defaultValue={product.name} {...product.name && register('name')}
            />
            <div className="d-flex justify-content-between row row-cols-1 row-cols-md-2">
                <div className="d-flex h-75">
                    <h4 className="mt-5">Precio</h4>
                    <Form.Control
                        type="number"
                        id="price"
                        className=" mt-auto mx-2 mb-2"
                        defaultValue={product.price} {...product.price && register('price')}
                    />
                </div>
                <div className="d-flex h-75">
                    <h4 className="mt-5">Descuento</h4>
                    <Form.Control
                        type="number"
                        id="discount"
                        className=" mt-auto mx-2 mb-2"
                        defaultValue={product.discount} {...register('discount')}
                    />
                </div>
                <div className="d-flex h-75">
                    <h4 className="mt-5">Categoría</h4>
                    <Form.Select aria-label="Floating label select example" className="h-75 mt-auto mx-2 mb-2" 
                    defaultValue={product.categoryId} {...product.categoryId && register('categoryId')}>
                        <option disabled value="0">Categoría</option>
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
                        defaultValue={product.amount} {...product.amount && register('amount')}
                    />
                </div>
            </div>
            <h4 className="mt-5">Descripción</h4>
            <Form.Control
                as="textarea"
                placeholder="Descripción..."
                style={{ height: '100px' }}
                defaultValue={product.description} {...product.description && register('description')}
            />
            <h4 className="mt-4">Imágenes</h4>
            <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Control type="file" multiple {...product.image && register('image', {
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
            
            <div className='d-flex gap-2 w-75 m-auto my-5 justify-content-around'>
                <Button variant="danger" size="lg" type='submit' onClick={handleSubmit(onSubmit)}>Editar</Button>
                <Button variant="secondary" size="lg" href={`/#/product/${id}`}>Cancelar</Button>{' '}
                <Button variant="danger" size="lg" onClick={deleteProduct}>Eliminar</Button>{' '}
            </div>
            </Form.Group>
        </div>
    )
}

export { EditProduct };