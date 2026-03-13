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

  // Group forecast by day
  const groupedForecast = forecast.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString()
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(item)
    return acc
  }, {})

  const days = Object.keys(groupedForecast).slice(0, 5)

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
          days.map((day) => (
            <div key={day} style={{ marginBottom: '2rem' }}>
              <h2 style={{ marginBottom: '1rem' }}>{day}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
                {groupedForecast[day].map((item) => (
                  <Tile key={item.dt} style={{ padding: '1rem' }}>
                    <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      {new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{Math.round(item.main.temp)}°F</div>
                    <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>{item.weather[0].description}</div>
                  </Tile>
                ))}
              </div>
            </div>
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
