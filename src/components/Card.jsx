export default function Card({ title, description }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
