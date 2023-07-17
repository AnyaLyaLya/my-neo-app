import { FC } from "react";
import { NeoItem } from "../neoItem";
import { List } from '@mui/material';
import { NeoListProps } from '../../types/types';

export const NeoList:FC<NeoListProps> = ({ neoData, highlightedItems }) => (
  <List>
    {neoData.map((neo, index) => (
      <NeoItem key={index} neo={neo} highlighted={highlightedItems.includes(index + 1)} />
    ))}
  </List>
);
