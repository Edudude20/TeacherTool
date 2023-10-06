import { useState, useEffect } from "react";
import "./App.css";
import TextInput from "./components/TextInput";
import taskService from "./services/task";

const Description = () => {
  return (
    <div>
      <p>
        Please write the description of the task for the students. These will
        show as slide (similarly to PowerPoint) for the students as they open
        the task.
      </p>
      <textarea
        id="title"
        rows={4}
        cols={50}
        defaultValue={"description default"}
      ></textarea>
      <button>+ add new description slide</button>
    </div>
  );
};

/**
 * Component to map the list of options
 * @param {array} options Array of options of the Match-the-Columns
 * @param {function} removeOption
 * @returns Component for the list of options
 */
const Options = ({ options, removeOption }) => {

  const maxOptions = 10; //TODO:add maximum limit
  return (
    <div>
      <ol>
        {/* Create a list item from every object in the array */}
        {options.map((option, index) => (
          <li key={option.id}>
            {option.name}
            <OptionForm
              removeOption={() => removeOption(option, index)}
            ></OptionForm>
          </li>
        ))}
      </ol>
    </div>
  );
};

/**
 * 
 * @param {method} removeOption method to remove an option
 * @returns The list item option for Match-the-columns
 */
const OptionForm = ({removeOption}) => {
  return (
    <div>
      <label>
        <input type="text" defaultValue={"default draggable value"} />
      </label>
      <button onClick={removeOption}>remove</button>
    </div>
  );
};

function App() {
  //#region variables
  const [title, setTitle] = useState("title default");
  //const [description, setDescription] = useState("description default");
  const maxOptions = 10;
  const [options, setOptions] = useState([]);

  //#endregion

  //#region tapahtumankäsittelijät

  useEffect(() => {
    //get all inital task data that are in the database, which should be none by default
    console.log("get all effect");

    //get all the data, then get the options object and set the options useState with setOptions
    //TODO: ota pois, kun aiot tehdä backendiä
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

  const addOption = (event) => {
    //event.preventDefault(); //estää lomakkeen FORM lähetyksen oletusarvoisen toiminnan, joka aiheuttaisi mm. sivun uudelleenlatautumisen TODO:käännä englanniksi
    console.log("Add option button clicked", event.target);

    const optionObject = {
      columnEntry: "column entry",
      name: `Option ${options.length + 1}`,
      id: options.length + 1,
    };
    setOptions(options.concat(optionObject));

    // taskService
    //   .createOption(optionObject)
    //   .then((returnedOption) => {
    //     console.log(returnedOption);
    //     setOptions(options.concat(returnedOption));
    //   })
    //   .catch((error) => console.log("create option service failed", error));
  };

  const removeOption = (option, optionIndex) => {
    if (window.confirm(`delete option ${option.name}`)) {
      const updatedOptions = [...options];
      updatedOptions.splice(optionIndex, 1);
      console.log("updated options array:", updatedOptions);

      const updatedOptionsWithNewIDs = updatedOptions.map((item, index) => ({
        ...item,
        name: `Option ${index + 1}`,
        id: index + 1,
      }));
      console.log(
        `Removed item ${optionIndex}, new array with updated id's: `,
        updatedOptionsWithNewIDs
      );
      setOptions(updatedOptionsWithNewIDs);
    }
  };
  //#endregion

  //TODO: handleSubmit

  return (
    <>
      <div>
        <h2>4. Task settings</h2>
        <p>
          This is the minigame that the students will play to finish the task.
        </p>
        <p>Please select a task type using the dropdown menu below.</p>
        <button>Select task type (dropdown)</button>
        <div>
          <p>
            Task description: drag-and-drop the answer options to the open slots
            of their respective matches. Leave column entry (box on the right
            side) empty if this is a false match. Options are draggable.
          </p>
          <p>Options x/10</p>
          <Options options={options} removeOption={removeOption}></Options>
          <button onClick={addOption}>add option +</button>
          <p>
            Options {options.length}/{maxOptions}
          </p>
        </div>
      </div>
      <button>Submit/Continue/Preview</button>
    </>
  );
}

export default App;
