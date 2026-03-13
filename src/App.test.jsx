import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />)
    expect(screen.getByText('Forecast4U Weather Prototype')).toBeInTheDocument()
  })

  it('renders the ZIP code input', () => {
    render(<App />)
    expect(screen.getByLabelText('ZIP Code')).toBeInTheDocument()
  })

  it('renders the Get Forecast button', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: 'Get Forecast' })).toBeInTheDocument()
  })

  it('has default ZIP code value of 90210', () => {
    render(<App />)
    const zipInput = screen.getByLabelText('ZIP Code')
    expect(zipInput).toHaveValue('90210')
  })

  it('renders dark mode toggle button', () => {
    render(<App />)
    expect(screen.getByLabelText(/switch to dark mode/i)).toBeInTheDocument()
  })
})
