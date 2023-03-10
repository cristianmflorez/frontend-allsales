import React from "react";
import Button from 'react-bootstrap/Button';
import {Card, Col, Container} from 'react-bootstrap';

function CartCard(params) {

    return (
        <>
            {params.product!== null && <Card className="m-4">
                <Container className="row">
                    <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Card.Img src={`http://localhost:3001/products/${params.product.image[0]}`} className="img-fluid rounded-start m-2" alt="..." height="200" />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Card.Body className="card-body">
                        <Card.Title className="text-danger">{params.product.name}</Card.Title>
                        <div className="d-flex">
                        <Card.Subtitle className="mb-2 text-muted text-decoration-line-through">${params.product.price}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 mx-4 text-danger">${((params.product.price)-(params.product.price*params.product.discount/100))}</Card.Subtitle>
                        
                        </div>
                            <Card.Subtitle className='text-muted mb-2'>Unidades: 1</Card.Subtitle>
                            <div className='d-flex mt-4'>
                                <Button variant="danger" className='m-auto' href="#/create-product" onClick={()=>params.onAction(params.product.id)}>Quitar</Button>
                            </div>
                        </Card.Body>
                        
                    </Col>
                </Container>
            </Card>}
        </>
    )
}

export {CartCard};