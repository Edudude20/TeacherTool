/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";
import TextInput from "./components/TextInput";

const Description = () => {
  return (
    <div>
      <p>
        Please write the description of the task for the students. These will
        show as slide (similarly to PowerPoint) for the students as they open
        the task.
      </p>
      <textarea id="title" rows={4} cols={50} defaultValue={'description default'}></textarea>
      <button>+ add new description slide</button>
    </div>
  );
};

function App() {
  const [title, setTitle] = useState("title default");
  const [description, setDescription] = useState("description default");

  //TODO: handleSubmit

  return (
    <>
      <header>
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
      </div>
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
            <li>Option 1</li>
            <li>Option 2</li>
          </ol>
          <button>add option +</button>
          <p>Options x/10</p>
        </div>
      </div>
      <button>Submit/Continue/Preview</button>
    </>
  );
}

export default App;
