import "./App.css";
//import taskService from "./services/task";
import { useEffect, useContext } from "react";
import Notification from "./components/Notification";

import { ShepherdTour, ShepherdTourContext } from "react-shepherd";
import steps from "./steps";

import Form from "./components/Form/Form";

const TourButton = () => {
  const tour = useContext(ShepherdTourContext);

  return (
    <button className="button dark" onClick={tour.start}>
      Start Tour
    </button>
  );
};

function App() {
  //#region VARIABLES

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

  useEffect(() => {
    //get all inital task data that are in the database, which should be none by default
    //console.log("get all effect");
    //get all the data, then get the options object and set the options useState with setOptions
    //TODO: ota kommentit pois, kun aiot tehdä backendiä
    //   taskService
    //     .getAllOptions() //returns only the response.data
    //     .then((returnedTask) => {
    //       console.log(returnedTask);
    //       if (Array.isArray(returnedTask) && returnedTask.length) {
    //         setOptions(returnedTask);
    //       }else{
    //         console.log("Array is not either an array or is empty, create empty default option");
    //         setOptions(options.concat(optionObject));
    //       }
    //     })
    //     .catch((error) => console.log("get all effect failed", error)); //Metodilla catch voidaan määritellä ketjun lopussa käsittelijäfunktio, jota kutsutaan, jos mikä tahansa ketjun promiseista epäonnistuu eli menee tilaan rejected
  }, []); //empty dependency array means this effect will only run after the initial render (expect once in development)

  return (
    <ShepherdTour steps={steps} tourOptions={tourOptions}>
      <body>
        <header>
          <h1>EduVerse TeacherTool</h1>
        </header>
        <div className="intro">
          <h3>Description of this tool</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
            nisl dui. Sed imperdiet vel purus et dictum. Curabitur eu elit
            risus. In et sapien sit amet justo consequat iaculis. Phasellus in
            mauris purus. Nunc nec dapibus neque, facilisis egestas mauris. Sed
            efficitur tortor semper risus mattis tincidunt. Nam a justo
            consectetur, elementum tellus sit amet, pharetra elit.
            {/* TODO: fill this uusing penpot */}
          </p>
          <TourButton></TourButton>
        </div>
        <Form></Form>
        <footer></footer>
      </body>
    </ShepherdTour>
  );
}

export default App;
