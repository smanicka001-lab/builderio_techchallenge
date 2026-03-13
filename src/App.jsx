import { useState } from 'react'
import { Button, TextInput, Tile } from '@carbon/react'
import { Close, Asleep, Light } from '@carbon/icons-react'
import './App.css'

function App() {
  const [zip, setZip] = useState('90210')
  const [forecast, setForecast] = useState([])
  const [error, setError] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  function clearInput() {
    setZip('')
    setForecast([])
    setError(null)
  }

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode)
  }

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
    <main style={{
      padding: '2rem',
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f4f4f4',
      minHeight: '100vh',
      transition: 'background-color 0.3s'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: isDarkMode ? 'white' : 'inherit' }}>Forecast4U Weather Prototype</h1>
        <button
          onClick={toggleDarkMode}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            color: isDarkMode ? 'white' : 'black'
          }}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Light size={24} /> : <Asleep size={24} />}
        </button>
      </div>

      <h2 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '20px', textAlign: 'left', color: isDarkMode ? 'white' : 'inherit' }}>Enter Zip Code and click on Get Forecast</h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <label htmlFor="zip-code" style={{ fontWeight: 600, fontSize: '17.5px', color: isDarkMode ? 'white' : 'inherit' }}>ZIP Code</label>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <input
            id="zip-code"
            type="text"
            className="cds--text-input"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            style={{ width: '150px', paddingRight: '30px' }}
          />
          {zip && (
            <button
              onClick={clearInput}
              style={{
                position: 'absolute',
                right: '5px',
                top: '50%',
                transform: 'translateY(-50%)',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label="Clear input"
            >
              <Close size={16} />
            </button>
          )}
        </div>
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
              <div style={{ minWidth: '90px', fontWeight: 'bold', fontSize: '0.875rem', color: isDarkMode ? 'white' : 'inherit' }}>{day}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '0.75rem', flex: 1 }}>
                {groupedForecast[day].map((item) => (
                  <Tile key={item.dt} style={{ padding: '0.75rem', minWidth: 0, backgroundColor: 'white', border: '1px solid black' }}>
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
        ) : null}
      </div>
    </main>
  )
}

export default App
