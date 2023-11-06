import "./App.css";
//import taskService from "./services/task";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Title from "./components/Title";
import Slides from "./components/Slides";
import Task from "./components/Task";
import Button from './components/Button';

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
        columnEntryValue: "",
        id: uuidv4(),
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

  //#region Input handling functions
  const handleAddOption = (event) => {
    event.preventDefault(); // Prevent the default behavior of a form submission, which would cause a page refresh
    const { options } = inputs; // Destructure the 'options' property from the 'inputs' object
    const optionAmount = options.length; //How many options in the options array

    if (optionAmount < maxOptions) {
      console.log("Add option button clicked", event.target);
      //Create a new empty option object
      const optionObject = {
        draggableValue: "",
        columnEntryValue: "",
        id: uuidv4(), //generate a unique ID
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
      //Using functional update form of State:
      //spread the properties of the "previous" inputs object and update the options array with a new object
      setInputs((prevInputs) => ({
        ...prevInputs,
        slides: [...slides, slideObject],
      }));
    } else {
      alert(`Max slide limit acquired!`);
    }
  };

  //TODO: add comment on how this works
  const removeOption = (optionIndex) => {
    if (window.confirm(`delete option ${optionIndex}`)) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        options: prevInputs.options.filter((_, index) => index !== optionIndex),
      }));
    }
  };
  //TODO: add comment on how this works
  const removeSlide = (slideIndex) => {
    console.log("remove slide number:", slideIndex);
    if (window.confirm(`delete option ${slideIndex}`)) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        slides: prevInputs.slides.filter((_, index) => index !== slideIndex),
      }));
    }
  };

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

  const handleSlideChange = (event, index) => {
    console.log(event.target.name);
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

  const handleFormChange = (event) => {
    // Create a shallow copy of the inputs object
    const updatedInputs = { ...inputs };

    // Update the property with the new value
    updatedInputs[event.target.name] = event.target.value;

    // Update the state with the modified inputs
    setInputs(updatedInputs);
  };

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedTask(selectedOption); // Update the selected task in the state
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("handle submit activated!");
    console.log(`The data you submitted: `, inputs);
    alert(`The data you submitted: `, inputs);
  };
  //#endregion

  return (
    <>
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
            removeOption={removeOption}
          ></MatchTheColumns>
          <TaskX value={"testi"}></TaskX>
        </Task>
        <Button type={"submit"} label="Submit/Continue/Preview" handleClick={handleSubmit} className={"submit-button"}></Button>
      </form>

      <footer></footer>
    </>
  );
}

export default App;
