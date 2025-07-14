import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FeaturesSection = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  background: ${props => props.theme.colors.light};
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  background: linear-gradient(45deg, ${props => props.theme.colors.dark}, ${props => props.theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing.xl};
`;

const FeatureCard = styled(motion.div)`
  background: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.4s ease;
  border: 2px solid transparent;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(0, 212, 255, 0.18);
    border-color: ${props => props.theme.colors.primary};
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.dark};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
  font-size: 1.1rem;
`;

const Features = () => {
  const features = [
    {
      icon: 'fas fa-brain',
      title: 'AI Analytics',
      description: 'Unlock actionable insights with real-time data processing, predictive analytics, and custom machine learning models for your business.'
    },
    {
      icon: 'fas fa-satellite-dish',
      title: 'IoT & Internet Solutions',
      description: 'Seamless WiFi, internet setup, smart device integration, and remote monitoring for Kenyan homes and businesses.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Cyber Security',
      description: 'Protect your digital assets with advanced security, threat detection, and secure networking solutions.'
    },
    {
      icon: 'fas fa-atom',
      title: 'Edge Computing',
      description: 'Ultra-fast, reliable performance by processing data closer to the source for real-time applications.'
    },
    {
      icon: 'fas fa-tools',
      title: 'Mobile & Laptop Repair',
      description: 'Expert repair and maintenance for smartphones, laptops, and other hardware devices.'
    },
    {
      icon: 'fas fa-briefcase',
      title: 'Business Management',
      description: 'Custom software and digital tools to streamline operations, sales, and customer management for Kenyan enterprises.'
    }
  ];

  return (
    <FeaturesSection id="features">
      <Container>
        <SectionTitle>Our Features & Technologies</SectionTitle>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <FeatureIcon>
                <i className={feature.icon}></i>
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Container>
    </FeaturesSection>
  );
};

export default Features;
