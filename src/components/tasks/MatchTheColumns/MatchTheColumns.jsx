import Button from "../../Button/Button";
import { useFieldArray } from "react-hook-form";
import Input from "../../Input/Input";
import style from "./mtcStyle.module.css";

const MatchTheColumns = () => {
  //Constants
  const maxOptions = 10;
  const { fields, append, remove } = useFieldArray({
    name: "options",
  });
  // Check if the "Add Option" button should be disabled
  const isOptionsDisabled = fields.length >= maxOptions;
  const optionMaxInputLimit = 70;
  const definitionMaxInputLimit = 100;
  const options_validation = {
    required: {
      value: true,
      message: "This is required",
    },
    maxLength: {
      value: 70,
      message: `Maximum is ${optionMaxInputLimit} characters`,
    },
  };

  const definition_validation = {
    required: {
      value: true,
      message: "This is required",
    },
    maxLength: {
      value: definitionMaxInputLimit,
      message: `Maximum is ${definitionMaxInputLimit} characters`,
    },
  };

  // if you want to control your fields with watch
  // const watchResult = watch("test");
  // console.log(watchResult);

  return (
    <fieldset>
      <legend>Match-The-Columns</legend>
      <ol>
        {/* Create a list item from every object in the array */}
        {fields.map((option, index) => (
          <li key={option.id} className={style.container}>
            {option.isFalseMatch ? (
              <>
                <Input
                  label="column entry"
                  type="text"
                  id={option.id}
                  name={`options.${index}.columnEntryValue`}
                  placeholder="Column Entry (false match)"
                  multiline={false}
                  disabled={true}
                ></Input>
                <Input
                  label="draggable entry"
                  type="text"
                  id={`draggable${index}`}
                  name={`options.${index}.draggableValue`}
                  placeholder="Draggable"
                  validation={options_validation}
                  multiline={false}
                ></Input>
                <Input
                  label="draggable definition"
                  type="text"
                  id={`definition${index}`}
                  name={`options.${index}.draggableDefinition`}
                  placeholder="Definition text for the draggable"
                  validation={definition_validation}
                  multiline={true}
                ></Input>
              </>
            ) : (
              <>
                <Input
                  label="column entry"
                  type="text"
                  id={option.id}
                  name={`options.${index}.columnEntryValue`}
                  placeholder="Column Entry"
                  validation={options_validation}
                  multiline={false}
                ></Input>
                <Input
                  label="draggable entry"
                  type="text"
                  id={`draggable${index}`}
                  name={`options.${index}.draggableValue`}
                  placeholder="Draggable"
                  validation={options_validation}
                  multiline={false}
                ></Input>
                <Input
                  label="draggable definition"
                  type="text"
                  id={`definition${index}`}
                  name={`options.${index}.draggableDefinition`}
                  placeholder="Definition text for the draggable"
                  validation={definition_validation}
                  multiline={true}
                ></Input>
              </>
            )}
            <Button
              handleClick={() => remove(index)}
              label="Remove"
              className="remove-button"
            ></Button>
          </li>
        ))}
      </ol>
      <div className={style.buttonContainer}>
        {isOptionsDisabled ? (
          <Button
            label="Can't add anymore options"
            className="add-button-disabled"
            isDisabled={isOptionsDisabled}
          ></Button>
        ) : (
          <>
            <Button
              handleClick={() => append({})} //TODO fill
              label="Add option"
              className="add-button"
            ></Button>
            <Button
              handleClick={() =>
                append({
                  isFalseMatch: true,
                })
              } //TODO fill this too
              label="Add false match"
              className="add-button"
            ></Button>
          </>
        )}
      </div>
      <p>
        Options {fields.length}/{maxOptions}
      </p>
    </fieldset>
  );
};

export default MatchTheColumns;
