import "./App.css";
//import taskService from "./services/task";
import { useContext } from "react";

import { ShepherdTour, ShepherdTourContext } from "react-shepherd";
import steps from "./steps";

import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import Intro from "./components/Intro/Intro";

const TourButton = () => {
  const tour = useContext(ShepherdTourContext);

  return (
    <button className="button dark" onClick={tour.start}>
      Start Tour
    </button>
  );
};

function App() {
  //TODO
  const buttonConfig = [
    {
      classes: "shepherd-button-primary",
      text: "Back",
      type: "back",
    },
    {
      classes: "shepherd-button-primary",
      text: "Next",
      type: "next",
    },
    // Objects for our Tour 'Next' and 'Previous' buttons
  ];

  const tourOptions = {
    // The defaultStepOptions option allows you to specify any options which should be applied to all this tour's steps by default.
    defaultStepOptions: {
      cancelIcon: {
        enabled: true,
      },
      buttons: buttonConfig,
    },
    useModalOverlay: true,
  };
  //#endregion

  return (
    <>
      <ShepherdTour steps={steps} tourOptions={tourOptions}>
        <Header></Header>
        <Intro></Intro>
        <TourButton></TourButton>
        <Form></Form>
        <footer></footer>
      </ShepherdTour>
    </>
  );
}

export default App;
