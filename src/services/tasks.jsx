import axios from "axios";
const baseURL = "http://localhost:3001/tasks"; // 1 = taskID => we only have one task at this time

/**
 * @description Module handling the option services from the database
 * The key ["/tasks/:taskId/options/optionId"] represents the URL I want to POST to, and the value ["/options/optionId"] represents the URL json-server will automatically redirect that request to. check routes.json
 */

const getAll = () => {
  const request = axios.get(`${baseURL}`);
  return request.then((response) => response.data); //return only the response data
};

const createTask = (newObject) => {
  const request = axios.post(`${baseURL}`, newObject); 

  return request.then((response) => response.data);//return only the response data
};

/**
 *
 * @param {number} id option's id that will be removed
 */
const removeTask = (id) => {
  console.log(`remove person id: `, id);
  const request = axios.delete(`${baseURL}/${id}`);
  return request;
};

export default {
  //TODO: käännä englanniksi
  // Olion määrittelyssä vasemmalla puolella kaksoispistettä olevat nimet tarkoittavat eksportoitavan olion kenttiä,
  // kun taas oikealla puolella olevat nimet ovat moduulin sisällä määriteltyjä muuttujia.
  // Koska olion kenttien nimet ovat samat kuin niiden arvon määrittelevien muuttujien nimet, voidaan olion määrittely kirjoittaa tiiviimmässä muodossa:
  getAllTasks: getAll,
  createTask,
  removeTask: removeTask,
};
