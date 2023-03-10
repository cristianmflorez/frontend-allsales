import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Cart } from "../modals/Cart";
import { Login } from "../modals/Login";
import { CreateAccount } from "../modals/CreateAccount";
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

function Header(params) {

    const [user, setUser] = useState ([]);
    const [searchValue, setSearchValue] = useState ([]);
    const [id, setId] = useState ([]);

    useEffect(()=>{
        if(document.cookie){
            fetch(`http://localhost:3001/profile/`,{method: 'GET', credentials:'include'})
            .then(response => response.json())
            .then(data => {
                setId(data.id);
            })
            .catch(error => console.log(error));
        }
        setUser(document.cookie);
    }, [])

    function eraseCookie(name) {
        cookies.remove(name);
        window.location.reload(true);
    }

    const onSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    };

    const resetSearch = (event) => { 
        document.getElementById('searchInput').value='';
    }

    return(
        <>
            <p className="m-0 text-center text-light bg-danger d-none d-sm-block">
                ¡ Disfruta nuestra temporada de ofertas !
            </p>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container className="justify-content-between">
                
                <Navbar.Brand href="#/" className="my-1 fw-semibold d-flex">
                        <img
                    alt=""
                    src="/logo.png"
                    width="40"
                    height="40"
                    className="d-inline-block align-top mx-3"
                    />{<p className="m-1">ALL SALES</p>}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
                    <Nav className="ms-auto">
                        <NavDropdown title="Categorías" id="collasible-nav-dropdown" className="my-1 text-light">
                            <NavDropdown.Item href="#/category/1">Vestuario</NavDropdown.Item>
                            <NavDropdown.Item href="#/category/2">Tecnología</NavDropdown.Item>
                            <NavDropdown.Item href="#/category/3">Hogar</NavDropdown.Item>
                            <NavDropdown.Item href="#/category/4">Deportes</NavDropdown.Item>
                        </NavDropdown>
                        <Form className="d-flex my-2">
                        <Form.Control
                            type="search"
                            placeholder="Buscar"
                            className="me-2"
                            onChange={onSearchValueChange}
                            id='searchInput'
                        />
                        <Nav.Link href={searchValue.length>0?`#/search/${searchValue}`:'#'} onClick={resetSearch} className="p-0"><Button variant="outline-danger">Buscar</Button></Nav.Link>
                        </Form>
                        
                    </Nav>
                    <Nav.Link href='#' className="my-0 m-auto text-light fs-4">
                        <Cart
                            updateCart={params.updateCart}
                            lastCartUpdate={params.lastCartUpdate}
                        />
                    </Nav.Link>
                    {!user && <Nav className={`ms-auto`}>
                        <Nav.Link href='#'><CreateAccount/></Nav.Link>
                        <Nav.Link href='#'><Login/></Nav.Link>
                    </Nav>}
                    {user[1] && <Nav className={`ms-auto`}>
                        <Nav.Link href={`#/profile/${id}`} variant="dark" type='submit'>
                            <Button variant="dark" className='m-0'>
                                 Usuario
                            </Button>
                        </Nav.Link>
                        <Nav.Link variant="dark" type='submit' onClick={()=>eraseCookie('auth')}>
                            <Button variant="dark" className='m-0'>
                                 Cerrar sesión
                            </Button>
                        </Nav.Link>
                    </Nav>}
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </>
    );
}

export {Header};