/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";

const Input = ({ defaultValue, id, setInput, label}) => {
  const handleChange = (event) => {
    //event.preventDefault(); Tarvitaanko?
    //estää lomakkeen lähetyksen oletusarvoisen toiminnan, joka aiheuttaisi mm. sivun uudelleenlatautumisen
    setInput(event.target.value);
  }
  return (
    <div>
      <label>{label}: </label>
      <input
        type="text"
        name="firstName"
        onChange={handleChange}
        value={defaultValue}
        id= {id}
      />
    </div>
  );
}

function App() {
  const [title, setTitle] = useState('title default');
  const [description, setDescription] = useState('description default');

  return (
    <>
      <header>
        <h1>AIIS CLP (Collaborative learning platform)</h1>
        <button>Toggle languages (dropdown)</button>
      </header>
      <div>
        <h2>1. Title</h2>
        <p>
          Please write the title of the task. This will show for the students as
          they select their task from the task machine so make it clear.
        </p>
        <Input defaultValue={title} id={'title'} setInput={setTitle} label={'Title'}></Input>
      </div>
      <div>
        <h2>2. Slide</h2>
        <p>
          Please write the description of the task for the students. These will
          show as slide (similarly to PowerPoint) for the students as they open
          the task.
        </p>
        <Input defaultValue={description} id={'description'} setInput={setDescription} label={'Description'}></Input>
      </div>
      <div>
        <h2>3. Learning material (optional)</h2>
        <p>
          You can add a video (GIF) explaining for example the task type (e.g.
          match-the columns) or the subject of the module. Video must be under
          XXMb in size.
        </p>
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
          <button>
            add option +
          </button>
          <p>Options x/10</p>
        </div>
      </div>
      <button>Submit/Continue/Preview</button>
    </>
  );
}

export default App;
