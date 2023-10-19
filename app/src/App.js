import { useState } from 'react';
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import './App.css';

function App() {
  const [fileName, setFileName] = useState("")
  const [hasError, setHasError] = useState(false)
  const [jsonData, setJsonData] = useState([]);

  async function handleFileRead(file) {
    try {
      const stream = file.stream();
    const reader = stream.getReader();
    const decoder = new TextDecoder();

    let chunk = await reader.read();

    while (!chunk.done) {
      const data = decoder.decode(chunk.value, { stream: true });
      const parsedData = data
      setJsonData(prevData => [...prevData, parsedData]);
      chunk = await reader.read();
    }

    if (chunk.done) {
      const finalData = decoder.decode();
      const parsedFinalData = JSON.parse(finalData)
      setJsonData(prevData => [...prevData, parsedFinalData]);
    }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      setHasError(true);
    }
  };

    function handleFileUpload(event) {
      const file = event.target.files[0]
      setFileName(file.name)
      if (file) {
        handleFileRead(file);
      }
    };

  return (
    <div className="App">
      {!jsonData.length ?
      <header>
        <h1>
          JSON Tree Viewer
        </h1>
        <p>Simple JSON Viewer that runs completely on-client. No data exchange </p>
        <input 
          type="file"
          accept=".json, application/json"
          className="fileInput"
          onChange={handleFileUpload}
        />
        {hasError && <p className='errorWarning'>Invalid file. Please load a valid JSON file.</p>}
      </header>
      :
      <div className='contentBox'>
        <h3 onClick={() => {
          setHasError(false)
          setJsonData([])
        }}>{fileName}</h3>
        <div className='dataContainer'>
        <JsonView data={jsonData} shouldExpandNode={allExpanded} style={{ ...defaultStyles, container: 'dataBox'}} />
        </div>
      </div>
      }
    </div>
  );
}

export default App;
