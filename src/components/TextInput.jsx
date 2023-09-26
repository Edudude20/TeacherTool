/* eslint-disable react/prop-types */

/**
 * 
 * @description A component handling the text input of the application.
 * @param {string} defaultValue - default value of the input when rendering first time
 * @param {string} id - 
 * @param setInput - A SetStateAction. Sets the state of the variable defined in useState
 * @param {string} label - The label of the input element visible to the user.
 */
const TextInput = ({ defaultValue, id, setInput, label}) => {
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

  export default TextInput;