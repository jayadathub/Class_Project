import { useEffect, useState } from "react";
import DonorCard from "./components/DonorCard";
import Filter from "./components/Filter";
import Loader from "./components/Loader";
import "./App.css"; // ✅ IMPORTANT

export default function App() {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("All");
  const [loading, setLoading] = useState(true);
  const [requested, setRequested] = useState({});

  // Fetch data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const bloodGroups = ["A+", "B+", "O-", "AB+"];

        const mapped = data.map((user) => ({
          id: user.id,
          name: user.name,
          city: user.address.city,
          bloodGroup:
            bloodGroups[Math.floor(Math.random() * bloodGroups.length)],
          available: Math.random() > 0.3,
        }));

        setDonors(mapped);
        setFilteredDonors(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter logic
  useEffect(() => {
    if (bloodGroup === "All") {
      setFilteredDonors(donors);
    } else {
      setFilteredDonors(
        donors.filter((d) => d.bloodGroup === bloodGroup)
      );
    }
  }, [bloodGroup, donors]);

  // Request button logic
  const handleRequest = (id) => {
    setRequested((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  return (
    <div className="container"> {/* ✅ IMPORTANT */}
      <h1>🩸 Blood Donor Finder</h1>

      <Filter bloodGroup={bloodGroup} setBloodGroup={setBloodGroup} />

      <p className="count">
        Total Donors: {filteredDonors.length}
      </p>

      {loading ? (
        <Loader />
      ) : filteredDonors.length === 0 ? (
        <p>No donors found</p>
      ) : (
        <div className="grid"> {/* ✅ IMPORTANT */}
          {filteredDonors.map((donor) => (
            <DonorCard
              key={donor.id}
              donor={donor}
              onRequest={handleRequest}
              isRequested={requested[donor.id]}
            />
          ))}
        </div>
      )}
    </div>
  );
}