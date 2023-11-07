import "./App.css";
//import taskService from "./services/task";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Title from "./components/Title";
import Slides from "./components/Slides";
import Task from "./components/Task";
import Button from "./components/Button";

import MatchTheColumns from "./components/tasks/MatchTheColumns";
import TaskX from "./components/tasks/TaskX";

import { v4 as uuidv4 } from "uuid"; //unique id for map key https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318

function App() {
  //#region VARIABLES

  //Constants
  const maxOptions = 10;
  const maxSlides = 4;

  //States
  const [inputs, setInputs] = useState({
    title: "",
    slides: [
      {
        id: uuidv4(),
        slideValue: "",
      },
    ],
    options: [
      {
        draggableValue: "",
        draggableDefinition: "",
        columnEntryValue: "",
        id: uuidv4(),
        isFalseMatch: false,
      },
    ],
  });
  const [selectedTask, setSelectedTask] = useState("match-the-columns");
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

  //Handles adding a new option object
  const handleAddOption = (event) => {
    event.preventDefault(); // Prevent the default behavior of a form submission, which would cause a page refresh
    const { options } = inputs; // Destructure the 'options' property from the 'inputs' object
    const optionAmount = options.length; //How many options in the options array

    if (optionAmount < maxOptions) {
      console.log("Add option button clicked", event.target);
      //Create a new empty option object
      const optionObject = {
        draggableValue: "",
        draggableDefinition: "",
        columnEntryValue: "",
        id: uuidv4(), //generate a unique ID
        isFalseMatch: false,
      };
      //Using functional update form of State:
      //spread the properties of the "previous" inputs object and update the options array with a new object
      setInputs((prevInputs) => ({
        ...prevInputs,
        options: [...options, optionObject],
      }));
    } else {
      alert(`Max option limit acquired!`);
    }
  };
  //Handles adding a new option object
  const handleAddFalseMatch = (event) => {
    event.preventDefault(); // Prevent the default behavior of a form submission, which would cause a page refresh
    const { options } = inputs; // Destructure the 'options' property from the 'inputs' object
    const optionAmount = options.length; //How many options in the options array

    if (optionAmount < maxOptions) {
      console.log("Add option button clicked", event.target);
      //Create a new empty option object
      const optionObject = {
        draggableValue: "",
        draggableDefinition: "",
        id: uuidv4(), //generate a unique ID
        isFalseMatch: true,
      };
      //Using functional update form of State:
      //spread the properties of the "previous" inputs object and update the options array with a new object
      setInputs((prevInputs) => ({
        ...prevInputs,
        options: [...options, optionObject],
      }));
    } else {
      alert(`Max option limit acquired!`);
    }
  };

  //Handles adding a new slide object
  const handleAddSlide = (event) => {
    event.preventDefault(); // Prevent the default behavior of a form submission, which would cause a page refresh
    const { slides } = inputs; // Destructure the 'slides' property from the 'inputs' object
    const slidesAmount = slides.length;
    if (slidesAmount < maxSlides) {
      console.log("Add slide button clicked", event.target);
      //Create a new empty slide object
      const slideObject = {
        id: uuidv4(), //generate a unique ID
        slideValue: "",
      };
      //spread the properties of the "previous" state object and update the options array with a new state object
      setInputs((prevInputs) => ({
        ...prevInputs,
        slides: [...slides, slideObject],
      }));
    } else {
      alert(`Max slide limit acquired!`);
    }
  };

  //Handles the removal of a slide
  const removeOption = (optionIndex) => {
    //Require confirmation of the removal to avoid accidents
    if (window.confirm(`delete option ${optionIndex}`)) {
      // Create a new state object based on the previous state (prevInputs) with the slide removed
      setInputs((prevInputs) => ({
        ...prevInputs, // Spread the properties of the previous state object
        options: prevInputs.options.filter((_, index) => index !== optionIndex), // Filter out the option at the specified index, _ = not in use
      }));
    }
  };

  //Handles the removal of a slide
  const removeSlide = (slideIndex) => {
    //Require confirmation of the removal to avoid accidents
    if (window.confirm(`delete option ${slideIndex}`)) {
      // Create a new state object based on the previous state (prevInputs) with the slide removed
      setInputs((prevInputs) => ({
        ...prevInputs, // Spread the properties of the previous state object
        slides: prevInputs.slides.filter((_, index) => index !== slideIndex), // Filter out the slide at the specified index
      }));
    }
  };

  //Handles input of the options (3)
  //TODO check if options (3) and slides (2) handlers could be merged
  const handleOptionsChange = (event, index) => {
    // Create a shallow copy of the inputs object
    const updatedInputs = { ...inputs };

    // Create a shallow copy of the options array for the specific index
    updatedInputs.options = [...updatedInputs.options];
    updatedInputs.options[index] = { ...updatedInputs.options[index] };

    // Update the property with the new value
    updatedInputs.options[index][event.target.name] = event.target.value;

    // Update the state with the modified inputs
    setInputs(updatedInputs);

    //By following this approach, you are maintaining immutability and ensuring that state updates correctly trigger re-renders. (thanks ChatGPT)
  };

  //Handles input of the slides (2)
  const handleSlideChange = (event, index) => {
    // Create a shallow copy of the inputs object
    const updatedInputs = { ...inputs };

    // Create a shallow copy of the options array for the specific index
    updatedInputs.slides = [...updatedInputs.slides];
    updatedInputs.slides[index] = { ...updatedInputs.slides[index] };

    // Update the property with the new value
    updatedInputs.slides[index][event.target.name] = event.target.value;

    // Update the state with the modified inputs
    setInputs(updatedInputs);

    //By following this approach, you are maintaining immutability and ensuring that state updates correctly trigger re-renders. (thanks ChatGPT)
  };

  //Handles the input of the title (1)
  const handleFormChange = (event) => {
    // Create a shallow copy of the inputs object
    const updatedInputs = { ...inputs };

    // Update the property with the new value
    updatedInputs[event.target.name] = event.target.value;

    // Update the state with the modified inputs
    setInputs(updatedInputs);
  };

  //Handles the selected task type
  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedTask(selectedOption); // Update the selected task in the state
  };

  //Handles what data needs to be sent and where
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default behavior of a form submission, which would cause a page refresh

    console.log("handle submit activated!");
    console.log(`The data you submitted: `, inputs);
    alert(`The data you submitted: `, inputs);
  };

  return (
    <>
    <header></header>
      <h1>EduVerse TeacherTool</h1>
      <h3>Description of this tool</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel nisl
        dui. Sed imperdiet vel purus et dictum. Curabitur eu elit risus. In et
        sapien sit amet justo consequat iaculis. Phasellus in mauris purus. Nunc
        nec dapibus neque, facilisis egestas mauris. Sed efficitur tortor semper
        risus mattis tincidunt. Nam a justo consectetur, elementum tellus sit
        amet, pharetra elit.
      </p>
      <Button label="Click on this button to start the tutorial!" className="tutorial-button"></Button>
      <p>
        Required fields are followed by <span aria-label="required">*</span>
      </p>
      <form>
        <Title inputs={inputs} handleFormChange={handleFormChange}></Title>
        <Slides
          slides={inputs.slides}
          handleSlideChange={handleSlideChange}
          handleAddSlide={handleAddSlide}
          removeSlide={removeSlide}
          maxSlides={maxSlides}
        ></Slides>
        <Task
          selectedTask={selectedTask}
          handleSelectChange={handleSelectChange}
        >
          <MatchTheColumns
            selectedOption={selectedTask}
            inputs={inputs}
            maxOptions={maxOptions}
            handleOptionsChange={handleOptionsChange}
            handleAddOption={handleAddOption}
            handleAddFalseMatch={handleAddFalseMatch}
            removeOption={removeOption}
          ></MatchTheColumns>
          <TaskX value={"testi"}></TaskX>
        </Task>
        <Button
          type={"submit"}
          label="Submit/Continue/Preview"
          handleClick={handleSubmit}
          className={"submit-button"}
        ></Button>
      </form>

      <footer></footer>
    </>
  );
}

export default App;
