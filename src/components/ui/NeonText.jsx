export default function NeonText({ text, color = "green" }) {
  return <span className={`neon-${color}`}>{text}</span>;
}
