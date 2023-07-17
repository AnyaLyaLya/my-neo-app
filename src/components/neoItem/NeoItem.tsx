import { FC } from "react";
import { NeoItemProps } from '../../types/types';

export const NeoItem:FC<NeoItemProps> = ({ neo, highlighted }) => {
  const { estimated_diameter_max, is_potentially_hazardous_asteroid, close_approach_data } = neo;

  return (
    <div className={`neo-item ${highlighted ? 'highlighted' : ''}`}>
      <p>Max Estimated Diameter: {estimated_diameter_max} km</p>
      <p>Potentially Hazardous: {is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
      <p>Closest NEO: {close_approach_data[0].miss_distance.kilometers} km</p>
      <p>Fastest NEO: {close_approach_data[0].relative_velocity.kilometers_per_hour} kph</p>
    </div>
  );
};