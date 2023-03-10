import React, { useState, useEffect } from 'react';
import { ImagesProduct } from './ImagesProduct';
import {InfoProduct} from './InfoProduct';
import {ComentsProduct} from './ComentsProduct'
import { Offers } from '../../home/Offers';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function DetailProduct(params) {

    const [product, setProduct] = useState ([]);
    const [user, setUser] = useState ([]);
    const [category, setCategory] = useState ([]);
    const [owner, setOwner] = useState ([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        fetch(`http://localhost:3001/product/${id}`,{method: 'GET', credentials:'include'})
            .then(response => response.json())
            .then(data => {
                if(data.statusCode===404){
                    navigate('/')
                }else{
                    setProduct(data.rta);
                    setUser(data.rta.user);
                    setCategory(data.rta.category);
                    setOwner(data.isOwner);
                }
            })
            .catch(error => console.log(error));
        
    }, [id]);

    return(
        <>  
            
            {product.name!==undefined?<h3 className="m-3 mt-5 p-2 text-center text-light bg-danger">Detalles del producto</h3>:null}
            <div className='m-auto'>
                <ImagesProduct 
                    product={product}
                />
            </div>
          
            <InfoProduct 
                product={product}
                user={user}
                category={category}
                owner={owner}
                updateCart={params.updateCart}
                lastCartUpdate={params.lastCartUpdate}
            />

            {product.name!==undefined && <ComentsProduct/>}
            
            <Offers></Offers>
        
        </>
    )
}

export {DetailProduct};