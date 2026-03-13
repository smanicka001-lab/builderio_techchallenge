import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// Mock fetch globally
global.fetch = vi.fn()

describe('App Component', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    fetch.mockReset()
  })

  describe('Initial Render', () => {
    it('renders the main heading', () => {
      render(<App />)
      expect(screen.getByText('Forecast4U Weather POV Prototype')).toBeInTheDocument()
    })

    it('renders the instruction heading', () => {
      render(<App />)
      expect(screen.getByText('Enter Zip Code and click on Get Forecast')).toBeInTheDocument()
    })

    it('renders the ZIP code input with label', () => {
      render(<App />)
      expect(screen.getByLabelText('ZIP Code')).toBeInTheDocument()
    })

    it('has default ZIP code value of 90210', () => {
      render(<App />)
      const zipInput = screen.getByLabelText('ZIP Code')
      expect(zipInput).toHaveValue('90210')
    })

    it('renders the Get Forecast button', () => {
      render(<App />)
      expect(screen.getByRole('button', { name: 'Get Forecast' })).toBeInTheDocument()
    })

    it('renders dark mode toggle button in light mode initially', () => {
      render(<App />)
      expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument()
    })

    it('shows clear button when ZIP code has value', () => {
      render(<App />)
      expect(screen.getByLabelText('Clear input')).toBeInTheDocument()
    })
  })

  describe('ZIP Code Input Interaction', () => {
    it('allows user to type in ZIP code', async () => {
      const user = userEvent.setup()
      render(<App />)
      const zipInput = screen.getByLabelText('ZIP Code')

      await user.clear(zipInput)
      await user.type(zipInput, '10001')

      expect(zipInput).toHaveValue('10001')
    })

    it('shows clear button when ZIP has value', async () => {
      const user = userEvent.setup()
      render(<App />)
      const zipInput = screen.getByLabelText('ZIP Code')

      await user.clear(zipInput)
      await user.type(zipInput, '12345')

      expect(screen.getByLabelText('Clear input')).toBeInTheDocument()
    })

    it('clears ZIP code and forecast when clear button is clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      const clearButton = screen.getByLabelText('Clear input')
      await user.click(clearButton)

      const zipInput = screen.getByLabelText('ZIP Code')
      expect(zipInput).toHaveValue('')
    })
  })

  describe('Dark Mode Toggle', () => {
    it('toggles to dark mode when button is clicked', async () => {
      const user = userEvent.setup()
      render(<App />)

      const toggleButton = screen.getByLabelText('Switch to dark mode')
      await user.click(toggleButton)

      expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument()
    })

    it('toggles back to light mode', async () => {
      const user = userEvent.setup()
      render(<App />)

      const toggleButton = screen.getByLabelText('Switch to dark mode')
      await user.click(toggleButton)

      const lightModeButton = screen.getByLabelText('Switch to light mode')
      await user.click(lightModeButton)

      expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument()
    })
  })

  describe('Weather Forecast Fetching', () => {
    it('fetches and displays weather forecast on button click', async () => {
      const user = userEvent.setup()
      const mockForecastData = {
        list: [
          {
            dt: 1710374400,
            main: { temp: 65 },
            weather: [{ description: 'clear sky', icon: '01d' }]
          }
        ]
      }

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockForecastData
      })

      render(<App />)

      const button = screen.getByRole('button', { name: 'Get Forecast' })
      await user.click(button)

      await waitFor(() => {
        expect(screen.getByText('clear sky')).toBeInTheDocument()
      })
    })

    it('displays error message when API call fails', async () => {
      const user = userEvent.setup()

      fetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ message: 'Invalid API key' })
      })

      render(<App />)

      const button = screen.getByRole('button', { name: 'Get Forecast' })
      await user.click(button)

      await waitFor(() => {
        expect(screen.getByText(/Invalid API key/i)).toBeInTheDocument()
      })
    })

    it('handles network errors gracefully', async () => {
      const user = userEvent.setup()

      fetch.mockRejectedValueOnce(new Error('Network error'))

      render(<App />)

      const button = screen.getByRole('button', { name: 'Get Forecast' })
      await user.click(button)

      await waitFor(() => {
        expect(screen.getByText(/Network error/i)).toBeInTheDocument()
      })
    })

    it('uses correct API endpoint with ZIP code', async () => {
      const user = userEvent.setup()

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ list: [] })
      })

      render(<App />)

      const zipInput = screen.getByLabelText('ZIP Code')
      await user.clear(zipInput)
      await user.type(zipInput, '10001')

      const button = screen.getByRole('button', { name: 'Get Forecast' })
      await user.click(button)

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining('zip=10001,us')
        )
      })
    })
  })

  describe('Forecast Display', () => {
    it('groups forecast by day', async () => {
      const user = userEvent.setup()
      const mockForecastData = {
        list: [
          {
            dt: 1710374400, // 3/14/2024
            main: { temp: 65 },
            weather: [{ description: 'clear sky', icon: '01d' }]
          },
          {
            dt: 1710385200, // Same day, different time
            main: { temp: 68 },
            weather: [{ description: 'sunny', icon: '01d' }]
          }
        ]
      }

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockForecastData
      })

      render(<App />)

      const button = screen.getByRole('button', { name: 'Get Forecast' })
      await user.click(button)

      await waitFor(() => {
        expect(screen.getByText('clear sky')).toBeInTheDocument()
        expect(screen.getByText('sunny')).toBeInTheDocument()
      })
    })

    it('displays weather icons', async () => {
      const user = userEvent.setup()
      const mockForecastData = {
        list: [
          {
            dt: 1710374400,
            main: { temp: 65 },
            weather: [{ description: 'clear sky', icon: '01d' }]
          }
        ]
      }

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockForecastData
      })

      render(<App />)

      const button = screen.getByRole('button', { name: 'Get Forecast' })
      await user.click(button)

      await waitFor(() => {
        const weatherIcon = screen.getByAltText('clear sky')
        expect(weatherIcon).toBeInTheDocument()
        expect(weatherIcon).toHaveAttribute('src', expect.stringContaining('01d.png'))
      })
    })
  })
})
