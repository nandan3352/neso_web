import { Icon, makeStyles } from '@material-ui/core';
import { PlaylistPlay } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDatabaseOnce } from '../../../../Services/Database';
import { getEndpointForId } from '../../../../Services/Utils';
import subsTag from "../../../../assets/images/Fuel/NesoFuelStamp.svg";
import '../SearchResults.css';

const useStyles = makeStyles(theme => ({
    subsTag: {
        height: '50%',
        position: 'absolute',
        left: 0,
        top: 0,
        transform: 'translateY(calc(50%))',
    },
    duration: {
        ...theme.typography.subtitle2,
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "black",
        opacity: 0.87,
        paddingRight: 6,
        paddingLeft: 6,
        margin: 8,
        color: 'white',
    },
    playlist: {
        ...theme.typography.subtitle1,
        position: "absolute",
        bottom: 0,
        right: 0,
        minHeight: theme.spacing(5),
        display: 'flex',
        alignItems: 'center',
        backgroundColor: "black",
        borderRadius: '0px 0px 4px 0px',
        opacity: 0.87,
        paddingRight: 12,
        paddingLeft: 12,
        color: 'white',
    },
}))

function SearchResultsVideos(props) {

    const thumb = props.img
    const title = props.vid_title || props.name
    const idComps = props.id.split('_')
    const classes = useStyles()
    const desc = useDatabaseOnce(`/StreamCourses/${idComps[0].slice(0, 2)}/${idComps[0]}/name`).data
    return (
        <Link to={getEndpointForId(props.id, props.additional.courseName, props.name ? props.name : props.chapName, props.vid_title ? props.vid_title : props.additional.firstVideoName)}>
            <div title={title} className='search-result' >
                <div className='result-img' style={{ position: 'relative' }}>
                    <img src={thumb} alt='' /> {
                        props.isPaid ?
                            <img className={classes.subsTag} src={subsTag} alt="" />
                            : <div />
                    }
                    {
                        props.dur ?
                            <div className={classes.duration} >{props.dur}</div>
                            : (props.lec_count ?
                                <div className={classes.playlist} > {props.lec_count}
                                    <Icon style={{ marginLeft: '4px' }}>
                                        <PlaylistPlay htmlColor='#ffffff' />
                                    </Icon>
                                </div> : <div />)
                    }
                </div>
                <div className='result-about'>
                    <p>{title}</p>
                    <p>{desc || ''}</p>
                </div>
            </div >
        </Link>
    )
}

export default SearchResultsVideos;