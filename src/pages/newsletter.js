import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import trail from "../images/Icons/trail.png";
import plane from "../images/Icons/plane.png";
import "./css/newsletter.scss";

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "",
  authDomain: "adefehq.firebaseapp.com",
  projectId: "adefehq"
});

const db = firebase.firestore();
let docRef = db.collection("Newsletter");

let timestamp = new Date();
// new Timestamp();

function CompletedNewsletter() {
  return <div className="ProjectsHead">Let's create progress together!</div>;
}

class StartNewsletter extends Component {
  render() {
    return "";
  }
}
function NewsletterFormPre(props) {
  return (
    <React.Fragment>
      <div className="newsletter_head">
        Subscribe to keep up to date. Anytime, anywhere.
      </div>
      <div className="newsletter_body">
        Our newsletter is full of special insights, content and beta versions of
        new products! and oh, don't worry we hate spams too.
      </div>
      <div className="newsletter_email_container">
        <input
          className="newsletter_email"
          type="email"
          name="email"
          placeholder="Enter your email address"
        />
        <button onClick={props.submitNewsletter} className="sign_up">
          Sign Up
        </button>
      </div>
    </React.Fragment>
  );
}
function NewsletterFormPost(props) {
  return (
    <div className="NewsletterFormPost">
      <div className="airplane">
        <img className="_plane" src={plane} alt="plane" />
        <img className="_trail" src={trail} alt="mail_sent" />
      </div>
      <button onClick={props.submitNewsletter} className="good_to_go">
        Good to go!
      </button>
    </div>
  );
}
let NewsletterForm = NewsletterFormPre;

class Newsletter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.displayState !== this.props.displayState) {
      //When the display status is changed, switch back to the start of the newsletter
      NewsletterForm = NewsletterFormPre;
      console.log(this.props);
      //this.props.history.push("/adefe_hq/newsletter");
    }
  }
  componentDidMount() {
    NewsletterForm = NewsletterFormPre;
  }
  submitNewsletter(e) {
    //if we clicked on Sign up, make NewsletterForm the submitted form page
    if (e.target.className === "sign_up") {
      let submittedEmail = document.querySelector(".newsletter_email").value;

      docRef.doc(submittedEmail).set({
        created: timestamp.toISOString()
      });

      NewsletterForm = NewsletterFormPost;
      this.forceUpdate();
    }
    //if we clicked on good_to_go, close the form..
    if (e.target.className === "good_to_go") {
      this.props.closeNewsletter();
      //..then change back to the default form
      NewsletterForm = NewsletterFormPre;
    }
    //alert("hi");
  }
  render() {
    //console.log(this.props);
    let displayState = this.props.displayState ? "show" : "hide";
    return (
      <div className={`newsletter_container_overlay_BG ${displayState}`}>
        <div className="newsletter_container">
          <div className="newsletter_exit">
            <div
              onClick={this.props.closeNewsletter}
              className="newsletter_exit_symbol clickable"
            >
              X
            </div>
          </div>

          <NewsletterForm submitNewsletter={e => this.submitNewsletter(e)} />
        </div>
      </div>
    );
  }
}

export default Newsletter;
