import "./App.css";
//import taskService from "./services/task";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

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
    disabled,
    handleAddOption,
    removeOption,
  } = props;
  let renderedComponent = null;

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
              {
                /* Create a list item from every object in the array 
              //gloabl index for options? https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318*/
              }
              {inputs.options.map((object, index) => {
                //TODO:think about changing the name "object"
                {
                  /* <OptionForm
                    key={object.id} //TODO: don't use index!
                    objectValues={object}
                    handleChange={handleChange}
                    removeOption={() => removeOption(object, index)}
                    index={index}
                  ></OptionForm> */
                }
                return (
                  <div key={object.id}>
                    <input
                      type="text"
                      name="draggableValue"
                      placeholder="Draggable"
                      value={object.draggableValue}
                      onChange={(event) => handleOptionsChange(event, index)}
                      maxLength={optionMaxInputLimit}
                    />
                    <input
                      type="text"
                      name="columnEntryValue"
                      placeholder="Column Entry"
                      value={object.columnEntryValue}
                      onChange={(event) => handleOptionsChange(event, index)}
                      maxLength={optionMaxInputLimit}
                    />
                    <button onClick={() => removeOption(index)}>remove</button>
                  </div>
                );
              })}
            </ol>
            <p>
              Options {inputs.options.length}/{maxOptions}
            </p>

            {disabled ? (
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
  disabled: PropTypes.bool.isRequired,
  handleAddOption: PropTypes.func.isRequired,
  removeOption: PropTypes.func.isRequired,
};

function App() {
  //#region variables
  const maxOptions = 10;
  const optionMaxInputLimit = 30;

  
  const [inputs, setInputs] = useState({
    title: "",
    options: [
      {
        draggableValue: "",
        columnEntryValue: "",
        id: uuidv4(),
      },
    ],
  });
  const [disabled, setDisabled] = useState(false); //"add options" button deactivation state
  const [selectedTask, setSelectedTask] = useState("match-the-columns");

  //#endregion

  //#region tapahtumankäsittelijät

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
    event.preventDefault(); //estää lomakkeen FORM lähetyksen oletusarvoisen toiminnan, joka aiheuttaisi mm. sivun uudelleenlatautumisen TODO:käännä englanniksi
    const { options } = inputs;
    const optionAmount = options.length; //how many options in the options array

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

      if (optionAmount + 1 === maxOptions) {
        //disable the add button if the maximum amount of options is achieved
        setDisabled(true);
      }
    } else {
      alert(`Max option limit acquired!`);
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
  //#endregion

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
          <p>TODO: The instructions for the title</p>
          <label htmlFor="title">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="placeholder text"
              value={inputs.title}
              onChange={(event) => handleFormChange(event)}
            />
          </label>
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
            disabled={disabled}
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
