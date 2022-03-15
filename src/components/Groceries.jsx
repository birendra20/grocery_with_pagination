import { useEffect, useState } from "react";
import axios from "axios";
import nanoid from "nano-id";

export const Groceries = () => {
  const [text, setText] = useState("");
  const [groceries, setGroceries] = useState([]);
  const [page, setPage] = useState(1);

  const addGrocery = (data) => {
    const payload = {
      title: data,
      status: false,
      id: nanoid(9)
    };
    setGroceries([...groceries, payload]);
  };

  useEffect(() => {
    getData();
  }, [page]);

  const getData = () => {
    axios
      .get(
        `https://json-server-mocker-masai.herokuapp.com/tasks?_limit=3&_page=${page}`
      )
      .then((res) => {
        setGroceries(res.data);
      });
  };

  const handleDelete = (id) => {
    setGroceries((prev) => prev.filter((element) => element.id !== id));
  };

  return (
    <div>
      <input type="text" onChange={(e) => setText(e.target.value)} />
      <button
        onClick={() => {
          fetch("https://json-server-mocker-masai.herokuapp.com/tasks", {
            method: "POST",
            body: JSON.stringify({ title: text, purchased: false }),
            headers: {
              "content-type": "application/json"
            }
          }).then(() => {
            getData();
          });
          // axios
          //   .post("https://json-server-mocker-masai.herokuapp.com/tasks", {
          //     title: text,
          //     purchased: false
          //   })
          //   .then(function (response) {
          //     console.log(response);
          //   });
        }}
      >
        Save Grocery
      </button>
      {groceries.map((g) => (
        <div className="data" key={g.id}>
          {" "}
          <td>{g.title}</td>
          <td>
            <button onClick={() => handleDelete(g.id)} className="btn ">
              Delete
            </button>
          </td>
        </div>
      ))}

      <button
        disabled={page === 1}
        onClick={() => {
          setPage(page - 1);
        }}
      >
        Prev
      </button>
      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next
      </button>
      <p>Page:{page}</p>
    </div>
  );
};
// https://yash-react-json-server.herokuapp.com/
// https://json-server-mocker-masai.herokuapp.com/tasks

// axios.post("https://json-server-mocker-masai.herokuapp.com/tasks",{})
