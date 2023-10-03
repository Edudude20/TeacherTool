/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./App.css";
import TextInput from "./components/TextInput";
import taskService from "./services/task";
import axios from "axios";

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

const Option = (props) => {
  console.log(props);
  return (
    <div>
      <p>#number</p>

    </div>
  )
}

function App() {
  //#region variables
  const [title, setTitle] = useState("title default");
  //const [description, setDescription] = useState("description default");
  const maxOptions = 10;
  const optionObject = {
    title: <Option></Option>,
    id: 1
  };
  const [options, setOptions] = useState([]);

  //#endregion

  //#region tapahtumankäsittelijät

  useEffect(() => {
    //get all inital task data that are in the database, which should be none by default
    console.log("get all effect");

    //get all the data, then get the options object and set the options useState with setOptions
    taskService
      .getAllOptions() //returns only the response.data
      .then((returnedTask) => {
        console.log(returnedTask);
        if (Array.isArray(returnedTask) && returnedTask.length) {
          setOptions(returnedTask);
        }else{
          console.log("Array is not either an array or is empty, create empty default option");
          setOptions(options.concat(optionObject));
        }
      })
      .catch((error) => console.log("get all effect failed", error)); //Metodilla catch voidaan määritellä ketjun lopussa käsittelijäfunktio, jota kutsutaan, jos mikä tahansa ketjun promiseista epäonnistuu eli menee tilaan rejected
  }, []); //empty dependency array means this effect will only run after the initial render (expect once in development)

  const addOption = (event) => {
    //event.preventDefault(); //estää lomakkeen FORM lähetyksen oletusarvoisen toiminnan, joka aiheuttaisi mm. sivun uudelleenlatautumisen TODO:käännä englanniksi
    console.log("Add option button clicked", event.target);



    taskService
      .createOption(optionObject)
      .then((returnedOption) => {
        console.log(returnedOption);
        setOptions(options.concat(returnedOption));
      })
      .catch((error) => console.log("create option service failed", error));
  };

  const removeOption = (optionID) => {
    if (window.confirm(`delete option ${optionID}`)) {
      axios
        .get(`http://localhost:3001/tasks/1/options/${optionID}`)
        .then((response) => console.log(response.data));
      // axios.delete(`http://localhost:3001/tasks/1/options/${optionID}`).then(response => {
      //   console.log("promise fulfilled, request data:", response);
      //   console.log('Deleted post with ID', optionID);
      // }).catch(error => {
      //   if (error.response) {
      //     console.log(error.response.data);
      //     console.log(error.response.status);
      //     console.log(error.response.headers);
      //   } else if (error.request) {
      //     console.log(error.request);
      //   } else {
      //     console.log('Error', error.message);
      //   }
      //   console.log(error.config);
      // });

      taskService
        .removeOption(optionID)
        .then(() => {
          console.log("remove promise fulfilled");
          taskService.getAllOptions().then((initialOptions) => {
            console.log(
              " getAll promise fulfilled, request data:",
              initialOptions
            );
            setOptions(initialOptions);
          });
        })
        .catch((error) => console.log("remove service failed", error));
    }
  };
  //#endregion

  //TODO: handleSubmit

  return (
    <>
      {/* <header>
        <h1>AIIS CLP (Collaborative learning platform)</h1>
        <div className="dropdown-menu">
          <button className="dropdown-menu-button">
            Toggle languages (dropdown)
          </button>
          <div id="myDropdown" className="dropdown-menu-content">
            <a href="#">Link1</a>
            <a href="#">Link2</a>
            <a href="#">Link3</a>
          </div>
        </div>
      </header>
      <div>
        <h3>Description of the tool</h3>
        <p>video tutorial</p>
      </div>
      <div>
        <h2>1. Title</h2>
        <p>
          Please write the title of the task. This will show for the students as
          they select their task from the task machine so make it clear.
        </p>
        <TextInput
          defaultValue={title}
          id={"title"}
          setInput={setTitle}
          label={"Title"}
        ></TextInput>
      </div>
      <div>
        <h2>2. Slide</h2>
        <Description></Description>
      </div>
      <div>
        <h2>3. Learning material (optional)</h2>
        <p>
          You can add a video (GIF) explaining for example the task type (e.g.
          match-the columns) or the subject of the module. Video must be under
          XXMb in size.
        </p>
        <input
          type="file"
          name="learning-material"
          id="learning-material"
          accept=".gif"
        />
      </div> */}
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
          <ol>
            {/* Create a list item from every object in the array */}
            {options.map((option) => (
              <li key={option.id}>
                {option.title}
                <button onClick={() => removeOption(option.id)}>remove</button>
              </li>
            ))}
          </ol>
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
