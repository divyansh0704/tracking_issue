import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";






const Dashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");

    const fetchTickets = async () => {
        try {
            const { data } = await API.get("/tickets", {
                params: {
                    status: statusFilter,
                    priority: priorityFilter
                }
            });

            setTickets(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, [statusFilter, priorityFilter]);

    return (
        <div style={{ padding: "40px" }}>
            <h2>Ticket Dashboard</h2>

            {/* Filters */}
            <div style={{ marginBottom: "20px" }}>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="closed">Closed</option>
                </select>

                <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    style={{ marginLeft: "10px" }}
                >
                    <option value="">All Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <Link to="/create">
                <button>Create Ticket</button>
            </Link>

            {/* Ticket List */}
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Created By</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.length === 0 ? (
                        <tr>
                            <td colSpan="4">No tickets found</td>
                        </tr>
                    ) : (
                        tickets.map((ticket) => (
                            <tr key={ticket._id}>
                                <td><Link to={`/tickets/${ticket._id}`}>
                                    {ticket.title}
                                </Link></td>
                                <td>{ticket.status}</td>
                                <td>{ticket.priority}</td>
                                <td>{ticket.createdBy?.name}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
