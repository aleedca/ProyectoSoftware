import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ options, onSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (inputValue === '') {
      setFilteredOptions(options);
    } else {
      setFilteredOptions(
        options.filter(option =>
          option.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }
  }, [inputValue, options]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setIsDropdownOpen(false);
    onSelect(option);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onClick={() => setIsDropdownOpen(true)}
        placeholder="Buscar profesor..."
      />
      {isDropdownOpen && (
        <ul className="dropdown-menu">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                className="dropdown-item"
              >
                {option}
              </li>
            ))
          ) : (
            <li className="dropdown-item">No hay resultados</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
