import React,{ useState, useEffect } from 'react';
import { Container, Col } from "react-bootstrap";
import { MainCard } from "../product/cards/MainCard";
import { useParams } from "react-router-dom";

function ProfileProducts(params) {

    const [products, setProducts] = useState ([]);
    const { id } = useParams();

    useEffect(()=> {
        fetch(`http://localhost:3001/filter/user/${id}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => console.log(error));
    }, [id]);

    return(
        <>
            {params.user.name!==undefined? <div className='m-4'>
                <h3 className="m-3 p-2 text-center text-light bg-danger w-100">Productos vendidos por este usuario</h3>

                <Container className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 p-3">
                    {}
                    {products && products.map(product => (
                        product.amount>0 &&
                        <Col key={product.id} className="my-3">
                            <MainCard 
                                product={product}
                            />
                        </Col>
                    ))}
                </Container>
            </div>:null}
        </>
    )
}

export {ProfileProducts};