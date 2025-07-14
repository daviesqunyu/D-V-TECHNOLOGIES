import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const NavigationContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(10, 20, 40, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  transition: all 0.3s ease;
  
  &.scrolled {
    background: rgba(10, 20, 40, 0.98);
    box-shadow: 0 4px 20px rgba(0, 212, 255, 0.1);
  }
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${props => props.theme.spacing.md};
  height: 70px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.spacing.sm};
    height: 60px;
  }
`;

const Logo = styled(motion.a)`
  color: ${props => props.theme.colors.primary};
  font-size: 1.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  cursor: pointer;
  
  i {
    animation: spin 4s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.3rem;
  }
`;

const DesktopMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: ${props => props.theme.spacing.xs};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(motion.a)`
  color: white;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  cursor: pointer;
  
  &:hover,
  &.active {
    color: ${props => props.theme.colors.primary};
    background: rgba(0, 212, 255, 0.08);
  }
  
  i {
    font-size: 1rem;
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 110%;
  left: 0;
  min-width: 280px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 212, 255, 0.15);
  padding: ${props => props.theme.spacing.md};
  z-index: 1001;
  
  h4 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.sm};
    font-size: 1.1rem;
  }
`;

const DropdownLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const DropdownLink = styled(motion.a)`
  color: ${props => props.theme.colors.text};
  padding: ${props => props.theme.spacing.sm};
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  cursor: pointer;
  
  &:hover {
    background: rgba(0, 212, 255, 0.08);
    color: ${props => props.theme.colors.primary};
  }
  
  i {
    font-size: 1rem;
    min-width: 20px;
  }
`;

const MobileControls = styled.div`
  display: none;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const MobileButton = styled(motion.button)`
  background: rgba(0, 212, 255, 0.1);
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }
`;

const Navigation = ({ 
  activeSection, 
  onSectionChange, 
  isMenuOpen, 
  setIsMenuOpen, 
  setIsDrawerOpen,
  isMobile 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home', icon: 'fas fa-home' },
    { 
      id: 'solutions', 
      label: 'Solutions', 
      icon: 'fas fa-cogs',
      dropdown: [
        { id: 'ai-services', label: 'AI Solutions', icon: 'fas fa-robot' },
        { id: 'iot-services', label: 'IoT Integration', icon: 'fas fa-wifi' },
        { id: 'software-dev', label: 'Software Development', icon: 'fas fa-laptop-code' },
        { id: 'hardware-solutions', label: 'Hardware Solutions', icon: 'fas fa-server' }
      ]
    },
    { id: 'features', label: 'Features', icon: 'fas fa-star' },
    { id: 'contact', label: 'Contact', icon: 'fas fa-envelope' }
  ];

  const handleDropdownToggle = (itemId) => {
    setDropdownOpen(dropdownOpen === itemId ? null : itemId);
  };

  const handleMenuClick = (sectionId) => {
    onSectionChange(sectionId);
    setDropdownOpen(null);
  };

  return (
    <NavigationContainer
      className={scrolled ? 'scrolled' : ''}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavContent>
        <Logo
          onClick={() => handleMenuClick('home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-microchip"></i>
          D&V Technologies
        </Logo>

        <DesktopMenu>
          {menuItems.map((item) => (
            <NavItem key={item.id}>
              <NavLink
                className={activeSection === item.id ? 'active' : ''}
                onClick={() => item.dropdown ? handleDropdownToggle(item.id) : handleMenuClick(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={item.icon}></i>
                {item.label}
                {item.dropdown && <i className="fas fa-angle-down"></i>}
              </NavLink>
              
              <AnimatePresence>
                {item.dropdown && dropdownOpen === item.id && (
                  <DropdownMenu
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4>Our Solutions</h4>
                    <DropdownLinks>
                      {item.dropdown.map((dropdownItem) => (
                        <DropdownLink
                          key={dropdownItem.id}
                          onClick={() => handleMenuClick(dropdownItem.id)}
                          whileHover={{ x: 5 }}
                        >
                          <i className={dropdownItem.icon}></i>
                          {dropdownItem.label}
                        </DropdownLink>
                      ))}
                    </DropdownLinks>
                  </DropdownMenu>
                )}
              </AnimatePresence>
            </NavItem>
          ))}
        </DesktopMenu>

        <MobileControls>
          <MobileButton
            onClick={() => setIsDrawerOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Open menu drawer"
          >
            <i className="fas fa-bars"></i>
          </MobileButton>
          
          <MobileButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle mobile menu"
          >
            <i className={isMenuOpen ? "fas fa-times" : "fas fa-ellipsis-v"}></i>
          </MobileButton>
        </MobileControls>
      </NavContent>
    </NavigationContainer>
  );
};

export default Navigation;
