export interface NeoData {
  estimated_diameter_max: number;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: CloseApproachData[];
}

export interface CloseApproachData {
  miss_distance: {
    kilometers: string;
  };
  relative_velocity: {
    kilometers_per_hour: string;
  };
}

export interface NeoItemProps {
  neo: NeoData;
  highlighted: boolean;
}