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
            <div key={day} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
              <div style={{ minWidth: '90px', fontWeight: 'bold', fontSize: '0.875rem' }}>{day}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '0.75rem', flex: 1 }}>
                {groupedForecast[day].map((item) => (
                  <Tile key={item.dt} style={{ padding: '0.75rem', minWidth: 0 }}>
                    <div style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                      {new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{Math.round(item.main.temp)}°F</div>
                    <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', overflowWrap: 'break-word', lineHeight: '1.2', whiteSpace: 'normal' }}>{item.weather[0].description}</div>
                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt={item.weather[0].description}
                      style={{ width: '40px', height: '40px', marginTop: '0.25rem' }}
                    />
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
