export default function HomeScreen() {
  return (
    <div>
      <h1>JSON Tree Viewer</h1>
      <p>
        Simple JSON Viewer that runs completely on-client. No data exchange
      </p>
      <button>
        Load JSON
      </button>
      <p>
        Invalid file. Please load a valid JSON file.
      </p>
    </div>
  );
}