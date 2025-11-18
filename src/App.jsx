import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SelectDrop from './components/SelectDrop'
import ToggleSwitch from './components/ToggleSwitch'

function App() {
  const [count, setCount] = useState(0)
  const [selectedValue, setSelectedValue] = useState(null)
  const [toggleValue, setToggleValue] = useState('light')

  const fruitOptions = ['Apple', 'Banana', 'Orange', 'Mango', 'Strawberry']

  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'auto', label: 'Auto' }
  ]

  const handleSelectChange = (value) => {
    setSelectedValue(value)
    console.log('Selected:', value)
  }

  const handleToggleChange = (value) => {
    setToggleValue(value)
    console.log('Toggle switched to:', value)
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div className="card">
        <h2>SelectDrop Component</h2>
        <SelectDrop
          options={fruitOptions}
          placeholder="Choose a fruit..."
          onSelect={handleSelectChange}
        />
        {selectedValue && <p>You selected: <strong>{selectedValue}</strong></p>}
      </div>
      <div className="card">
        <h2>ToggleSwitch Component</h2>
        <label id="theme-label" style={{ marginBottom: '10px', display: 'block' }}>
          Select Theme:
        </label>
        <ToggleSwitch
          name="theme"
          options={themeOptions}
          defaultValue="light"
          onChange={handleToggleChange}
        />
        <p style={{ marginTop: '10px' }}>Current theme: <strong>{toggleValue}</strong></p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
