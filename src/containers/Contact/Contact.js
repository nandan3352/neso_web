import { Button, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { databaseSet } from "../../Services/Database";
import { SnackbarEvent, useEventDispatch } from "../../Services/Events";
import "./Contact.css";
import { Link } from "react-router-dom";

const Contact = () => {

  const [contactData, setContactData] = useState({
    fname: "",
    lname: "",
    email: "",
    msg: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)


  const dispatchSnackbar = useEventDispatch(SnackbarEvent)

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contactData);

    if (!validateEmail(contactData.email)) {
      dispatchSnackbar({ msg: "Please enter a valid email address.", open: true })
      return
    }

    setLoading(true)

    const timestamp = Date.now()
    databaseSet(`Contact/${timestamp}`, contactData).then(e => {
      setSubmitted(true)
      dispatchSnackbar({ msg: "Your Query has been submitted successfully.", open: true })
    }).catch(e => {
      dispatchSnackbar({ msg: "Something went wrong.", open: true })
    })

  }


  const handleChange = (e) => {
    const { name, value } = e.target
    setContactData(prev => ({ ...prev, [name]: value }))
  }

  // return <Link to="/support" />

  return (
    <>
      <Helmet>
        <title>{"Contact us | Neso Academy"}</title>
        <meta name="description" content="With Neso Fuel get access to all the paid content with Ad-free experience." />
      </Helmet>
      <form name="contact-form" onSubmit={handleSubmit}>
        <div className='contactCluster'>
          <div className='titleContact'>Contact us!</div>
          <div className='contactContent'>
            <div className='nameContact'>
          <p className='contactLabel'>First name</p>
          <input required className='contactInput' type='text' name='' id='' />
        </div>
            <div className='contactfirstcluster'>
              <div className='nameContact'>
                <p className='contactLabel'>First name</p>
                <input
                  required
                  className='contactInput'
                  type='text'
                  name='fname'
                  onChange={handleChange}
                  id=''
                  value={contactData.fname}
                />
              </div>
              <div className='nameContact'>
                <p className='contactLabel'>Last name</p>
                <input
                  required
                  className='contactInput'
                  type='text'
                  name='lname'
                  value={contactData.lname}
                  onChange={handleChange}
                  id=''
                />
              </div>
            </div>
            <div className='nameContact'>
              <p className='contactLabel'>Email Address</p>
              <input value={contactData.email}
                required className='contactInput' type='text' name='email' id='' onChange={handleChange}
              />
            </div>
            <div className='messageContact'>
              <p className='contactLabel'>Message</p>
              <textarea
                value={contactData.msg}
                className='contactInputMsg'
                style={{ font: "inherit" }}
                name='msg'
                id=''
                onChange={handleChange}
                cols='30'
                rows='30'
                required
              ></textarea>
            </div>
            <Button
              disableElevation
              variant="contained"
              color="secondary"
              type="submit"
              disabled={submitted}
              style={{ alignSelf: "center", marginTop: "24px" }}>{
                loading && !submitted ? <CircularProgress size={24} style={{ color: "white" }} /> : "SUBMIT"
              }</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Contact;
