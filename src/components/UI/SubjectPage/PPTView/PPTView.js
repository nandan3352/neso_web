import React from 'react';
import { useVideoDatabase, useDatabase, usePPTDatabase } from '../../../../Services/Database';
import PPTViewRight from '../PPTViewRight/PPTViewRight';
import './PPTView.css';
import PPTLoading from '../PPTLoading/PPTLoading';
import { navigate, useParams } from "react-router-dom";
import { useSubscriptionListener } from '../../../../Services/Subscription';
import { SnackbarEvent, useEventDispatch } from '../../../../Services/Events';
import { Helmet } from 'react-helmet'
import { getIdsFromParams, getnavigateUrl } from '../../../../Services/Utils';
import NoMatchPage from '../../../../containers/NoMatchPage/NoMatchPage';


function PPTView(props) {

    // const endPointValue = props.location.search.slice(4, 12);
    const params = useParams()
    let {courseId, chapterId} = getIdsFromParams(params);
    let pptId = `${courseId}_${chapterId}`
    //const PPT = usePPTDatabase(`${endPointValue}_p`).data;
    const PPTData = useDatabase(`PPTs/${pptId}`);
    const navigateMap = useDatabase(courseId && `navigateMap/${courseId}`);
    const ppts = useVideoDatabase('PPTs', pptId.slice(0, 5)).data;
    const subject = useDatabase(`Streams/${pptId.slice(0, 2)}`).data;
    const chapters = useDatabase(`Chapters/${pptId.slice(0, 5)}`).data
    const pdfViewRef = React.useRef();
    const pptSectionRef = React.useRef();
    const subscription = useSubscriptionListener()
    const dispatchSnackbar = useEventDispatch(SnackbarEvent)

    if (PPTData.notFound) {
        if (!navigateMap.loading) {
          if (navigateMap.data) {
            return (
              <navigate
                to={getnavigateUrl(navigateMap.data, window.location.pathname)}
              />
            );
          }
          return <NoMatchPage />;
        }
      }

    if (!ppts || !subject || !PPTData.data || !chapters || subscription.loading) {
        return <PPTLoading />
    }

    if (!subscription.isSubscribed && PPTData.data.paid) {
        dispatchSnackbar({ msg: "Get Neso fuel to access this PPT.", open: true, button: { nav: '/fuel', text: 'get fuel' } })
        return <navigate to='/' />
    }

    return (
        <>

            <Helmet>
                <title>{PPTData.data.name + " | Neso Academy"}</title>
                <meta name="description" content={subject.name} />
            </Helmet>

            <section className='ppt-view-section' ref={pptSectionRef}>
                <div className='ppt-view-right-section'>
                    <PPTViewRight
                        sub_id={params.sub_id}
                        course_id={params.course_id}
                        endPointValue={pptId}
                        pdfViewRef={pdfViewRef.name}
                        subjectLink={subject.name}
                        PPT={PPTData.data.pdf}
                        PPTData={PPTData.data}
                        chapters={chapters}
                        ppts={ppts}
                    />
                </div>
            </section>
        </>

        // <h1>😪</h1>
    )
}

export default PPTView;