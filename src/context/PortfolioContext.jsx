import { createContext, useContext, useState } from 'react';
import defaultData from '../assets/portfolioData.json';

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [portfolioData, setPortfolioData] = useState(defaultData);
  const [isSaving, setIsSaving] = useState(false);

  const savePortfolioData = async (newData) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/save-portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData, null, 2),
      });
      
      if (response.ok) {
        setPortfolioData(newData);
        return true;
      } else {
        console.error("Failed to save portfolio data");
        return false;
      }
    } catch (error) {
      console.error("Error saving portfolio data:", error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <PortfolioContext.Provider value={{ portfolioData, setPortfolioData, savePortfolioData, isSaving }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
