import Button from "../Button";
import { useFieldArray } from "react-hook-form";
import Input from "../Input";

const MatchTheColumns = () => {
  //Constants
  const maxOptions = 10;
  const { fields, append, remove } = useFieldArray({
    name: "options",
  });
  // Check if the "Add Option" button should be disabled
  const isOptionsDisabled = fields.length >= maxOptions;
  const optionMaxInputLimit = 30;
  const definitionMaxInputLimit = 50;
  const options_validation = {
    required: {
      value: true,
      message: "This is required",
    },
    maxLength: {
      value: optionMaxInputLimit,
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
          <li key={option.id}>
            {option.isFalseMatch ? (
              <>
                <Input
                  label="column entry"
                  type="text"
                  id={option.id}
                  name={`options.${index}.columnEntryValue`}
                  placeholder="Empty (false match)"
                  validation={options_validation}
                  multiline={false}
                  disabled
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
                <p>&rarr;</p>
                <Input
                  label="draggable definition"
                  type="text"
                  id={`definition${index}`}
                  name={`options.${index}.draggableDefinition`}
                  placeholder="Draggable definition text here"
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
                  placeholder="Empty (false match)"
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
                <p>&rarr;</p>
                <Input
                  label="draggable definition"
                  type="text"
                  id={`definition${index}`}
                  name={`options.${index}.draggableDefinition`}
                  placeholder="Draggable definition text here"
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
      <p>
        Options {fields.length}/{maxOptions}
      </p>

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
            handleClick={() => append({})} //TODO fill this too
            label="Add false match"
            className="add-button"
          ></Button>
        </>
      )}
    </fieldset>
  );
};

export default MatchTheColumns;
