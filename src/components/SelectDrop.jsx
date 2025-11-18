import { useState, useRef, useEffect } from 'react'
import './SelectDrop.css'

function SelectDrop({ options = [], placeholder = 'Select an option', onSelect = () => {} }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const containerRef = useRef(null)
  const buttonRef = useRef(null)
  const menuRef = useRef(null)

  const handleSelect = (option) => {
    setSelectedOption(option)
    setIsOpen(false)
    setHighlightedIndex(-1)
    onSelect(option)
    buttonRef.current?.focus()
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setHighlightedIndex(-1)
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      e.preventDefault()
      setIsOpen(true)
      setHighlightedIndex(0)
      return
    }

    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev < options.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0) {
          handleSelect(options[highlightedIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setHighlightedIndex(-1)
        buttonRef.current?.focus()
        break
      case 'Tab':
        setIsOpen(false)
        setHighlightedIndex(-1)
        break
      default:
        break
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
        setHighlightedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && menuRef.current) {
      const items = menuRef.current.querySelectorAll('.select-drop-item:not(.disabled)')
      if (items[highlightedIndex]) {
        items[highlightedIndex].scrollIntoView({ block: 'nearest' })
      }
    }
  }, [highlightedIndex])

  return (
    <div className="select-drop-container" ref={containerRef}>
      <button
        ref={buttonRef}
        className="select-drop-button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Select dropdown, currently showing ${selectedOption || placeholder}`}
        role="combobox"
      >
        {selectedOption ? selectedOption : placeholder}
        <span className={`arrow ${isOpen ? 'open' : ''}`} aria-hidden="true">
          ▼
        </span>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="select-drop-menu"
          role="listbox"
          aria-label="Available options"
        >
          {options.length > 0 ? (
            options.map((option, index) => (
              <div
                key={index}
                className={`select-drop-item ${
                  selectedOption === option ? 'active' : ''
                } ${highlightedIndex === index ? 'highlighted' : ''}`}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                role="option"
                aria-selected={selectedOption === option}
                tabIndex={-1}
              >
                {option}
              </div>
            ))
          ) : (
            <div
              className="select-drop-item disabled"
              role="option"
              aria-disabled="true"
              tabIndex={-1}
            >
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SelectDrop
