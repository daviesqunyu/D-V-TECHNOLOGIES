import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MobileMenuContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: ${props => props.theme.spacing.xl};
  max-width: 90vw;
  width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 212, 255, 0.2);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.lg};
    width: 95vw;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  background: rgba(0, 212, 255, 0.1);
  color: ${props => props.theme.colors.primary};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const MenuTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  
  i {
    font-size: 1.8rem;
  }
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const MenuItem = styled(motion.div)`
  background: linear-gradient(135deg, ${props => props.theme.colors.light} 0%, #e0f7fa 100%);
  border-radius: 15px;
  padding: ${props => props.theme.spacing.md};
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.15);
    transform: translateY(-2px);
  }
  
  &.active {
    background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
    color: white;
    
    i {
      color: white;
    }
  }
`;

const MenuIcon = styled.i`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
  display: block;
`;

const MenuLabel = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: ${props => props.theme.colors.textDark};
  
  .active & {
    color: white;
  }
`;

const MobileMenu = ({ isOpen, onClose, onSectionChange, activeSection }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: 'fas fa-home' },
    { id: 'features', label: 'Features', icon: 'fas fa-star' },
    { id: 'services', label: 'Services', icon: 'fas fa-cogs' },
    { id: 'ai-services', label: 'AI Solutions', icon: 'fas fa-robot' },
    { id: 'iot-services', label: 'IoT & Internet', icon: 'fas fa-wifi' },
    { id: 'software-dev', label: 'Software Dev', icon: 'fas fa-laptop-code' },
    { id: 'hardware-solutions', label: 'Hardware', icon: 'fas fa-server' },
    { id: 'contact', label: 'Contact', icon: 'fas fa-envelope' }
  ];

  const handleMenuClick = (sectionId) => {
    onSectionChange(sectionId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <MobileMenuOverlay
          className="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <MobileMenuContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-times"></i>
            </CloseButton>
            
            <MenuTitle>
              <i className="fas fa-microchip"></i>
              D&V Technologies
            </MenuTitle>
            
            <MenuGrid>
              {menuItems.map((item) => (
                <MenuItem
                  key={item.id}
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={() => handleMenuClick(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MenuIcon className={item.icon}></MenuIcon>
                  <MenuLabel>{item.label}</MenuLabel>
                </MenuItem>
              ))}
            </MenuGrid>
          </MobileMenuContent>
        </MobileMenuOverlay>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
