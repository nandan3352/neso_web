import React, { useState, useEffect } from 'react'
import './Home.css'
import HomeSlider from './HomeBody'
import {Helmet} from 'react-helmet'
import LatestSection from './LatestSection/LatestSection'
import {
  LATEST_ITEM_BACKDROP_ACTION,
  useEventListener,
} from '../../Services/Events'
import FuelDialog from '../../components/UI/FuelActivatedDialog/FuelDialog'
import { useNavigate } from 'react-router'


const Home = (props) => {
  const { params } = props.match.params

  const history = useNavigate()

  const state = history.location.state

  useEffect(() => {
    if (state && state.intent === 'fuelActivated') {
      setShowFuelActivatedDialog(true)
    }
  }, [state, history, params])

  const [latestSectionOpen, setLatestSectionOpen] = useState(false)
  const [showFuelActivatedDialog, setShowFuelActivatedDialog] = useState(false)

  useEventListener(LATEST_ITEM_BACKDROP_ACTION, (e) => {
    const state = e.detail.open
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setLatestSectionOpen(state)
  })

  const onClose = () => {
    setShowFuelActivatedDialog(false)
  }

  return (
    <>
      <Helmet>
        <title>Neso Academy</title>
        <meta name="description" content="Neso Academy offers world-class learning resources on engineering courses, school syllabus, competitive exams, and many more. Every day thousands of students visit Neso Academy and learn various topics from our library. Students can watch lectures, practice questions, and interact with other students making Neso Academy a Global Classroom. " />
      </Helmet>
      <div className='root'>
        <FuelDialog
          open={showFuelActivatedDialog}
          onClose={onClose}
          state={state}
        />
        <div id={latestSectionOpen ? 'open' : 'close'} className='latest-section'>
          <LatestSection />
        </div>
        <div className='container'>
          <HomeSlider scrollToCourse={!latestSectionOpen && params} /* replace this logic with #section  */ />
        </div>
      </div>
    </>
    
  )
}

export default Home
