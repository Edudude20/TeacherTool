/*-------------------------------------------------------------------
|  🐼 React TeacherTool Form
|
|  🦝 Todo: CREATE A MAINTAINABLE FORM COMPONENT
|
|  🐸 Returns:  JSX
*-------------------------------------------------------------------*/

import PropTypes from "prop-types";
import Input from "./Input";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import Button from "./Button";

const Form = () => {
  const formMethods = useForm();

//   console.log(formMethods.watch("title")) // watch input value by passing the name of it

  const onSubmit = (data, e) => {
    // e.preventDefault();
    console.log('submit button clicked');
    console.log(data, e)}

    const onError = (errors, e) => console.log(errors, e)

  return (
    // use spread operator to pass all the useForm methods to the FormProvider
    <FormProvider {...formMethods}>
      {/* // "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={formMethods.handleSubmit(onSubmit, onError)}>
        <div className="">
          <div className="">
            <Input
              label="title"
              type="text"
              id="title"
              placeholder="type your title..."
            />
          </div>
        </div>
        <div>
          <Button
            label="Submit Form"
            handleClick={onSubmit}
            className="submit-button"
          ></Button>
        </div>
      </form>
    </FormProvider>
  );
};

Form.propTypes = {};

export default Form;
