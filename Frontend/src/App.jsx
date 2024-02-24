import axios from "axios";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";

const App = () => {
  const [results, setResults] = useState([]);
  const [Titlee, setTitle] = useState("");
  const [descriptione, setDescription] = useState("");
  const [updateTaskid,setUpdateTaskId]=useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:1419/api/v1/tasks");
      const data = await response.json();
      const reversedTasks = [...data.data].reverse();
      setResults(reversedTasks);
    };
    fetchData();
  }, [results]);

  //delete data

  const handelDelte = async (task_id) => {
    const res = await axios.delete(
      `http://localhost:1419/api/v1/deletetask/${task_id}`
    );
  };

  //add task
  const handelTask = async () => {
    const postData = {
      Description: descriptione,
      Title: Titlee,
      Category: "teaching",
    };
  
    try {
      const res = await axios.post(
        "http://localhost:1419/api/v1/newtask",
        postData
      );
      console.log(res.data); 
    } catch (error) {
      console.error(error);
    }

    setTitle(" ")
    setDescription(" ")
  };
  return (
    <div>
      <div className="flex justify-center mt-12 gap-6">
        <input
          className="border-2 outline-none p-2"
          type="text"
          placeholder="Title of task"
          value={Titlee}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border-2 outline-none p-2"
          type="text"
          placeholder="Decription of task"
          value={descriptione}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={()=>handelTask()} className="bg-blue-500 p-2 text-xl font-semibold rounded-lg active:brightness-95 pl-2 pr-2">
          Add task
        </button>
      </div>
      {/* previous task */}

      <ul className="mt-20 mx-auto max-w-6xl">
        {results.map((result, index) => (
          <li key={index}>
{updateTaskid===result._id?
// if prsent
<div className="border-2 p-4 ">
<div className="flex gap-12">
  <fieldset>
    <div className="flex pb-4 justify-between">
      <label class="peer ...">
        <input
          onClick={() => handelDelte(result._id)}
          type="checkbox"
          name="todo[1]"
        />
      </label>

      <input value={result.Tilte} type="text" className="text-xl font-bold"/>
    <button className="bg-blue-500 p-2 pl-2 pr-2 text-sm text-white font-semibold"> Save</button>
    </div>
    <h1>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      Eos labore ex illo natus eum soluta quos adipisci harum,
      distinctio ut eligendi excepturi impedit officiis id nulla
      enim aspernatur necessitatibus cum?
    </h1>
  </fieldset>
</div>
</div>

:
<div className="border-2 p-4 ">
<div className="flex gap-12">
  <fieldset>
    <div className="flex pb-4 justify-between">
      <label class="peer ...">
        <input
          onClick={() => handelDelte(result._id)}
          type="checkbox"
          name="todo[1]"
        />
      </label>

      <h1 className="text-xl font-bold">{result.Title}</h1>
    <CiEdit size={30} className="cursor-pointer" onClick={()=>setUpdateTaskId(result._id)} />
    </div>
    <h1>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      Eos labore ex illo natus eum soluta quos adipisci harum,
      distinctio ut eligendi excepturi impedit officiis id nulla
      enim aspernatur necessitatibus cum?
    </h1>
  </fieldset>
</div>
</div>
}

           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
