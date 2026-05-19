const ComplaintCard = ({
  complaint,
  onStatusUpdate,
  onDelete
}) => {
  return (
    <div className="complaint-card">
      <h3>{complaint.title}</h3>

      <p>{complaint.description}</p>
      <p>Status: {complaint.status}</p>
      <p>Category: {complaint.category}</p>
      <p>Location: {complaint.location}</p>

      <select
        onChange={(e) =>
          onStatusUpdate(complaint._id, e.target.value)
        }
        defaultValue={complaint.status}
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Resolved</option>
      </select>

      <button onClick={() => onDelete(complaint._id)}>
        Delete
      </button>
    </div>
  );
};

export default ComplaintCard;