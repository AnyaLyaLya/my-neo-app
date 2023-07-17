import { FC, useEffect, useState } from "react";
import { NeoItem } from "../neoItem";
import { NeoData } from '../../types/types';

export const NeoList:FC<{ neoData: NeoData[] }> = ({ neoData }) => {
  const [highlightedItems, setHighlightedItems] = useState<NeoData[]>([]);

  useEffect(() => {
    const calculateHazardCounts = (neo: NeoData): number => {
      return neo.is_potentially_hazardous_asteroid ? 1 : 0;
    };

    const sortedItems = neoData.slice().sort((a, b) => {
      const hazardCountA = calculateHazardCounts(a);
      const hazardCountB = calculateHazardCounts(b);
      return hazardCountB - hazardCountA;
    });

    setHighlightedItems(sortedItems.slice(0, 2));
  }, [neoData]);

  return (
    <div>
      {neoData.map((neo, index) => (
        <NeoItem key={index} neo={neo} highlighted={highlightedItems.includes(neo)} />
      ))}
    </div>
  );
};