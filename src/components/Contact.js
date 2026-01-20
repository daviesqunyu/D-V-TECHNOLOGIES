import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContactSection = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  background: ${props => props.theme.colors.light};
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ContactCard = styled(motion.div)`
  background: linear-gradient(145deg, #0f172a, #1e293b);
  color: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: 18px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 212, 255, 0.2);
  }
`;

const ContactIcon = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ContactTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: white;
`;

const ContactInfo = styled.div`
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
    
    &:hover {
      color: ${props => props.theme.colors.accent};
    }
  }
`;

const MapContainer = styled.div`
  height: 340px;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.09);
  margin: ${props => props.theme.spacing.xl} 0;
  
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const WalletSection = styled.div`
  margin: ${props => props.theme.spacing.xl} 0;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  border-radius: 18px;
  color: white;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const ConnectButton = styled(motion.button)`
  background: linear-gradient(45deg, #f6851b, #e2761b);
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  margin: 0 auto;
  margin-top: ${props => props.theme.spacing.md};

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 15px 40px rgba(246, 133, 27, 0.3);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
`;

const WalletStatus = styled.div`
  display: ${props => props.connected ? 'block' : 'none'};
  background: rgba(0, 212, 255, 0.1);
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #00d4ff;
  margin-top: ${props => props.theme.spacing.md};
  
  p {
    margin: 0;
    font-size: 0.9rem;
    color: #00d4ff;
  }
`;

const Contact = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_accounts' 
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', handleAccountsChanged);
      } catch (error) {
        // Handle error silently for wallet connection check
        // This is expected behavior when user hasn't connected wallet yet
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed. Please install MetaMask to continue.');
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
      }
    } catch (error) {
      // Handle specific error cases
      if (error.code === 4001) {
        alert('Wallet connection was rejected. Please try again if you want to connect.');
      } else {
        alert('Failed to connect wallet. Please ensure MetaMask is unlocked and try again.');
      }
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setWalletAddress(null);
    } else {
      setWalletAddress(accounts[0]);
    }
  };

  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Address',
      content: (
        <a href="https://maps.google.com/?q=Lower+Kabete+Wagituni+Villa+Estate" target="_blank" rel="noopener noreferrer">
          Lower Kabete, Nairobi, Kenya
        </a>
      )
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      content: (
        <a href="tel:0759075816">0759 075 816</a>
      )
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      content: (
        <a href="mailto:info@dvtechnologies.com">info@dvtechnologies.com</a>
      )
    },
    {
      icon: 'fas fa-globe',
      title: 'Website',
      content: (
        <a href="https://www.dvtechnologies.com" target="_blank" rel="noopener noreferrer">
          www.dvtechnologies.com
        </a>
      )
    }
  ];

  return (
    <ContactSection id="contact">
      <Container>
        <SectionTitle>Get In Touch</SectionTitle>
        <ContactGrid>
          {contactInfo.map((contact, index) => (
            <ContactCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <ContactIcon>
                <i className={contact.icon}></i>
              </ContactIcon>
              <ContactTitle>{contact.title}</ContactTitle>
              <ContactInfo>{contact.content}</ContactInfo>
            </ContactCard>
          ))}
        </ContactGrid>
        
        <WalletSection>
          <h3 style={{ color: '#00d4ff', marginBottom: '1rem', fontSize: '1.5rem' }}>
            <i className="fab fa-ethereum" style={{ marginRight: '0.5rem' }}></i>
            Crypto Payments Accepted
          </h3>
          <p style={{ color: '#cbd5e1', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
            Connect your MetaMask wallet for secure crypto transactions
          </p>
          
          {!walletAddress ? (
            <ConnectButton
              onClick={connectWallet}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fab fa-ethereum"></i>
              Connect MetaMask
            </ConnectButton>
          ) : (
            <WalletStatus connected={true}>
              <p>
                <i className="fas fa-check-circle" style={{ marginRight: '0.5rem' }}></i>
                {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
              </p>
            </WalletStatus>
          )}
        </WalletSection>
        
        <MapContainer>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.857417825912!2d36.7472!3d-1.2205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1f5c2e5e2b2b%3A0x7e8e2e2e2e2e2e2e!2sWagituni%20Villa%20Estate%2C%20Lower%20Kabete!5e0!3m2!1sen!2ske!4v1710000000000!5m2!1sen!2ske"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="D&V Technologies Location"
          />
        </MapContainer>
      </Container>
    </ContactSection>
  );
};

export default Contact;
