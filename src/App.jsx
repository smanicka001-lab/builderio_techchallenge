import { useState } from 'react'
import { Button, TextInput, Tile } from '@carbon/react'
import './App.css'

function App() {
  const [zip, setZip] = useState('90210')
  const [forecast, setForecast] = useState([])
  const [error, setError] = useState(null)

  async function getWeather() {
    setError(null)
    try {
      const apiKey = import.meta.env.VITE_NEW_API
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&appid=${apiKey}&units=imperial`
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `API Error: ${response.status}`)
      }

      setForecast(data.list || [])
    } catch (err) {
      setError(err.message)
      setForecast([])
    }
  }

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
        <Button onClick={getWeather} style={{ paddingRight: '16.875px' }}>Get Forecast</Button>
      </div>

      {error && (
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#fff1f1', border: '1px solid #da1e28', borderRadius: '4px' }}>
          <strong style={{ color: '#da1e28' }}>Error:</strong> {error}
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        {forecast.length > 0 ? (
          forecast.slice(0, 40).map((item) => (
            <Tile key={item.dt} style={{ marginBottom: '1rem' }}>
              <h3>{new Date(item.dt * 1000).toLocaleString()}</h3>
              <p>{item.main.temp}°F</p>
              <p>{item.weather[0].description}</p>
            </Tile>
          ))
        ) : (
          <Tile>
            <h3>Sample Forecast</h3>
            <p>No forecast loaded yet</p>
          </Tile>
        )}
      </div>
    </main>
  )
}

export default App
