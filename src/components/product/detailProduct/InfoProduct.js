import React, { useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function InfoProduct(params) {

    const [show, setShow] = useState ([]);

    const addCart = ()=>{

        if(sessionStorage.cart){
            let cartItems = sessionStorage.cart.split(',');
            cartItems.push(params.product.id);
            sessionStorage.cart=[cartItems]
        }else{
            sessionStorage.setItem('cart',params.product.id);
        }
        setShow(!show);
        params.updateCart(`add from ${params.product.id}`)
    }

    const removeCart = ()=>{

        let cartItems = sessionStorage.cart.split(',');
        let newCartItems = cartItems.filter(item => parseInt(item) !== params.product.id);
        sessionStorage.cart=[newCartItems]
        setShow(!show);
        params.updateCart(`remove from ${params.product.id}`)
    }

    useEffect(()=> {
        if(sessionStorage.cart){
            let cartItems = sessionStorage.cart.split(',');
            let newCartItems = cartItems.map(item => parseInt(item));
            setShow(!newCartItems.includes(params.product.id))
        }else{
            setShow(true)
        }
    }, [params.product.id, params.lastCartUpdate]);

    return(
        <>
            {params.product.name!==undefined?<div className='m-5'>
                <h4 className='text-danger'>{params.product.name}</h4>
                <div className='d-flex'>
                    <h3 className={params.product.discount>0?"mb-2 text-muted text-decoration-line-through":"mb-2 text-danger"}>${params.product.price}</h3>
                    <h3 className={params.product.discount>0?"mb-2 mx-4 text-dark":"d-none"}>${((params.product.price)-(params.product.price*params.product.discount/100))}</h3>
                </div>
                <h5 className='text-muted mb-5'>Vendido por: <Card.Link href={`#/profile/${params.user.id}`} className="text-decoration-none text-danger">{params.user.name}</Card.Link></h5>
                <p>{params.product.description}</p>
                <h5 className='text-muted my-5'>Unidades disponibles: {params.product.amount}</h5>
                <h5 className='text-muted my-5'>Categoría:  <Card.Link href={`#/category/${params.category.id}`} className="text-decoration-none text-danger">{params.category.name}</Card.Link></h5>
                <div className='d-grid gap-2 w-50 m-auto my-5'>
                    {!params.owner===true?<Button variant="danger" size="lg" name='add' className={show?'d-block':'d-none'} onClick={addCart}>Al carrito</Button>:null}
                    {!params.owner===true?<Button variant="secondary" size="lg" className={show?'d-none':'d-block'} name='remove' onClick={removeCart}>Quitar del carrito</Button>:null}
                    {params.owner===true?<Button variant="danger" size="lg" href={`#/edit-product/${params.product.id}`} >Editar</Button>:null}
                </div>
            </div>:null}

        </>
    )
}

export {InfoProduct};