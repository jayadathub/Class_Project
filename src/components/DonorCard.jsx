export default function DonorCard({ donor, onRequest, isRequested }) {
  return (
    <div className="card">
      <h3>{donor.name}</h3>

      <p>
        <strong>Blood Group:</strong> {donor.bloodGroup}
      </p>

      <p>
        <strong>City:</strong> {donor.city}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        <span
          className={donor.available ? "available" : "not-available"}
        >
          {donor.available ? "Available" : "Not Available"}
        </span>
      </p>

      <button
        disabled={!donor.available || isRequested}
        onClick={() => onRequest(donor.id)}
      >
        {isRequested ? "Request Sent ✅" : "Request Help"}
      </button>
    </div>
  );
}