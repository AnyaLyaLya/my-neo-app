import { useEffect, useState } from 'react';
import axios from 'axios';
import { NeoList } from './components/neoList';
import './App.css';
import { NeoData } from './types/types'

const NEO_API_KEY = process.env.REACT_APP_API_KEY;
const NEO_API_URL = `https://api.nasa.gov/neo/rest/v1/feed`;

function App() {
  const [neoData, setNeoData] = useState<NeoData[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();

      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const startDate = `${year}-${month}-10`;
      const endDate = `${year}-${month}-17`;
      const url = `${NEO_API_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${NEO_API_KEY}`;

      try {
        const response = await axios.get(url);
        const neoItems: NeoData[] = (Object.values(response.data.near_earth_objects) as unknown[])
          .flat()
          .slice(0, 6) as NeoData[];
        setNeoData(neoItems);
      } catch (error) {
        console.error('Error fetching NEO data:', error);
      }
    };

    fetchData();
    const timer = setInterval(fetchData, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <h1>Near Orbital Objects (NEO)</h1>
      <NeoList neoData={neoData} />
    </div>
  );
}

export default App;
