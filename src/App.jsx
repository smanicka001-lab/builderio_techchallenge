import { useState } from 'react'
import { Button, TextInput, Tile } from '@carbon/react'
import './App.css'

function App() {
  const [zip, setZip] = useState('90210')

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Forecast4U Weather Prototype</h1>

      <TextInput
        id="zip-code"
        labelText="ZIP Code"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
      />

      <div style={{ marginTop: '1rem' }}>
        <Button style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>Get Forecast</Button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Tile>
          <h3>Sample Forecast</h3>
          <p>72°F</p>
          <p>Partly cloudy</p>
        </Tile>
      </div>
    </main>
  )
}

export default App
