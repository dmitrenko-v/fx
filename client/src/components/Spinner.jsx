export default function Spinner({ size = "5em" }) {
  return (
    <div className="spinner">
      Loading...
      <div className="loader" style={{ height: size, width: size }}></div>
    </div>
  );
}
