import axios from "axios";
const baseURL = "http://localhost:3001/options";

/**
 * @description Module handling the option services from the database
 */

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseURL, newObject);

  return request.then((response) => response.data);
};

/**
 *
 * @param {number} id option's id that will be removed
 */
const remove = (id) => {
  console.log(`remove person id: `, id);
  const request = axios.delete(`${baseURL}/${id}`);
  return request;
};

export default {
  //TODO: käännä englanniksi
  // Olion määrittelyssä vasemmalla puolella kaksoispistettä olevat nimet tarkoittavat eksportoitavan olion kenttiä,
  // kun taas oikealla puolella olevat nimet ovat moduulin sisällä määriteltyjä muuttujia.
  // Koska olion kenttien nimet ovat samat kuin niiden arvon määrittelevien muuttujien nimet, voidaan olion määrittely kirjoittaa tiiviimmässä muodossa:
  getAll,
  create,
  remove,
};
