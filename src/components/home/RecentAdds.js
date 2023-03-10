import React, { useState, useEffect } from "react";
import { Container, Col } from "react-bootstrap";
import { MainCard } from "../product/cards/MainCard";

function RecentAdds(params) {

    const [products, setProducts] = useState ([]);

    useEffect(()=> {
        fetch(`http://localhost:3001/filter/lastadds`)
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => console.log(error));
    }, []);

    return(
        <>
            {products[0]?<>
                <h3 className="m-3 mt-5 p-2 text-center text-light bg-danger ">Añadidos recientemente</h3>

            <Container className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 p-3 m-auto ">

                {products.slice(0,6).map(product => (
                    product.amount>0 &&
                    <Col key={product.id} className="my-3">
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

export {RecentAdds};