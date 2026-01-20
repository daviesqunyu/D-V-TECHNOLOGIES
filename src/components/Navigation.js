import React, { useState, useEffect } from 'react';

const Navigation = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [alignmentClass, setAlignmentClass] = useState('');

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const checkAlignment = (dropdownRef) => {
        const dropdownPanel = dropdownRef.current;
        if (dropdownPanel) {
            const panelRect = dropdownPanel.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            if (panelRect.right > viewportWidth) {
                setAlignmentClass('align-right');
            } else {
                setAlignmentClass('');
            }
        }
    };

    useEffect(() => {
        const dropdownRef = { current: document.querySelector('.dropdown-panel') };
        checkAlignment(dropdownRef);
    }, [dropdownOpen]);

    return (
        <nav>
            <ul>
                <li>
                    <button onClick={toggleDropdown} aria-haspopup="true" aria-expanded={dropdownOpen}>
                        Menu
                    </button>
                    {dropdownOpen && (
                        <div className={`dropdown-panel ${alignmentClass}`}>
                            <a className="dropdown-link" data-nav-id="1" href="#">Item 1</a>
                            <a className="dropdown-link" data-nav-id="2" href="#">Item 2</a>
                            <a className="dropdown-link" data-nav-id="3" href="#">Item 3</a>
                        </div>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;