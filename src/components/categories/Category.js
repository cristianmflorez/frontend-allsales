import React,{ useState, useEffect } from 'react';
import { SideBanner } from '../home/banners/SideBanner';
import { Container, Col } from "react-bootstrap";
import { MainCard } from "../product/cards/MainCard";
import { useParams } from "react-router-dom";

function Category(params) {

    const [products, setProducts] = useState ([]);
    const [categoryName, setCategoryName] = useState ([]);
    const { id } = useParams();

    useEffect(()=> {
        fetch(`http://localhost:3001/filter/category/${id}`)
        .then(response => response.json())
        .then(data => {
            setProducts(data.products);
            setCategoryName(data.categoryName.name)
        })
        .catch(error => console.log(error));
    }, [id]);

    return(
        <>
            
            <div className="d-flex mx-2">

                <section className="mx-auto w-100">
                <h3 className="m-3 p-2 text-center text-light bg-danger"  >{categoryName}</h3>
                <Container className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 p-3 m-auto mt-0">
                    {products.map(product => (
                        product.amount>0 &&
                        <Col key={product.id} className="my-3">
                            <MainCard 
                                product={product}
                            />
                        </Col>
                    ))}
                </Container>

                </section>
                
                <section className="ms-auto">
                    <SideBanner></SideBanner>
                </section>
            </div>
        </>
        
    )
}

export {Category};