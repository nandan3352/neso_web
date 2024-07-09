import React from 'react';
import './StoriesPage.css';
import Arrow from './arrow.svg';
import Splide from '@splidejs/splide';
import "@splidejs/splide/dist/css/splide.min.css";

function StoriesPage(props) {

    function handleClick() {
        // props.handleBackArrowClick()
    }

    React.useEffect(() => {
        new Splide( '.splide', {
            type: 'loop',
            perPage: 2,
            focus: 'center',
            width: '100vw',
            perMove: 1,
            start: props.startNumber
        } ).mount();
        var elms = document.getElementsByClassName( 'splide' );
        for ( var i = 0, len = elms.length; i < len; i++ ) {
            new Splide( elms[ i ] ).mount();
        }
    })

    return (
        <section className = 'stories-view-page'>
            <img className = 'stories-page-back-arrow' onClick = {handleClick()} src = {Arrow} alt = 'arrow'/>
            <div class="splide">
                <div className = "splide__slider">
                <div class="splide__track">
                    <div class="splide__list">
                        {props.imageSrc.map((element, index) => <img className = 'splide__slide' key = {index} src = {element} alt = 'story-image'/>)}
                        {props.imageSrc.map((element, index) => <img className = 'splide__slide' key = {index} src = {element} alt = 'story-image'/>)}
                        {props.imageSrc.map((element, index) => <img className = 'splide__slide' key = {index} src = {element} alt = 'story-image'/>)}
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}

export default StoriesPage;