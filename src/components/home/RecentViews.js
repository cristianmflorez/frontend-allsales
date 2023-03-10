import React, {useEffect, useState} from "react";
import { Container, Col } from "react-bootstrap";
import { MainCard } from "../product/cards/MainCard";

function RecentViews(params) {

    const [products, setProducts] = useState ([]);
    

    useEffect(()=> {
        if(localStorage.recents){
            let local = localStorage.recents.split(',');
            let ids = [];
            local.forEach(function (id) {
                if(!ids.includes(id)){
                    ids.push(id);
                }
            });

        
            fetch(`http://localhost:3001/filter/recentviews`, {method: 'POST', body:JSON.stringify(ids), headers: {"Content-Type": "application/json"}} )
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => console.log(error));
        }
        
    }, []);

    return(
        <>
            {products[0]?<>
            <h3 className="m-3 mt-5 p-2 text-center text-light bg-danger ">Vistos recientemente</h3>

            <Container className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 p-3 m-auto mb-5">
                {products.slice(0,3).map((product,i) => (
                    product && product.amount>0 &&
                    <Col key={i} className="my-0">
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

export {RecentViews};