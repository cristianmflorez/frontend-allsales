import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { BsGithub, BsLinkedin } from "react-icons/bs";

function Footer(props) {
    return(
        <div >
            <div className="text-light bg-dark p-5">
                <Container>
                    <Row >
                        <Col className="d-flex text-center fw-semibold fs-3">
                            <img
                            alt=""
                            src="/logo.png"
                            width="60"
                            height="60"
                            className="d-inline-block align-top mx-3"
                            ></img>{<p className="d-none d-lg-block m-2">ALL SALES</p>}
                        </Col>
                        <Col className="text-center d-none d-sm-block">
                            <p className="mb-0">CONTACTO</p>
                            <p>cristianmflorez@gmail.com</p>
                        </Col>
                        <Col className="text-end justify-content-end d-flex">
                            <Nav.Link href="https://github.com/cristianmflorez" target="_blank"><BsGithub className="fs-1 m-3"/></Nav.Link>
                            <Nav.Link href="https://www.linkedin.com/in/cristianmflorez" target="_blank"><BsLinkedin  className="fs-1 m-3"/></Nav.Link>
                        </Col>
                    </Row>
                </Container>
            </div>
            <p className="m-0 text-center text-dark d-none d-sm-block">Cristian Florez</p>
            <p className="m-0 text-center text-dark d-sm-none">cristianmflorez@gmail.com</p>
        </div>
        
    )
}

export {Footer};