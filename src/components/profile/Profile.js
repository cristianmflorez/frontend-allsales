import React, { useState, useEffect } from 'react';
import { ProfileInfo } from './ProfileInfo';
import { ProfileProducts } from './ProfileProducts';
import { SideBanner } from '../home/banners/SideBanner';
import { Offers } from '../home/Offers';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Profile(params) {

    const [user, setUser] = useState ([]);
    const [owner, setOwner] = useState ([]);
    const { id } = useParams();
    const navigate = useNavigate();

    
    useEffect(()=> {
        fetch(`https://web-production-009b.up.railway.app/profile/${id}`,{method: 'GET', credentials:'include'})
            .then(response => response.json())
            .then(data => {
                if(data.statusCode===404){
                    navigate('/')
                }else{
                    setUser(data.rta);
                    setOwner(data.isOwner);
                }
            })
            .catch(error => console.log(error));
    }, [id]);

    const update = async()=>{
        fetch(`http://localhost:3001/profile/${id}`,{method: 'GET', credentials:'include'})
            .then(response => response.json())
            .then(data => {
                if(data.statusCode===404){
                    navigate('/')
                }else{
                    setUser(data.rta);
                    setOwner(data.isOwner);
                }
            })
            .catch(error => console.log(error));
    }

    return(
        <>
            <ProfileInfo
                user={user}
                owner={owner}
                onAction={update}
            />
            
            <div className=" d-flex m-auto ">
                
                    <section className="m-auto mt-2 w-100">
                        <ProfileProducts
                            user={user}
                        />
                    </section>

                    <section className='ms-auto'>
                        <SideBanner></SideBanner>
                    </section>
            
            </div>

            <Offers/>
            
        </>
    )
}

export {Profile};