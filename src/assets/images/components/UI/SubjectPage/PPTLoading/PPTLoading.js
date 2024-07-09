import React from 'react';
import './PPTLoading.css';
import Skeleton from '@material-ui/lab/Skeleton';

function PPTLoading() {

    // const [dimension, setDimension] = React.useState({ width: 675, height: 379 })
    let dimension = { width: 675, height: 379 }

    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        // setDimensions();
        return () => {
            document.body.style.overflow = '';
        }
    }, []);

    // const setDimensions = () => {
    //     if (window.innerWidth < 1220) {
    //         let width = window.innerWidth - 30
    //         let height = width * (9 / 16)
    //         setDimension({ width: width, height: height })
    //     }
    // }

    if (window.innerWidth < 1220) {
        let width = window.innerWidth - 30
        let height = width * (9 / 16)
        dimension = { width: width, height: height };
    }

    return (
        <section className='ppt-view-loading'>
            <div className='ppt-view-right-loading'>
                <Skeleton className='ppt-page-loading' variant='rect' height={dimension.height} width={dimension.width} />
                <Skeleton className='ppt-page-loading' variant='rect' height={dimension.height} width={dimension.width} />
                <Skeleton className='ppt-page-loading' variant='rect' height={dimension.height} width={dimension.width} />
            </div>
        </section >
    )
}



export default PPTLoading;
