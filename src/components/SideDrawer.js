import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const DrawerOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2100;
  backdrop-filter: blur(5px);
`;

const DrawerContent = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  background: white;
  box-shadow: 2px 0 20px rgba(0, 212, 255, 0.15);
  z-index: 2101;
  padding: ${props => props.theme.spacing.lg};
  overflow-y: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 280px;
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  padding-bottom: ${props => props.theme.spacing.sm};
  border-bottom: 2px solid ${props => props.theme.colors.light};
`;

const DrawerTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  
  i {
    font-size: 1.8rem;
    animation: spin 4s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const CloseButton = styled(motion.button)`
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

const DrawerNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const DrawerSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SectionTitle = styled.h3`
  color: ${props => props.theme.colors.textDark};
  font-size: 1.2rem;
  margin-bottom: ${props => props.theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  
  i {
    color: ${props => props.theme.colors.primary};
  }
`;

const DrawerLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textLight};
  text-decoration: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 212, 255, 0.08);
    color: ${props => props.theme.colors.primary};
  }
  
  i {
    font-size: 1.1rem;
    min-width: 20px;
    color: ${props => props.theme.colors.primary};
  }
`;

const CompanyInfo = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
  padding-top: ${props => props.theme.spacing.sm};
  border-top: 1px solid ${props => props.theme.colors.light};
  
  h4 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.sm};
  }
  
  p {
    color: ${props => props.theme.colors.textLight};
    font-size: 0.9rem;
    margin-bottom: ${props => props.theme.spacing.xs};
  }
`;

const SideDrawer = ({ isOpen, onClose, onSectionChange }) => {
  const mainSections = [
    { id: 'home', label: 'Home', icon: 'fas fa-home' },
    { id: 'features', label: 'Features', icon: 'fas fa-star' },
    { id: 'services', label: 'Services', icon: 'fas fa-cogs' },
    { id: 'contact', label: 'Contact', icon: 'fas fa-envelope' }
  ];

  const solutions = [
    { id: 'ai-services', label: 'AI Solutions', icon: 'fas fa-robot' },
    { id: 'iot-services', label: 'IoT Integration', icon: 'fas fa-wifi' },
    { id: 'software-dev', label: 'Software Development', icon: 'fas fa-laptop-code' },
    { id: 'hardware-solutions', label: 'Hardware Solutions', icon: 'fas fa-server' }
  ];

  const handleLinkClick = (sectionId) => {
    onSectionChange(sectionId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <DrawerOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <DrawerContent
            className="side-drawer"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
          >
            <DrawerHeader>
              <DrawerTitle>
                <i className="fas fa-microchip"></i>
                D&V Technologies
              </DrawerTitle>
              <CloseButton
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fas fa-times"></i>
              </CloseButton>
            </DrawerHeader>

            <DrawerNav>
              <DrawerSection>
                <SectionTitle>
                  <i className="fas fa-bars"></i>
                  Main Menu
                </SectionTitle>
                {mainSections.map((section) => (
                  <DrawerLink
                    key={section.id}
                    onClick={() => handleLinkClick(section.id)}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className={section.icon}></i>
                    {section.label}
                  </DrawerLink>
                ))}
              </DrawerSection>

              <DrawerSection>
                <SectionTitle>
                  <i className="fas fa-cogs"></i>
                  Our Solutions
                </SectionTitle>
                {solutions.map((solution) => (
                  <DrawerLink
                    key={solution.id}
                    onClick={() => handleLinkClick(solution.id)}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className={solution.icon}></i>
                    {solution.label}
                  </DrawerLink>
                ))}
              </DrawerSection>
            </DrawerNav>

            <CompanyInfo>
              <h4>About Us</h4>
              <p>D&V Technologies is a proudly Kenyan provider of AI, IoT, and digital solutions.</p>
              <p>📍 Lower Kabete, Nairobi</p>
              <p>📞 0759 075 816</p>
              <p>✉️ info@dvtechnologies.com</p>
            </CompanyInfo>
          </DrawerContent>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideDrawer;
