/*-------------------------------------------------------------------
|  🐼 React TeacherTool Form Component
|
|  🐸 Returns:  JSX
*-------------------------------------------------------------------*/
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";

import Button from "../Button/Button";
import Title from "../Title/Title";
import Slides from "../Slides/Slides";
import Task from "../Tasks/Task";
import MatchTheColumns from "../Tasks/MatchTheColumns/MatchTheColumns";
import TaskX from "../Tasks/TaskX";

import styles from "./formStyle.module.css";

const Form = () => {
  const formMethods = useForm({
    //Validation strategy before submitting behaviour: validation is triggered on the blur event.
    mode: "onBlur",
    //Validation strategy after submitting behaviour.
    reValidateMode: "onBlur",
    //all validation errors for single field will display at once
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

  // "handleSubmit" will validate your inputs before invoking "onSubmit"
  const onSubmit = (data) => {
    console.log("submit button clicked");
    console.log("data:", data);
    formMethods.reset();
    setSubmitted(true);
  };

  const onError = (errors) => console.log("errors:", errors);

  return (
    // use spread operator to pass all the useForm methods to the FormProvider context

    <FormProvider {...formMethods}>
      <p className={styles.info}>
        Required fields are followed by <span aria-label="required">*</span>
      </p>
      <form
        onSubmit={(e) => e.preventDefault()}
        noValidate //rely on react-hook-form
      >
        <Title></Title>
        <Slides></Slides>
        <Task>
          <MatchTheColumns></MatchTheColumns>
          <TaskX value={"testi"}></TaskX>
        </Task>
        <Button
          label="Submit Form"
          handleClick={formMethods.handleSubmit(onSubmit, onError)}
          className={styles.submitButton}
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
