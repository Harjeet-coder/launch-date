import "./glitchText.css";

export default function GlitchText({ text }) {
  return (
    <div className="glitch-wrapper">
      <h1 className="glitch" data-text={text}>
        {text}
      </h1>
    </div>
  );
}
