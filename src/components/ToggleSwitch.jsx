import { useState, useRef } from 'react'
import './ToggleSwitch.css'

function ToggleSwitch({
  options = [],
  defaultValue = null,
  onChange = () => {},
  disabled = false,
  name = 'toggle-switch'
}) {
  const [selectedValue, setSelectedValue] = useState(defaultValue)
  const containerRef = useRef(null)

  const handleChange = (value) => {
    if (!disabled) {
      setSelectedValue(value)
      onChange(value)
    }
  }

  const handleKeyDown = (e, value) => {
    if (disabled) return

    switch (e.key) {
      case 'Enter':
      case ' ': {
        e.preventDefault()
        handleChange(value)
        break
      }
      case 'ArrowLeft':
      case 'ArrowDown': {
        e.preventDefault()
        const currentIndex = options.findIndex(opt => opt.value === selectedValue)
        if (currentIndex > 0) {
          handleChange(options[currentIndex - 1].value)
        }
        break
      }
      case 'ArrowRight':
      case 'ArrowUp': {
        e.preventDefault()
        const currentIdx = options.findIndex(opt => opt.value === selectedValue)
        if (currentIdx < options.length - 1) {
          handleChange(options[currentIdx + 1].value)
        }
        break
      }
      default:
        break
    }
  }

  return (
    <div
      className={`toggle-switch-container ${disabled ? 'disabled' : ''}`}
      ref={containerRef}
      role="group"
      aria-labelledby={`${name}-label`}
    >
      <div className="toggle-switch-group">
        {options.map((option) => (
          <div key={option.value} className="toggle-switch-item">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => handleChange(option.value)}
              onKeyDown={(e) => handleKeyDown(e, option.value)}
              disabled={disabled}
              className="toggle-switch-input"
              aria-label={option.label}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className={`toggle-switch-label ${
                selectedValue === option.value ? 'active' : ''
              } ${disabled ? 'disabled' : ''}`}
              onKeyDown={(e) => handleKeyDown(e, option.value)}
              role="button"
              tabIndex={disabled ? -1 : 0}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ToggleSwitch
