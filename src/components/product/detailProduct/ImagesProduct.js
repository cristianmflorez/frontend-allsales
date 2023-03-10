import React, { useState } from 'react';
import { Container, Col, Card } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

function ImagesProduct(params) {
    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
        {params.product && <>
            <Container className='d-flex m-auto mt-4'>
                <Col xs={2} className="d-none d-md-block">
                    {params.product.image && params.product.image.map((image, i)=>(
                        <Card.Img src={`http://localhost:3001/products/${image}`} key={i} className="img-fluid m-2" alt="..." height="200" onClick={()=>{handleSelect(i)}}/>
                    ))}
                </Col>
                <Col >
                    <Carousel activeIndex={index} onSelect={handleSelect} variant="dark" className='carousel-inner m-auto'>
                        {params.product.image && params.product.image.map((image, i)=>(
                            <Carousel.Item interval={40000} key={i}>
                                <img
                                className="d-block w-75 m-auto"
                                src={`http://localhost:3001/products/${image}`}
                                alt="..."
                                />
                            </Carousel.Item>
                        ))}
                        
                        
                    </Carousel>
                </Col>
            </Container>
        </>}
    </>
    
  );
}

export {ImagesProduct};