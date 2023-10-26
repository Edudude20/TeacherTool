import "./App.css";
//import TextInput from "./components/TextInput";
//import taskService from "./services/task";
import { useState, useEffect } from "react";
//import Description from "./components/Description";
import OptionForm from "./components/OptionForm";

function App() {
  //#region variables
  //const [title, setTitle] = useState("title default");
  //const [description, setDescription] = useState("description default");
  const maxOptions = 10;

  //gloabl index for options? https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318
  const [inputs, setInputs] = useState([{
    draggableValue: "",
    columnEntryValue: "",
  }]);
  const [options, setOptions] = useState([])

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
    console.log("Add option button clicked", event.target);
    const optionObject = {
      draggableValue: "",
      columnEntryValue: "",
    };

    console.log(optionObject);
    //setOptions(options.concat(optionObject));
    setInputs(inputs.concat(optionObject));

    // taskService
    //   .createOption(optionObject)
    //   .then((returnedOption) => {
    //     console.log(returnedOption);
    //     setOptions(options.concat(returnedOption));
    //   })
    //   .catch((error) => console.log("create option service failed", error));
  };

  const removeOption = (optionIndex) => {
    if (window.confirm(`delete option ${optionIndex}`)) {
      const updatedOptions = [...inputs];
      updatedOptions.splice(optionIndex, 1);
      console.log("updated options array:", updatedOptions);

      // const updatedOptionsWithNewIDs = updatedOptions.map((item, index) => ({
      //   ...item,
      //   name: `Option ${index + 1}`,
      // }));

      console.log(
        `Removed item ${optionIndex}, new array with updated id's: `
      );
      setInputs(updatedOptions);
    }
  };
  //#endregion

  const handleChange = (event, index) => {
    console.log("target: ", event.target);
    console.log("name: ", event.target.name);
    console.log("value: ", event.target.value);

    //handle multiple inputs
    const values = [...inputs];
    console.log(values);
    values[index][event.target.name] = event.target.value;
    setInputs(values);
  };

  //TODO: handleSubmit
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("handle submit activated!");
    console.log(`The data you submitted: `, inputs);
    alert(`The data you submitted: `, inputs);
  };

  return (
    <>
      <header></header>
      <p>
        Required fields are followed by <span aria-label="required">*</span>
      </p>
      <form onSubmit={handleSubmit}>
        <section>
          <h2>
            4. Task settings <span aria-label="required">*</span>
          </h2>
          <p>
            This is the minigame that the students will play to finish the task.
          </p>
          <p>Please select a task type using the dropdown menu below.</p>
          <button>Select task type (dropdown)</button>
          <div>
            <p>
              Task description: drag-and-drop the answer options to the open
              slots of their respective matches. Leave column entry (box on the
              right side) empty if this is a false match.
            </p>
            <fieldset>
              <legend>
                Options {options.length}/{maxOptions}
              </legend>
              <ol>
                {/* Create a list item from every object in the array */}
                {inputs.map((object, index) => {//TODO:think about changing the name "object"
                  {/* <OptionForm
                    key={object.id} //TODO: don't use index!
                    objectValues={object}
                    handleChange={handleChange}
                    removeOption={() => removeOption(object, index)}
                    index={index}
                  ></OptionForm> */}
                  return (
                    <div key={index}>
                      <input type="text"
                      name="draggableValue"
                      placeholder="Draggable"
                      value={object.draggableValue}
                      onChange={event => handleChange(event, index)} />
                      <input type="text" 
                        name="columnEntryValue"
                        placeholder="Column Entry"
                        value={object.columnEntryValue}
                        onChange={event => handleChange(event, index)}
                      />
                      <button onClick={() => removeOption(index)}>remove</button>
                    </div>
                  )
                })}
              </ol>
              <p>
                Options {options.length}/{maxOptions}
              </p>
            </fieldset>
            <button onClick={handleAddOption}>add option +</button>
          </div>
        </section>
        <button type="submit">Submit/Continue/Preview</button>
      </form>

      <footer></footer>
    </>
  );
}

export default App;
