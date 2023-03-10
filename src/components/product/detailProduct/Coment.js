import React, { useState, useEffect } from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

function Coment(params) {

    const [userId, setUserId] = useState ([]);

    useEffect(()=> {

        if(document.cookie){
            fetch(`http://localhost:3001/profile/`,{method: 'GET', credentials:'include'})
            .then(response => response.json())
            .then(data => {
                setUserId(data.id);
            })
            .catch(error => console.log(error));
        }
        
    }, []);


    const deleteComent = async () => {
        console.log(params.coment.id);
        await fetch(`http://localhost:3001/coment/${params.coment.id}`, {method: 'DELETE', credentials:'include'})
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: data,
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'Aceptar'
                });
            })
            .catch(error => console.log(error));
    }

    return(
        
            
            <Card className="m-4 my-0 bg-light">
                <Container className="row mx-0 px-0">
                    <Col sm={3} md={3} lg={2} xl={2} className="d-none d-sm-block">
                        <Card.Img src={`http://localhost:3001/users/${params.coment.user.image}`} className="img-fluid rounded-start m-2" alt="..." height="200" />
                    </Col>
                    <Col xs={12} sm={9} md={9} lg={10} xl={10} className="m-0">
                        <Card.Body className="card-body px-0 ms-2">
                        <Card.Link className="text-decoration-none text-danger fs-4 fw-semibold" href={`#/profile/${params.coment.userId}`}>{params.coment.user.name}</Card.Link>
                        <Card.Text className="w-100">{params.coment.coment}</Card.Text>
                        {userId===params.coment.userId && <Button variant="outline-danger" className='ms-auto border-0' onClick={()=> params.onAction(params.coment.id)}>Eliminar</Button>}
                        </Card.Body>
                    </Col>
                </Container>
            </Card>
        
    )
}

export {Coment};