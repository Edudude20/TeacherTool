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
    classes: 'shepherd-button-primary',
    text: 'Next',
    type: 'next'
  },
  // Objects for our Tour 'Next' and 'Previous' buttons
];

export default [
  {
    id: "1",
    attachTo: { element: ".title", on: "bottom" },
    buttons: [
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next'
      }
    ],
    title: "Intro!",
    text: [
      `
      Shepherd is a JavaScript library for guiding users through your app.
      It uses <a href="https://popper.js.org/">Popper.js</a>,
      another open source library, to render dialogs for each tour "step".
      `,
    ],
  },
  {
    id: "2",
    attachTo: { element: ".step-2", on: "bottom" },
    buttons: buttonConfig,
    title: "Step two",
    text: ["poop"],
  },
];
