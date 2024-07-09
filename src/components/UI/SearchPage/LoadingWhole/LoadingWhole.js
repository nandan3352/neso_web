import { Container } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import './LoadingWhole.css';

function LoadingWhole() {

    const loadingArr = [];

    for (let i = 0; i < 20; i++) {
        loadingArr.push(i);
    }

    return (
        <Container>
            <section className='loading-search-page'>
                {loadingArr.map(_ => {
                    return (
                        <section className='loading-search'>
                            <Skeleton variant='rect' className='loading-search-img' />
                            <div className='loading-search-about'>
                                <Skeleton variant='text' className='loading-search-text' />
                                <Skeleton variant='text' className='loading-search-text' />
                            </div>
                        </section>
                    )
                })}
            </section>
        </Container>
    )
}

export default LoadingWhole;