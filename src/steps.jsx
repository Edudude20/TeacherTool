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
// Do we scrollTo?
// Is there a cancelIcon?
// Our step title
// Our Step text
// see here: https://shepherdjs.dev/docs/tutorial-02-usage.html

//adding buttons[] in a step overwrites the tourOptions -> defaultStepOptions -> buttonconfig in App.jsx
export default [
  {
    id: "intro-step",
    attachTo: { element: ".title", on: "bottom" },
    scrollTo: true,
    cancelIcon: { enabled: true },
    title: "Intro!",
    text: [
      `
      Shepherd is a JavaScript library for guiding users through your app.
      It uses <a href="https://popper.js.org/">Popper.js</a>,
      another open source library, to render dialogs for each tour "step".
      `,
    ],
  },
];
