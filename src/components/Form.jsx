/*-------------------------------------------------------------------
|  🐼 React TeacherTool Form Component
|
|  🐸 Returns:  JSX
*-------------------------------------------------------------------*/
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";

import Button from "./Button";
import Title from "./Title";
import Slides from "./Slides";
import Task from "./Task";
import MatchTheColumns from "./tasks/MatchTheColumns";
import TaskX from "./tasks/TaskX";

const Form = () => {
  const formMethods = useForm({
    // by setting validateCriteriaMode to 'all',
    // all validation errors for single field will display at once
    // mode: "onSubmit",
    criteriaMode: "all",
    // defaultValues: {}; you can populate the fields by this attribute
    defaultValues: {
      slides: [{ slideValue: "" }],
      options: [
        { columnEntryValue: "", draggableValue: "", isFalseMatch: false },
      ],
    },
  });

  //   console.log(formMethods.watch("title")) // watch input value by passing the name of it

  //validation
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data) => {
    console.log("submit button clicked", event);
    console.log("data:", data);
    setSubmitted(true);
  };

  const onError = (errors) => console.log("errors:", errors);

  return (
    // use spread operator to pass all the useForm methods to the FormProvider context
    <FormProvider {...formMethods}>
      {/* // "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={formMethods.handleSubmit(onSubmit, onError)}>
        <Title></Title>
        <Slides></Slides>
        <Task>
          <MatchTheColumns></MatchTheColumns>
          <TaskX value={"testi"}></TaskX>
        </Task>
        <Button
          label="Submit Form"
          handleClick={onSubmit}
          className="submit-button"
        ></Button>
      </form>
      {submitted && (
        <div className="success-message">Success! Thank you for submitting</div>
      )}
    </FormProvider>
  );
};

Form.propTypes = {};

export default Form;
