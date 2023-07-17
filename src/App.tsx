import { useEffect, useState } from 'react';
import axios from 'axios';
import { NeoList } from './components/neoList';
import './App.css';
import { Typography } from '@mui/material';
import { NeoData } from './types/types';

const NEO_API_KEY = process.env.REACT_APP_API_KEY;
const NEO_API_URL = `https://api.nasa.gov/neo/rest/v1/feed`;

function App() {
  const [neoData, setNeoData] = useState<NeoData[]>([]);
  const [highlightedItems, setHighlightedItems] = useState<number[]>([]);
  const [firstElementIndex, setFirstElementIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const endDate = formatDate(today);
      today.setDate(today.getDate() - 7);
      const startDate = formatDate(today);
      const url = `${NEO_API_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${NEO_API_KEY}`;

      try {
        const response = await axios.get(url);
        const neoItems: NeoData[] = (Object.values(response.data.near_earth_objects) as unknown[]).flat() as NeoData[];
        setNeoData(neoItems);
        updateHighlightedItems(neoItems);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching NEO data:', error);
        setError('Error loading NEO data');
        setIsLoading(false);
      }
    };

    fetchData();
    const timer = setInterval(addNewNeoObject, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const updateHighlightedItems = (data: NeoData[]) => {
    const hazardCounts = data.map((neo) => (neo.is_potentially_hazardous_asteroid ? 1 : 0));
    const sortedIndices = hazardCounts.map((_, index) => index).sort((a, b) => hazardCounts[b] - hazardCounts[a]);
    const topIndices = sortedIndices.slice(0, 2);
    setHighlightedItems(topIndices);
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const addNewNeoObject = async () => {
    const today = new Date();
    const endDate = formatDate(today);
    today.setDate(today.getDate() - 7);
    const startDate = formatDate(today);
    const url = `${NEO_API_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${NEO_API_KEY}`;

    try {
      const response = await axios.get(url);
      const neoItems: NeoData[] = (Object.values(response.data.near_earth_objects) as unknown[]).flat() as NeoData[];
      setNeoData((prevNeoData) => {
        let updatedNeoData = [...prevNeoData, ...neoItems];
        if (updatedNeoData.length > 6) {
          updatedNeoData = updatedNeoData.slice(1);
        }
        return updatedNeoData;
      });
      setFirstElementIndex((prevIndex) => prevIndex + 1);
    } catch (error) {
      console.error('Error fetching NEO data:', error);
      setError('Error loading NEO data');
    }
  };

  const displayedNeoData = neoData.slice(firstElementIndex, firstElementIndex + 6);

  return (
    <div>
      <Typography variant="h1">Near Orbital Objects (NEO)</Typography>

      {isLoading ? (
        <Typography variant="h3">Loading...</Typography>
      ) : error ? (
        <Typography variant="h3">{error}</Typography>
      ) : (
        <NeoList neoData={displayedNeoData} highlightedItems={highlightedItems} />
      )}
    </div>
  );
}

export default App;
