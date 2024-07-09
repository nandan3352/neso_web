import React from 'react';
import NesoFuelLogo from './NesoFuelLogo.svg';
import './GetFuel.css';
import PFButton from '../../../UI/Buttons/Primary/Filled/Button';
import POButton from '../../../UI/Buttons/Primary/Outline1/Button';
import { Link } from "react-router-dom";
import { useTheme, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';

function GetFuel() {
    const theme = useTheme().palette.type;
    const [display, setDisplay] = React.useState("grid");
    const [price, setPrice] = React.useState(null);
    return <PFButton className='get-fuel-btn'
    content="get fuel"
    width='104px'
/>

    // React.useEffect(() => {
    //     var options = {
    //         method: "GET",
    //         url: "https://us-central1-neso-c53c4.cloudfunctions.net/fetchPlanDetails",
    //         headers: {
    //             "cache-control": "no-cache",
    //             "content-type": "application/json",
    //         },
    //     };
    //     axios(options)
    //         .then((response) => {
    //             setPrice(response.data.symbol + "" + response.data.uranium.rate / 100);
    //             return;
    //         }).catch((err) => {
    //         });
    // }, []);

    return price && (
        <section className='get-fuel-section' style={{ display: display }}>
            <div className='get-fuel-logo'>
                <img src={NesoFuelLogo} alt='neso-fuel'></img>
                <span>Neso Fuel</span>
            </div>

            <IconButton className="cross-icon-section" onClick={() => setDisplay('none')}>
                <CloseIcon />
            </IconButton>
            <div className='get-fuel-message'>
                <p>{"Access our entire library at just " + price + "/month"}</p>
            </div>
            <div className="get-fuel-btn-wrapper">
                <Link to={{ pathname: "/fuel", state: { refuel: true } }}>
                    {theme === "light" ?
                        <PFButton className='get-fuel-btn'
                            content="get fuel"
                            width='104px'
                        /> :
                        <POButton className='get-fuel-btn'
                            content="get fuel"
                            width='104px'
                        />}
                </Link>
            </div>

        </section>
    )
}

export default GetFuel;

