import { useState } from 'react'

export function Home() {
  const [files, setFiles] = useState('')

  function handleReadJSON(e: any) {
    const fileReader = new FileReader()
    fileReader.readAsText(e.target.files[0], 'UTF-8')
    fileReader.onload = (e) => {
      console.log('e.target.result', e.target.result)
      setFiles(e.target.result)
    }
  }

  return (
    <div>
      <h1>JSON Tree Viewer</h1>
      <p>Simple JSON Viewer that runs completely on-client. No data exchange</p>
      <input
        type="file"
        id="file"
        name="file"
        accept="application/json"
        onChange={handleReadJSON}
      />
      {'uploaded file content -- ' + files}
    </div>
  )
}
