
import { makeStyles } from "@material-ui/core";
import { useEffect, useRef } from "react";
import loader from "../../../assets/images/LoadingIcons/neso_loading_icon_sprite.webp"

const useStyles = makeStyles((theme) => ({
    root: {
        transition: "none",
        transform: 'scale(0.9)',
        height: 80,
        width: 80,
        background: `url(${loader}) -720px -720px`,
    }
}))

const NesoLoader = (props) => {

    const classes = useStyles()

    const loader_ref = useRef();

    function animateLogo() {
        var position = 720;
        var positiony = 720;
        const interval = 12;
        const diff = 80;
        return setInterval(() => {
            if (!loader_ref.current) {
                return;
            }
            loader_ref.current.style.backgroundPosition = `-${position}px -${positiony}px`;

            if ((position / diff) % 17 == 0) {
                position = 80;
                positiony = positiony + diff;
            }
            else {
                position = position + diff;
                if ((positiony / diff) % 20 == 0) {
                    positiony = 0;
                }
            }

        }, interval);
    }

    useEffect(() => {
        const pid = animateLogo();
        return () => {
            clearInterval(pid);
        }
    }, []);

    return <div ref={loader_ref} className={classes.root} />
}


export default NesoLoader