import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const CreateTicket = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("/tickets", {
        title,
        description,
        priority
      });

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create ticket");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Create Ticket</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit" style={{ marginTop: "15px" }}>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTicket;
