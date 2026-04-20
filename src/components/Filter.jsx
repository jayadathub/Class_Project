export default function Filter({ bloodGroup, setBloodGroup }) {
  return (
    <div className="filter">
      <label>Filter by Blood Group: </label>

      <select
        value={bloodGroup}
        onChange={(e) => setBloodGroup(e.target.value)}
      >
        <option value="All">All</option>
        <option value="A+">A+</option>
        <option value="B+">B+</option>
        <option value="O-">O-</option>
        <option value="AB+">AB+</option>
      </select>
    </div>
  );
}