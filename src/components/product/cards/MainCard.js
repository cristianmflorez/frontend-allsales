import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function MainCard(params) {

    const addRecentViews = async()=>{

        if(localStorage.recents){
            let local = localStorage.recents.split(',');
            if(local.length>5){
                local.unshift(params.product.id);
                local.pop();
            }else{
                local.unshift(params.product.id);
            }
            localStorage.recents=[local]
        }else{
            localStorage.recents=params.product.id;
        }

    }
    
    return (
        <>
            {params.product!==null && <Card className="m-auto my-3 h-100" >
                <Card.Img variant="top" src={`http://localhost:3001/products/${params.product.image[0]}`} />
                <Card.Body>
                    <Card.Title>{params.product.name}</Card.Title>
                    <div className="d-flex">
                    <Card.Subtitle className={params.product.discount>0?"mb-2 text-muted text-decoration-line-through":"mb-2 text-danger"}>${params.product.price}</Card.Subtitle>
                    <Card.Subtitle className={params.product.discount>0?"mb-2 mx-4 text-danger":"d-none"}>${((params.product.price)-(params.product.price*params.product.discount/100))}</Card.Subtitle>
                    </div>
                    <Card.Link href="#" className="text-decoration-none text-danger">{params.user}</Card.Link>
                    <Card.Text>{params.product.description}</Card.Text>
                    <Button href={`#/product/${params.product.id}`} onClick={addRecentViews} variant="danger" className="align-self-end">Ver</Button>
                </Card.Body>
            </Card>}
        </>
    )
}

export {MainCard};