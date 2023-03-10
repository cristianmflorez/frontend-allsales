import React, { useState, useEffect } from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useForm } from 'react-hook-form';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { Coment } from './Coment';

function ComentsProduct() {

    const [coments, setComents] = useState ([]);
    const {register, formState: {errors}, handleSubmit, reset  } = useForm();
    const { id } = useParams();

    const [comentArea, setComentArea] = useState("");
    const onInput = (e) => setComentArea(e.target.value);

    useEffect(()=> {

        fetch(`http://localhost:3001/coment/${id}` )
        .then(response => response.json())
        .then(data => {
            setComents(data);
        })
        .catch(error => console.log(error));
        
    }, []);

    const onSubmit = async (data) => {
        data = {
            ...data,
            productId:id
        }
        await fetch(`http://localhost:3001/coment/`, {method: 'POST',body:JSON.stringify(data), credentials:'include', headers: {'Content-type': 'application/json'}})
        .then(response => response.json())
        .then(data => {
          Swal.fire({
            title: data,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
          });
        })
        .catch(error => console.log(error));

        fetch(`http://localhost:3001/coment/${id}` )
        .then(response => response.json())
        .then(data => {
            setComents(data);
        })
        .catch(error => console.log(error));

        setComentArea('');
        
      }


    const deleteComent = async (comentId) => {
        await fetch(`http://localhost:3001/coment/${comentId}`, {method: 'DELETE', credentials:'include'})
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: data,
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'Aceptar'
                });
            })
            .catch(error => console.log(error));

        fetch(`http://localhost:3001/coment/${id}` )
            .then(response => response.json())
            .then(data => {
                setComents(data);
            })
            .catch(error => console.log(error));
    }


    return(
        <div className="w-75 mx-auto">  
            
            <h3 className="m-3 mt-5 p-2 text-center text-light bg-secondary ">Comentarios</h3>
            {coments && coments.map((coment, i) => (
                <Coment 
                    key={i}
                    coment={coment}
                    user={coment.user}
                    onAction={deleteComent}
                />
            ))}
            

            <Card className="m-4 my-0 bg-light">
                <Container className="row mx-0 px-0">
                    <Col className="m-0">
                        <Card.Body className="card-body px-0 ms-2">
                            <Form name='comentForm'>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Comenta..."
                                    style={{ height: '100px' }}
                                    className="my-2"
                                    name='text'
                                    value={comentArea} 
                                    onInput={onInput}
                                    {...register('text', {
                                        required: true,
                                    })}
                                />
                                {(errors.coment?.type === 'required') && <p className="text-danger">Aún no escribes un comentario</p>}
                                <Button variant="danger" className='ms-auto mb-2' href="#/create-product" onClick={handleSubmit(onSubmit)}>Comentar</Button>
                            </Form>
                        
                        </Card.Body>
                    </Col>
                </Container>
            </Card>
            
        </div>
    )
}

export {ComentsProduct};