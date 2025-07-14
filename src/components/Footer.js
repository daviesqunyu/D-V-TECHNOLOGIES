import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterSection = styled.footer`
  background: ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.textLight};
  padding: ${props => props.theme.spacing.xxl} 0 ${props => props.theme.spacing.lg} 0;
  text-align: center;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.xxl};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
    gap: ${props => props.theme.spacing.xl};
  }
`;

const BrandSection = styled.div`
  flex: 1 1 220px;
  min-width: 200px;
  text-align: left;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    text-align: center;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: center;
  }
  
  i {
    animation: spin 4s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const Description = styled.p`
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: 1.05rem;
  
  span {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
  }
`;

const ContactLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.xs};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: center;
  }
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const QuickLinks = styled.div`
  flex: 1 1 180px;
  min-width: 170px;
  
  h4 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.sm};
    font-size: 1.1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: ${props => props.theme.spacing.xs};
  }
`;

const FooterLink = styled.a`
  color: ${props => props.theme.colors.textLight};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
  }
`;

const SocialSection = styled.div`
  flex: 1 1 220px;
  min-width: 200px;
  
  h4 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.sm};
    font-size: 1.1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  color: ${props => props.theme.colors.primary};
  background: ${props => props.theme.colors.dark};
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  transition: all 0.2s ease;
  border: 1.5px solid ${props => props.theme.colors.primary};
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: scale(1.12) rotate(-8deg);
  }
`;

const Copyright = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
  border-top: 1px solid #1e293b;
  padding-top: ${props => props.theme.spacing.md};
  text-align: center;
  
  p {
    font-size: 0.95rem;
    margin-bottom: ${props => props.theme.spacing.xs};
  }
  
  .vision {
    color: ${props => props.theme.colors.primary};
    margin-top: ${props => props.theme.spacing.sm};
    font-size: 0.9rem;
  }
`;

const Footer = ({ onSectionChange }) => {
  const quickLinks = [
    { label: 'Home', icon: 'fas fa-home', section: 'home' },
    { label: 'AI Solutions', icon: 'fas fa-robot', section: 'ai-services' },
    { label: 'IoT Integration', icon: 'fas fa-wifi', section: 'iot-services' },
    { label: 'Software Dev', icon: 'fas fa-laptop-code', section: 'software-dev' },
    { label: 'Hardware', icon: 'fas fa-server', section: 'hardware-solutions' },
    { label: 'Contact', icon: 'fas fa-envelope', section: 'contact' }
  ];

  const socialLinks = [
    { icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/company/dvtechnologies', title: 'LinkedIn' },
    { icon: 'fab fa-twitter', url: 'https://twitter.com/dvtechnologies', title: 'Twitter' },
    { icon: 'fab fa-facebook-f', url: 'https://facebook.com/dvtechnologies', title: 'Facebook' },
    { icon: 'fab fa-instagram', url: 'https://instagram.com/dvtechnologies', title: 'Instagram' },
    { icon: 'fab fa-github', url: 'https://github.com/dvtechnologies', title: 'GitHub' }
  ];

  return (
    <FooterSection>
      <Container>
        <FooterContent>
          <BrandSection>
            <Logo>
              <i className="fas fa-microchip"></i>
              D&V Technologies
            </Logo>
            <Description>
              Transforming Kenyan Business Through Problem Solving & Innovation.<br />
              <span>Silicon Savannah 2030 Vision</span>
            </Description>
            <ContactLink href="mailto:info@dvtechnologies.com">
              <i className="fas fa-envelope"></i>
              info@dvtechnologies.com
            </ContactLink>
            <ContactLink href="tel:0759075816">
              <i className="fas fa-phone"></i>
              0759 075 816
            </ContactLink>
            <ContactLink href="https://maps.google.com/?q=Lower+Kabete+Wagituni+Villa+Estate" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-map-marker-alt"></i>
              Lower Kabete, Nairobi
            </ContactLink>
          </BrandSection>

          <QuickLinks>
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <FooterLink onClick={() => onSectionChange(link.section)}>
                    <i className={link.icon}></i>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </QuickLinks>

          <SocialSection>
            <h4>Connect With Us</h4>
            <SocialLinks>
              {socialLinks.map((social, index) => (
                <SocialLink
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.title}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className={social.icon}></i>
                </SocialLink>
              ))}
            </SocialLinks>
          </SocialSection>
        </FooterContent>

        <Copyright>
          <p>&copy; 2025 D&V Technologies. All rights reserved.</p>
          <p>Lower Kabete, Nairobi, Kenya</p>
          <p className="vision">
            <i className="fas fa-rocket"></i>
            Proudly driving Nairobi's journey to become Africa's Silicon Savannah by 2030!
          </p>
        </Copyright>
      </Container>
    </FooterSection>
  );
};

export default Footer;
