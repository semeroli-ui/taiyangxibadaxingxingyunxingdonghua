export interface PlanetData {
  id: string;
  name: string;
  nameEn: string;
  color: string;
  size: number; // Relative size in pixels
  distance: number; // Relative distance from sun (orbit radius)
  speed: number; // Relative orbital speed
  description: string;
}

export interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}