import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  NavLink
} from "react-router-dom";
import { throttle } from "lodash";
import { withRouter } from "react-router";
import "./css/main.scss";
import "./css/leftSide.scss";
import Splash from "../pages/splash";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Overview from "./Overview";
import WeWant from "./WeWant";
import WhatWeDo from "./WhatWeDo";
import Partners from "./Partners";
import ourApproach from "./ourApproach";
import Values from "./Values";
import SelectedProjects from "./selectedProjects";
import selectedProjectsPreviewPane from "../components/selectedProjectsPreviewPane";
import About from "./About";
import Contact from "./Contact";
import Projects from "../pages/projects";
import Newsletter from "../pages/newsletter";
import logo from "../images/logos/Adefe_HQ_Short_Web_A3_Rectangle_13_pattern@2x.png";
import OurApproachImage2 from "../images/left_section_images/ARM_Business_Material_A5_Rectangle_33_pattern@2x.png";
import activeFilter from "../Functions/activeFilter";
import componentPositions from "./functions/componentPositions";
import BrandBuilding from "./WhatWeDo_Brand-Building";

//RightSection - this has padding. try considering

//Calculate postion of elements. Need to add a buffer to center the component
// document.querySelectorAll("#we_want > div:nth-child(1) > div.we_want_text")[0].offsetHeight
//minus
// document.querySelectorAll("#we_want > div:nth-child(1) > div.we_want_text")[0].offsetTop
//minus
// document.querySelectorAll("#we_want > div:nth-child(1) > div.we_want_text")[0].offsetTop /3
//minus
//Nav.offsetHeight

//Divide offsetHeight by 2 to get halfway through element

function OurApproachImages(props) {
  return (
    <div className="OurApproachImages">
      <div className="OurApproachImage1"></div>
      <div className="OurApproachImage2"></div>
      {/* <img src={OurApproachImage1} className="OurApproachImage1"/>
    <img src={OurApproachImage1} className="OurApproachImage2"/> */}
    </div>
  );
}

class AdefeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount(prevProps, prevState, snapshot) {
    // console.log(this.props, JSON.stringify(this.props.history));
    // this.pageCheck(this.props.history.location);
    // this.props.history.listen(location => {
    //   this.pageCheck(location);
    // });
  }

  render() {
    return (
      <div id="LeftSectionLogo">
        <Link to="/">
          <img
            id="LeftSectionLogoImage"
            src={logo}
            alt="Adefe_HQ_Short_Web_A3_Rectangle_13_pattern"
          />
        </Link>
      </div>
    );
  }
}

// let this.counter = 0;
class ContentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moved: 0,
      listenerDelayIndicator: 0,
      curEle: 0,
      elePosition: [0],
      newsletterDisplay: 0,
      mainContentMarginTop: 0,
      splash: ""
    };
    // this.currentElementCalc = this.currentElementCalc.bind(this);
    // this.setState = this.setState.bind(this);
    // componentPositions = componentPositions
  }

  componentDidMount(prevProps, prevState, snapshot) {
    console.log("MOUNT");

    //height of the element
    //Listen to page change and rest page height on land - Need to remove listener and do it on prop change
    //need to see if it's better to change the height
    this.props.history.listen(location => {
      console.log(this.props.history);
      // window.scrollTo({ top: 0, behaviour: "auto" });
    });

    //window.addEventListener("scroll", this._handleMomentumScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this._handleMomentumScroll);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.splash !== this.props.splash) {
      this.setState({ splash: this.props.splash });
    }
  }

  _handleMomentumScroll(e, contentContainer, containerCover) {
    //Calculate a 3rd of the scroll
    const scrollConfig = Math.round(window.scrollY / 3);
    //Select the contentContainer
    const mainContentStatus = document.getElementById("mainContent");

    //calculate the height of the element including paddings and margins
    const offsetHeight = Math.round(mainContentStatus.offsetHeight); // - contentOffsetTop; //- scrollConfig;

    //Select the element containing the container for the content
    const contentCover = document.getElementById("contentCover");

    //Translate the container of the content in the opposite direction as we scroll and with the css transition, it looks like it is settling into position
    mainContentStatus.style.transform = `translate3d(0, ${-scrollConfig}px, 0)`;

    //As the inner container is moving upwards, it will leave a big gap at the bottom of the page, so we need to change the containerCovers size based on the amount we've scrolled
    contentCover.style.height = `calc(${offsetHeight -
      Math.round(window.scrollY / 3)}px)`;

    //Giving it a min Height to prevent the restriction when we navigate. This might be resolved once this effect is applied to a different container, per page
    contentCover.style.minHeight = "100vh";
  }

  stayInTouch() {
    console.log("Stay");

    let val = this.state.newsletterDisplay ? 0 : 1;
    this.setState({ newsletterDisplay: val });
  }
  render() {
    let moved = this.state.moved ? "moved" : "";

    return (
      <div id="RightSectionContainer">
        <div id="RightSection">
          <Route
            exact
            path="/"
            render={props => <Header splash={this.props.splash} />}
          />

          <Route
            path="/"
            render={props => (
              <Nav
                stayInTouch={() => {
                  this.stayInTouch();
                }}
                {...props}
                splash={this.props.splash}
              />
            )}
          />
          {/* giving this element a key that changes as the site navigates, makes react remount it again and fixes the scroll position issue,
          but is this the best solution? */}
          <div
            id="contentCover"
            key={this.props.location.pathname}
            className={this.state.splash}
          >
            <div className={moved} id="mainContent">
              <Route exact path="/" component={Overview} />
              <Route exact path="/" component={selectedProjectsPreviewPane} />
              {/* <Route exact path="/adefe_hq/" component={WeWant} /> */}
              <Route exact path="/" component={WhatWeDo} />
              <Route exact path="/" component={ourApproach} />
              <Route exact path="/" component={Values} />
              <Route exact path="/" component={Partners} />

              <Route path="/selected_projects" component={SelectedProjects} />
              {/* <Route exact path="/adefe_hq/" component={About} /> */}
              <Route exact path="/SubmitProject" component={Projects} />

              <Route
                path="/what_we_do/Brand_building"
                render={props => <BrandBuilding {...props} />}
              />

              <Route path="/" component={Contact} />
            </div>
          </div>
          {/* <Footer
            stayInTouch={e => {
              this.stayInTouch();
            }}
          /> */}
          <Route
            path="/"
            render={props => (
              <Newsletter
                displayState={this.state.newsletterDisplay}
                closeNewsletter={() => this.stayInTouch()}
                {...props}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

function SplashConditional(props) {
  console.log(props);
  if (!props.splash) {
    return <Splash {...props} />;
  } else {
    return null;
  }
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      splash: 0
    };
  }
  componentDidMount() {}
  //This changes the state to splash when the splash animation finishes and initialises the slide in animations.
  // splashEnd() {
  //   this.setState({ splash: "splash" });
  // }
  splashDone() {
    this.setState({
      splash: 1
    });
  }
  render() {
    return (
      <div id="mainContainer">
        <Router>
          <Route path="/" render={props => <AdefeHeader {...props} />} />

          {/* <Route
            exact
            path="/"
            render={props => <Redirect to="/adefe_hq/" {...props} />}
          /> */}

          <Route
            exact
            path="/"
            render={props => (
              <SplashConditional
                splashDone={() => this.splashDone()}
                splash={this.state.splash}
                {...props}
              />
            )}
          />

          <Route path="/" render={props => <ContentContainer {...props} />} />
        </Router>
      </div>
    );
  }
}

export default Main;
