/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

//TODO: Labels

{
  /* <label>
<input
  type={type || "text"}
  name="columnEntry"
  onChange={(event) => handleChange(event, index)}
  value={columEntryValue || ""}
  //defaultValue={"default column entry"}
/>
</label> */
}

const OptionForm = (props) => {
  //removeOption, handleChange, optionID, inputs
  console.log(props);
 const { objectValues, removeOption, handleChange, index } = props;
  console.log(objectValues);

  //const { label, type, value, id, } = draggableValue;

  return (
    <div>
      <label>
        {`draggable-${index}`}
        <input
          type={objectValues.type || "text"}
          name={`draggable-${index}`}
          onChange={(event) => handleChange(event, index)}
          value={objectValues.draggableValue || ""}
          //defaultValue="default draggable value"
        />
      </label>
      <label htmlFor="">
        <input 
        type="text" 
        value={objectValues.columnEntryValue || ""}
        onChange={(event) => handleChange(event, index)} />
      </label>
      <button onClick={removeOption}>remove</button>
    </div>
  );
};

OptionForm.propTypes = {
  removeOption: PropTypes.func,
  handleChange: PropTypes.func,
};

export default OptionForm;
