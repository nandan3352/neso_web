import React from 'react';
import PPT from '../PPT/PPT';
import './PPTs.css';
import EmptyPageHolder from '../EmptyPPTs/EmptyPPTs';
// import { useSubscriptionListener } from "../../../../Services/Subscription";
import { Link } from "react-router-dom";
import PFButton from '../../../UI/Buttons/Primary/Filled/Button';
import POButton from '../../../UI/Buttons/Primary/Outline1/Button';
import { useTheme } from "@material-ui/core";


function PPTs(props) {
    const theme = useTheme().palette.type;
    const [pptsArrFree, setPptsArrFree] = React.useState([]);
    const [pptsArrPaid, setPptsArrPaid] = React.useState([]);
    const [pptArrPropNameFree, setPptsArrPropsNameFree] = React.useState([]);
    const [pptArrPropNamePaid, setPptsArrPropsNamePaid] = React.useState([]);

    React.useEffect(() => {
        let tmpFree = []
        let tmpPaid = []
        let tmpPropsNameFree = []
        let tmpPropsNamePaid = []

        if (props.ppts) {
            let ordered = sortPpts(props.ppts)
            for (let i in ordered) {
                if (!props.ppts[i].paid) {
                    tmpFree.push(ordered[i]);
                    tmpPropsNameFree.push(i);
                } else {
                    tmpPaid.push(ordered[i])
                    tmpPropsNamePaid.push(i);
                }
            }
            setPptsArrFree(tmpFree)
            setPptsArrPaid(tmpPaid)
            setPptsArrPropsNameFree(tmpPropsNameFree)
            setPptsArrPropsNamePaid(tmpPropsNamePaid)
        }

    }, [props.ppts, props.endPointValue])

    if (!props.ppts) {
        return <EmptyPageHolder name="PPTs" />
    }

    function getChapterId(id) {
        let tmp = id.slice(id.length - 2);
        if (tmp[0] == "_") {
            tmp = tmp.slice(1)
        }
        return tmp;
    }

    function sortPpts() {
        return Object.keys(props.ppts).sort((a, b) => parseInt(getChapterId(a)) - parseInt(getChapterId(b))).reduce(
            (obj, key) => {
                obj[key] = props.ppts[key];
                return obj;
            }, {}
        );
    }

    return (
        <section className='ppts-section'>
            <div className="free-ppt" style={pptsArrPaid.length == 0 ? { borderStyle: "none" } : {}}>
                {pptsArrFree.map((element, index) => <PPT freeLength={0} pptArrPropName={pptArrPropNameFree} title={element.name} number={index + 1} endPointValue={props.endPointValue} free={true} path={props.path} />)}
            </div>
            {pptsArrPaid.length > 0 && <section className='paid-chapters paid-ppt'>
                <div style={{ maxWidth: 783.3 }}>
                    <div className='get-fuel-paid'>
                        {!props.subscription.isSubscribed ?
                            <>
                                <div className="get-fuel-details">
                                    <h6>Neso Fuel</h6>
                                    <p>Get Neso Fuel to access the following contents</p>
                                </div>
                                <Link to="../fuel">
                                    <div className='paid-btn'>
                                        {theme === "light" ?
                                            <PFButton className="paid-btn"
                                                content="get fuel"
                                                width="104px"
                                            /> :
                                            <POButton className="paid-btn"
                                                content="get fuel"
                                                width="104px"
                                            />
                                        }
                                    </div>
                                </Link>
                            </>
                            :
                            <div className="get-fuel-details">
                                <h6>Neso Fuel</h6>
                                <p>You have access to the following contents</p>
                            </div>
                        }
                    </div>
                    {pptsArrPaid.map((element, index) =>
                        <PPT
                            freeLength={pptsArrFree.length}
                            pptArrPropName={pptArrPropNamePaid}
                            title={element.name}
                            number={index + 1 + pptsArrFree.length}
                            endPointValue={props.endPointValue}
                            path={props.path}
                            paid={props.subscription.isSubscribed ? false : true}
                            free={false} />)}
                </div>
            </section>}

        </section>
    )
}

export default PPTs;