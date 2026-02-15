import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const TicketDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [ticket, setTicket] = useState(null);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");

  const fetchTicket = async () => {
    try {
      const { data } = await API.get(`/tickets/${id}`);
      setTicket(data);
      setStatus(data.status);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  const addComment = async (e) => {
    e.preventDefault();

    try {
      await API.post(`/tickets/${id}/comments`, { text: comment });
      setComment("");
      fetchTicket();
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async () => {
    try {
      await API.put(`/tickets/${id}`, { status });
      fetchTicket();
    } catch (error) {
      console.error(error);
    }
  };

  if (!ticket) return <p>Loading...</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h2>{ticket.title}</h2>
      <p><strong>Description:</strong> {ticket.description}</p>
      <p><strong>Priority:</strong> {ticket.priority}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Created By:</strong> {ticket.createdBy?.name}</p>

    
      {(user.role === "admin" || user.role === "support") && (
        <div style={{ marginTop: "20px" }}>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <button onClick={updateStatus} style={{ marginLeft: "10px" }}>
            Update Status
          </button>
        </div>
      )}

      {/* Comments Section */}
      <div style={{ marginTop: "30px" }}>
        <h3>Comments</h3>

        {ticket.comments?.length === 0 && <p>No comments yet</p>}

        {ticket.comments?.map((c) => (
          <div key={c._id} style={{ marginBottom: "10px" }}>
            <strong>{c.user?.name}:</strong> {c.text}
          </div>
        ))}

        <form onSubmit={addComment} style={{ marginTop: "20px" }}>
          <input
            type="text"
            placeholder="Add comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button type="submit" style={{ marginLeft: "10px" }}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketDetails;
