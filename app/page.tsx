"use client";
import React from "react";

export default function HomeScreen() {
  const [error, setError] = React.useState("");

  return (
    <div>
      <form>
        <h1>JSON Tree Viewer</h1>
        <p>
          Simple JSON Viewer that runs completely on-client. No data exchange
        </p>
        <div>
          <label
            tabIndex={0}
            htmlFor="json-file"
            onKeyDown={function (e) {
              const $label = e.target as HTMLLabelElement;
              const labelFor = $label.getAttribute("for");
              if (e.key === "Enter" || e.key === " ") {
                document.getElementById(labelFor).click();
              }
            }}
          >
            Load JSON
          </label>

          <input
            id="json-file"
            name="json-file"
            type="file"
            onChange={function (e) {
              const currentFile = e.target.files[0];
              console.log(currentFile);
              if (currentFile.type !== "application/json") {
                setError("Invalid file. Please load a valid JSON file.");
                return;
              }
              setError("");
            }}
            aria-invalid={error ? "true" : "false"}
            aria-describedby="json-file-error"
            aria-errormessage="json-file-error"
          />
          {error && (
            <p
              id="json-file-error"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
