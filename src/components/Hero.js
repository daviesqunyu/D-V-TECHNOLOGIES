import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.dark} 0%, ${(props) => props.theme.colors.primary} 100%);
  position: relative;
  overflow: hidden;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
  color: white;
  
  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, ${(props) => props.theme.colors.primary}, ${(props) => props.theme.colors.accent});
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientShift 4s ease infinite;
    
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: 2.4rem;
    }
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: ${(props) => props.theme.colors.textLight};

    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: 1rem;
    }
  }
`;

const CtaButtons = styled(motion.div)`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;

  a {
    padding: 1rem 2rem;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: bold;
    transition: all 0.4s;
    cursor: pointer;
    color: ${(props) => props.theme.colors.dark};
    background: ${(props) => props.theme.colors.primary};

    &:hover {
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 15px 40px rgba(0, 212, 255, 0.4);
    }
  }
`;

const Hero = ({ onSectionChange }) => {
  return (
    <HeroSection id="home">
      <HeroOverlay />
      <HeroContent>
        <h1>Nairobi's Next-Gen Tech Company</h1>
        <p>IT, Hardware & Software Solutions for Modern Businesses</p>
        <CtaButtons>
          <motion.a
            href="#iot-services"
            whileHover={{ scale: 1.05 }}
            onClick={() => onSectionChange('iot-services')}
          >
            INTERNET & Connectivity
          </motion.a>
          <motion.a
            href="#ai-services"
            whileHover={{ scale: 1.05 }}
            onClick={() => onSectionChange('ai-services')}
          >
            AI & IoT
          </motion.a>
        </CtaButtons>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;

