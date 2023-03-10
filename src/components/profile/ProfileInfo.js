import React from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { EditProfile } from '../modals/EditProfile';

function ProfileInfo(params) {

    return(
        <>
            {params.user.name!==undefined?<Card className="m-4">
                <Container className="row row-cols-1 row-cols-sm-2">
                    <Col xs={12} sm={6} md={6} lg={4} xl={3}>
                        <Card.Img src={`http://localhost:3001/users/${params.user.image}`} className="img-fluid rounded-start m-2" alt="..." height="200" />
                    </Col>
                    <Col xs={0} sm={6} md={6} lg={8} xl={9}>
                        <Card.Body className="card-body">
                        <Card.Title className="text-danger">{params.user.name}</Card.Title>
                            <Card.Text className="">{params.user.description}</Card.Text>
                            <Card.Subtitle className=""><small className="text-muted">Con nosotros desde {params.user.createdAt.slice(0,10)}</small></Card.Subtitle>
                            <div className='d-flex mt-4'>
                                {params.owner===true?<EditProfile onAction={params.onAction}/>:null}
                                {params.owner===true?<Button variant="danger" className='m-auto' href="#/create-product">Crear producto</Button>:null}
                            </div>
                        </Card.Body>
                        
                    </Col>
                    
                </Container>
            </Card>:null}
        </>       
    )
}

export {ProfileInfo};