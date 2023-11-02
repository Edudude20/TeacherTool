import "./App.css";
//import taskService from "./services/task";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { v4 as uuidv4 } from "uuid"; //unique id for map key https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318

const TicTacToeComponent = () => {
  return <div>Render the Tic-Tac-Toe content here</div>;
};
const TaskXComponent = () => {
  return <div>Render the Task X content here</div>;
};

const Task = (props) => {
  //console.log(props);
  const {
    selectedOption,
    inputs,
    maxOptions,
    optionMaxInputLimit,
    handleOptionsChange,
    isOptionsDisabled,
    handleAddOption,
    removeOption,
  } = props;
  let renderedComponent = null;

  console.log("is options disabled?:", isOptionsDisabled);

  switch (selectedOption) {
    case "match-the-columns":
      renderedComponent = (
        <div>
          <h3>Options</h3>

          <p>
            Task description: drag-and-drop the answer options to the open slots
            of their respective matches. Leave column entry (box on the right
            side) empty if this is a false match.
          </p>
          <fieldset>
            <legend>
              Options {inputs.options.length}/{maxOptions}
            </legend>
            <ol>
              {/* Create a list item from every object in the array */}
              {inputs.options.map((option, index) => (
                //TODO:think about changing the name "object"
                //TODO: input id?
                <div key={option.id}>
                  <input
                    type="text"
                    name="draggableValue"
                    placeholder="Draggable"
                    value={option.draggableValue}
                    onChange={(event) => handleOptionsChange(event, index)}
                    maxLength={optionMaxInputLimit}
                  />
                  <input
                    type="text"
                    name="columnEntryValue"
                    placeholder="Column Entry"
                    value={option.columnEntryValue}
                    onChange={(event) => handleOptionsChange(event, index)}
                    maxLength={optionMaxInputLimit}
                  />
                  <button onClick={() => removeOption(index)}>remove</button>
                </div>
              ))}
            </ol>
            <p>
              Options {inputs.options.length}/{maxOptions}
            </p>

            {isOptionsDisabled ? (
              <button className="disabled" disabled>
                Add option
              </button>
            ) : (
              <button onClick={handleAddOption}>add option</button>
            )}
          </fieldset>
        </div>
      );

      break;
    case "tic-tac-toe":
      renderedComponent = <TicTacToeComponent></TicTacToeComponent>;
      break;
    case "task-x":
      renderedComponent = <TaskXComponent></TaskXComponent>;
      break;

    default:
      renderedComponent = null;
      break;
  }

  return <div className="task">{renderedComponent}</div>;
};
Task.propTypes = {
  selectedOption: PropTypes.string.isRequired,
  inputs: PropTypes.object.isRequired,
  maxOptions: PropTypes.number.isRequired,
  optionMaxInputLimit: PropTypes.number.isRequired,
  handleOptionsChange: PropTypes.func.isRequired,
  handleAddOption: PropTypes.func.isRequired,
  removeOption: PropTypes.func.isRequired,
  isOptionsDisabled: PropTypes.bool.isRequired,
};

function App() {
  //#region variables
  const maxOptions = 10;
  const maxSlides = 4;
  const optionMaxInputLimit = 30;

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
  const isOptionsDisabled = inputs.options.length >= maxOptions; //deactivate "add options" button if max limit is reached
  const isSlidesDisabled = inputs.slides.length >= maxSlides; //deactivate "add slides" button if max limit is reached
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

  const removeOption = (optionIndex) => {
    if (window.confirm(`delete option ${optionIndex}`)) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        options: prevInputs.options.filter((_, index) => index !== optionIndex),
      }));
    }
  };

  const removeSlide = (slideIndex) => {
    if (window.confirm(`delete option ${slideIndex}`)) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        slides: prevInputs.slides.filter((_, index) => index !== index),
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
  const handleSlidesChange = (event, index) => {
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

  return (
    <>
      <p>
        Required fields are followed by <span aria-label="required">*</span>
      </p>
      <form onSubmit={handleSubmit}>
        <section>
          <h2>
            1. Title <span aria-label="required">*</span>
          </h2>
          <p>
            Please write the title of the task. This will show for the students
            as they select their task from the task machine so make it clear.
          </p>
          <label htmlFor="title">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Example: This task is about the functionalities of..."
              value={inputs.title}
              onChange={(event) => handleFormChange(event)}
            />
          </label>
        </section>
        <section>
          <h2>
            2. Slides <span aria-label="required">*</span>
          </h2>
          <p>
            Please write the description of the task for the students. These
            will show as slide (similarly to PowerPoint) for the students as
            they open the task.
          </p>
          <ol>
            {inputs.slides.map((slide, index) => (
              <div key={slide.id}>
                <label htmlFor="slide">
                  <textarea
                    name="slideValue"
                    id="slide"
                    cols="30"
                    rows="10"
                    maxLength={1000}
                    placeholder="Example: This task is about the functionalities of HTML form usability..."
                    value={slide.slideValue}
                    onChange={(event) => handleSlidesChange(event, index)}
                  ></textarea>
                  <button onClick={() => removeSlide(index)}>remove</button>
                </label>
              </div>
            ))}
          </ol>
          <p>
            Slides {inputs.slides.length}/{maxSlides}
          </p>
          {isSlidesDisabled ? (
            <button className="disabled" disabled>
              Add slide
            </button>
          ) : (
            <button onClick={handleAddSlide}>Add slide</button>
          )}
        </section>
        <section>
          <h2>
            4. Task settings <span aria-label="required">*</span>
          </h2>
          <p>
            This is the minigame that the students will play to finish the task.
          </p>
          <p>Please select a task type using the dropdown menu below.</p>
          <label htmlFor="task-type">
            <select
              name="task-type"
              id="task-type"
              value={selectedTask}
              onChange={handleSelectChange}
            >
              <option value="match-the-columns">Match the Columns</option>
              <option value="tic-tac-toe">Tic-Tac-Toe</option>
              <option value="task-x">Task X</option>
            </select>
            <p>Selected option: {selectedTask}</p>
          </label>
          <Task
            selectedOption={selectedTask}
            inputs={inputs}
            maxOptions={maxOptions}
            optionMaxInputLimit={optionMaxInputLimit}
            handleOptionsChange={handleOptionsChange}
            isOptionsDisabled={isOptionsDisabled}
            handleAddOption={handleAddOption}
            removeOption={removeOption}
          ></Task>
        </section>
        <button type="submit">Submit/Continue/Preview</button>
      </form>

      <footer></footer>
    </>
  );
}

export default App;
