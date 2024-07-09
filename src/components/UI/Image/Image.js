import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import {useState} from 'react'

/**
 * @description Img with preloader, whose dimensions are set by skeletonWidth,skeletonHeight
 */
export default function Image(props){
const[loaded,setLoaded]=useState(false)

return(
    <div className={props.className} onClick={props.onClick}>
        <img src={props.src} style={{width:'100%',height:'100%',display:loaded?'block':'none'}} onLoad=
        {()=>setLoaded(true)} alt=''/>
        {!loaded && <Skeleton variant='rect' animation='wave'
         style={{height:props.skeletonHeight,width:props.skeletonWidth}}/>}
    </div>
)
}