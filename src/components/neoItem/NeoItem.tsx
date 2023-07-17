import { FC } from "react";
import { ListItem, ListItemText } from '@mui/material';
import { NeoItemProps } from '../../types/types';

export const NeoItem:FC<NeoItemProps> = ({ neo, highlighted }) => {
  const estimatedDiameterMax = neo.estimated_diameter.kilometers.estimated_diameter_max;
  
  const {is_potentially_hazardous_asteroid, close_approach_data } = neo;
  const listItemStyle = { backgroundColor: highlighted ? 'red' : 'transparent' };

  return (
    <ListItem style={listItemStyle} className={`neo-item ${highlighted ? 'highlighted' : ''}`}>
      <ListItemText primary={`Max Estimated Diameter: ${estimatedDiameterMax} km`} />

      <ListItemText
        primary={`Potentially Hazardous: ${is_potentially_hazardous_asteroid ? 'Yes' : 'No'}`}
      />

      <ListItemText
        primary={`Closest NEO: ${close_approach_data[0].miss_distance.kilometers} km`}
      />

      <ListItemText
        primary={`Fastest NEO: ${close_approach_data[0].relative_velocity.kilometers_per_hour} kph`}
      />
  </ListItem>
  );
};