import { v4 as uuidv4 } from 'uuid';

const now = () => new Date().toISOString();

const mockAlerts = [
  {
    id: uuidv4(),
    type: 'Flood',
    severity: 'High',
    location: 'Hunza Valley, Gilgit-Baltistan, Pakistan',
    coords: [36.321, 74.873],
    time: now(),
    description: 'River overflow due to heavy upstream rainfall. Roads may be blocked.',
    affectedAreaKm2: 25
  },
  {
    id: uuidv4(),
    type: 'Earthquake',
    severity: 'Medium',
    location: 'Islamabad, Pakistan',
    coords: [33.6844, 73.0479],
    time: now(),
    description: 'Magnitude 5.1 reported, minor structural damage possible.',
    affectedAreaKm2: 10
  },
  {
    id: uuidv4(),
    type: 'Wildfire',
    severity: 'Low',
    location: 'Murree Hills, Pakistan',
    coords: [33.9042, 73.3930],
    time: now(),
    description: 'Small forest fire contained by local teams; air quality impacted locally.',
    affectedAreaKm2: 3
  },

  /* ------------------- ADDITIONAL 10 MOCK ALERTS ------------------- */

  {
    id: uuidv4(),
    type: 'Heatwave',
    severity: 'High',
    location: 'Jacobabad, Sindh, Pakistan',
    coords: [28.2819, 68.4370],
    time: now(),
    description: 'Extreme temperatures exceeding 49°C. Health risks are high.',
    affectedAreaKm2: 120
  },
  {
    id: uuidv4(),
    type: 'Cyclone',
    severity: 'High',
    location: 'Karachi Coastline, Pakistan',
    coords: [24.8607, 67.0011],
    time: now(),
    description: 'Cyclone Shahin approaching coastal areas. Evacuation advised.',
    affectedAreaKm2: 300
  },
  {
    id: uuidv4(),
    type: 'Landslide',
    severity: 'Medium',
    location: 'Kaghan Valley, Pakistan',
    coords: [34.6000, 73.3500],
    time: now(),
    description: 'Hillside movement detected after heavy rainfall. Roads partially blocked.',
    affectedAreaKm2: 8
  },
  {
    id: uuidv4(),
    type: 'Flood',
    severity: 'Medium',
    location: 'Sialkot, Punjab, Pakistan',
    coords: [32.4945, 74.5229],
    time: now(),
    description: 'Seasonal monsoon flooding affecting low-lying residential zones.',
    affectedAreaKm2: 40
  },
  {
    id: uuidv4(),
    type: 'Earthquake',
    severity: 'Low',
    location: 'Quetta, Balochistan, Pakistan',
    coords: [30.1798, 66.9750],
    time: now(),
    description: 'Magnitude 3.8 tremor felt. No major damage reported.',
    affectedAreaKm2: 5
  },
  {
    id: uuidv4(),
    type: 'Wildfire',
    severity: 'High',
    location: 'Margalla Hills, Islamabad, Pakistan',
    coords: [33.7491, 73.0487],
    time: now(),
    description: 'Rapidly spreading forest fire due to dry winds. Firefighting underway.',
    affectedAreaKm2: 45
  },
  {
    id: uuidv4(),
    type: 'Heatwave',
    severity: 'Medium',
    location: 'Multan, Punjab, Pakistan',
    coords: [30.1575, 71.5249],
    time: now(),
    description: 'Temperatures above 43°C expected for the next 48 hours.',
    affectedAreaKm2: 100
  },
  {
    id: uuidv4(),
    type: 'Storm',
    severity: 'Low',
    location: 'Gwadar, Balochistan, Pakistan',
    coords: [25.1264, 62.3225],
    time: now(),
    description: 'Strong winds and heavy rainfall predicted along the coastline.',
    affectedAreaKm2: 55
  },
  {
    id: uuidv4(),
    type: 'Landslide',
    severity: 'High',
    location: 'Skardu, Gilgit-Baltistan, Pakistan',
    coords: [35.3350, 75.6350],
    time: now(),
    description: 'Major landslide blocking access routes. Travel restricted.',
    affectedAreaKm2: 18
  }
];

export default mockAlerts;
