import { useState } from 'react'
import './SelectDrop.css'

function SelectDrop({ options = [], placeholder = 'Select an option', onSelect = () => {} }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  const handleSelect = (option) => {
    setSelectedOption(option)
    setIsOpen(false)
    onSelect(option)
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="select-drop-container">
      <button className="select-drop-button" onClick={handleToggle}>
        {selectedOption ? selectedOption : placeholder}
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="select-drop-menu">
          {options.length > 0 ? (
            options.map((option, index) => (
              <div
                key={index}
                className={`select-drop-item ${selectedOption === option ? 'active' : ''}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="select-drop-item disabled">No options available</div>
          )}
        </div>
      )}
    </div>
  )
}

export default SelectDrop
