/*-------------------------------------------------------------------
|  🐼 React TeacherTool Tour's steps
|
|  🐸 Returns:  JSX
*-------------------------------------------------------------------*/
// Our Tour Logic. We need to specify:
// id
// where to attach To
// our buttons
// Do we highlight?
// Do we scrollTo? (set to true in defaultStepOptions in App.jsx)
// Our step title
// Our Step text
// see here: https://shepherdjs.dev/docs/tutorial-02-usage.html

//adding buttons[] in a step overwrites the tourOptions -> defaultStepOptions -> buttonconfig in App.jsx
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

export default [
  {
    id: "1",
    attachTo: { element: ".step-1", on: "bottom" },
    buttons: [
      {
        classes: "shepherd-button-primary",
        text: "Next",
        type: "next",
      },
    ],
    title: "Start",
    text: [
      `
      Shepherd is a JavaScript library for guiding users through your app.
      It uses <a href="https://popper.js.org/">Popper.js</a>,
      another open source library, to render dialogs for each tour "step".
      `
    ],
  },
  {
    id: "2",
    attachTo: { element: ".title", on: "bottom" },
    buttons: buttonConfig,
    title: "Intro",
    text: [
      `
      This is the tool for the AIIS Peer-to-peer Online Learning and Innovation System or POLIS.
      This tool is designed so that teachers from the Turku University of Applie Sciences can create their micro-credential tasks for the AIIS POLIS
      `
    ],
  },
  {
    id: "3",
    attachTo: { element: ".step-3", on: "bottom" },
    buttons: buttonConfig,
    title: "Required fields",
    text: [
      `
      Please check that you have filled in the required input fields marked with an asterisk <b>*</b>.
      `
    ],
  },
  {
    id: "4",
    attachTo: { element: ".step-4", on: "bottom" },
    buttons: buttonConfig,
    title: "1. Title",
    text: [
      `<p>Firstly, you need to set the title of the mini task. Notice that all of the input fields, including the title, has a maximum number of characters.</p>
      <p>As mentioned before, input fields with * sign need to be filled to be able to send the task to the learning environment.</p>`
    ],
  },
];
