import React, { useState, useEffect } from "react";
import { Container, Col } from "react-bootstrap";
import { MainCard } from "../product/cards/MainCard";

function Offers(params) {

    const [products, setProducts] = useState ([]);

    useEffect(()=> {
        fetch(`http://localhost:3001/filter/discount`)
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                
            })
            .catch(error => console.log(error));
    }, []);

    return(
        <>
            {products[0]?<>
            <h3 className="m-3 mt-5 p-2 text-center text-light bg-danger ">Artículos en oferta</h3>

            <Container className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 p-3 m-auto mb-5">
                {products.slice(0,3).map(product => (
                    product.amount>0 &&
                    <Col key={product.id} className="my-0">
                        <MainCard 
                            product={product}
                        />
                    </Col>
                ))}
            </Container>
            </>:null}
        </>
    )
}

export {Offers};