import React from 'react';
import Arrow from '../PPT/arrow.svg';
import './PPTViewLeft.css';
import {useNavigate} from 'react-router-dom';


function PPTViewLeft(props) {

  const history = useNavigate();

  function handleClick(event) {
    history.push(`/ppts?id=${event.currentTarget.id}`);
    window.location.reload();
  }
    return (
        <section className = 'ppt-view-left'>
            <section className = 'ppts-names'>
              {props.pptsArr.map((element, index) => 
                  <div className = 'ppt-title' onClick = {handleClick} id = {element.prop}>
                    <p id = {element.prop}>{index + 1}. {element.ppt.name}</p>
                    <div className = 'ppt-view-arrow'>
                      <img src = {Arrow} alt = 'arrow'/>
                    </div>
                  </div>)}
            </section>
            <section className = 'ppt-ad-section'>
                <div className = 'ppt-ad'></div>
            </section>
        </section>
    )
}

export default PPTViewLeft;