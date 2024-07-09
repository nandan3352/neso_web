import { Hidden, makeStyles, } from '@material-ui/core';
import { memo, useEffect } from 'react';
import AdsBlockerDetector from './AdsBlockerDetector';

const useStyle = makeStyles((theme) => ({
    root: props => ({
        display: 'flex',
        justifyContent: 'center',
        margin: "16px 0px",
        border: `1px solid ${theme.palette.divider}`,
        ...props.rootStyle,
        [theme.breakpoints.down('xs')]: {
            margin: "8px 0px",
            ...props.rootSmStyles
        }
    }),
    googleAd: props => ({
        ...props.size.lg,
        ...props.style,
        [theme.breakpoints.down('xs')]: {
            ...props.size.sm,
            ...props.style,
        },
    })
}))

const googleAdId = 'ca-pub-9238956141360497';

export const AD_VARIENT_BANNER = "banner"; // 970x90 , 300x50 (in mobile screen)
export const AD_VARIENT_BANNER_MINI = "minibanner"; //728x90, 300x50(in mobile screen) 
export const AD_VARIENT_SQUARE = "square"; //300x250
export const AD_VARIENT_SQUARE_LARGE = "largesquare";// 300x600
export const AD_VARIENT_BANNER_MOBILE = "bannerMobile"; //300x50

/* In mobile screen, ads will be replaced with AD_VARIENT_BANNER_MOBILE  */
const AdsContainer = ({ rootStyle = {}, rootSmStyles = {}, style = {}, hide = false, className = "", varient, path = "home" }) => {

    useEffect(() => {
        let clear
        if (!hide) {
            try {
                clear = setTimeout(() => {
                    (window.adsbygoogle = window.adsbygoogle || []).push({})
                }, 10);
            } catch (error) {
                console.log(error);
            }
        }
        return () => clearTimeout(clear)
    }, [hide, path])

    const ad_varient = {
        [AD_VARIENT_BANNER]: {
            lg: {
                width: 970, height: 90
            },
            sm: {
                width: 320, height: 100
            }
        },
        [AD_VARIENT_BANNER_MINI]: {
            lg: {
                width: 728, height: 90
            },
            sm: {
                width: 320, height: 100
            }
        },
        [AD_VARIENT_SQUARE]: {
            lg: {
                width: 336, height: 280
            },

            sm: {
                width: 320, height: 100
            }
        },
        [AD_VARIENT_SQUARE_LARGE]: {
            lg: {
                width: 300, height: 600
            },

            sm: {
                width: 320, height: 100
            }
        }
    }

    const adSlotMap = {
        [AD_VARIENT_BANNER]: 3665485795, //970 x 90
        [AD_VARIENT_BANNER_MINI]: 6127356973, //728 x 90
        [AD_VARIENT_SQUARE]: 9390178086, // 336 x 280
        [AD_VARIENT_BANNER_MOBILE]: 7600236652, // 320x 100
        [AD_VARIENT_SQUARE_LARGE]: 3845017992, //300 x 600
    }


    const classes = useStyle({ rootStyle, size: ad_varient[varient], style, rootSmStyles })

    return hide ? null : (
        <div className={`${classes.root}  ${className}`} key={path} >
            {/* lg */}
            <Hidden xsDown>
                <ins
                    className={`adsbygoogle ${classes.googleAd}`}
                    style={{ display: 'inline-block' }}
                    data-ad-client={googleAdId}
                    data-ad-slot={adSlotMap[varient]}>
                </ins>
            </Hidden>
            {/* Mobile */}
            <Hidden smUp>
                <ins
                    className={`adsbygoogle ${classes.googleAd}`}
                    style={{ display: 'inline-block' }}
                    data-ad-client={googleAdId}
                    data-ad-slot={adSlotMap[AD_VARIENT_BANNER_MOBILE]}>
                </ins>
            </Hidden>
            <AdsBlockerDetector />
        </div>)
}

export default memo(AdsContainer, (p, n) => {
    return p.path !== n.path;
});