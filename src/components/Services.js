import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ServicesSection = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  background: white;
  position: relative;
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing.xl};
`;

const ServiceCard = styled(motion.div)`
  background: linear-gradient(145deg, #ffffff, #f1f5f9);
  padding: ${props => props.theme.spacing.xl};
  border-radius: 18px;
  text-align: center;
  transition: all 0.4s ease;
  border: 1px solid rgba(0, 212, 255, 0.1);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 20px 50px rgba(0, 212, 255, 0.13);
  }
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.dark};
`;

const ServiceDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  line-height: 1.6;
  font-size: 1.1rem;
`;

const Services = () => {
  const services = [
    // AI Services
    {
      icon: 'fas fa-robot',
      title: 'Machine Learning',
      description: 'Custom ML models for predictive analytics and automation for Kenyan businesses.',
      category: 'ai'
    },
    {
      icon: 'fas fa-brain',
      title: 'Neural Networks',
      description: 'Deep learning for image, speech, and data recognition.',
      category: 'ai'
    },
    {
      icon: 'fas fa-eye',
      title: 'Computer Vision',
      description: 'AI-powered image/video analysis for quality and security in Kenyan industries.',
      category: 'ai'
    },
    // IoT Services
    {
      icon: 'fas fa-wifi',
      title: 'Smart Devices',
      description: 'Connect and automate sensors, appliances, and more for Kenyan homes and offices.',
      category: 'iot'
    },
    {
      icon: 'fas fa-home',
      title: 'Smart Home/Office',
      description: 'Lighting, climate, and security automation for comfort and safety in Nairobi.',
      category: 'iot'
    },
    {
      icon: 'fas fa-industry',
      title: 'Industrial IoT',
      description: 'Monitor and optimize manufacturing and logistics in real time for Kenyan factories.',
      category: 'iot'
    },
    // Software Development
    {
      icon: 'fas fa-laptop-code',
      title: 'Web Applications',
      description: 'Modern, responsive web apps for any Kenyan business need.',
      category: 'software'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Mobile Apps',
      description: 'iOS & Android apps for seamless mobile experiences in Kenya.',
      category: 'software'
    },
    {
      icon: 'fas fa-database',
      title: 'Enterprise Systems',
      description: 'Scalable solutions for complex business operations in Nairobi and beyond.',
      category: 'software'
    },
    // Hardware Solutions
    {
      icon: 'fas fa-server',
      title: 'Server Infrastructure',
      description: 'Reliable, high-performance servers for your Kenyan business.',
      category: 'hardware'
    },
    {
      icon: 'fas fa-network-wired',
      title: 'Network Solutions',
      description: 'Secure, optimized networking for any scale in Kenya.',
      category: 'hardware'
    },
    {
      icon: 'fas fa-microchip',
      title: 'Embedded Systems',
      description: 'Custom hardware for IoT and specialized applications.',
      category: 'hardware'
    }
  ];

  return (
    <ServicesSection id="services">
      <Container>
        <SectionTitle>Our Services & Solutions</SectionTitle>
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <ServiceIcon>
                <i className={service.icon}></i>
              </ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Container>
    </ServicesSection>
  );
};

export default Services;
