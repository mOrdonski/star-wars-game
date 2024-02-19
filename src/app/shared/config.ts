export const config = {
  SWApiUrl: 'https://swapi.tech/api/',
  peopleOptions: [
    { value: 'mass', label: 'Mass', description: 'Higher mass wins' },
    { value: 'height', label: 'Height', description: 'Higher wins' },
  ],
  starshipOptions: [
    {
      value: 'cost_in_credits',
      label: 'Cost in credits',
    },
    {
      value: 'length',
      label: 'Length',
    },
    {
      value: 'crew',
      label: 'Crew',
    },
    {
      value: 'passengers',
      label: 'Passengers',
    },
    {
      value: 'hyperdrive_rating',
      label: 'Hyperdrive rating',
    },
  ],
  speciesOptions: [
    {
      value: 'average_height',
      label: 'Average height',
    },
    {
      value: 'average_lifespan',
      label: 'Average lifespan',
    },
  ],
  planetOptions: [
    {
      value: 'diameter',
      label: 'Diameter',
    },
    {
      value: 'rotation_period',
      label: 'Rotation period',
    },
    {
      value: 'orbital_period',
      label: 'Orbital period',
    },
    {
      value: 'gravity',
      label: 'Gravity',
    },
    {
      value: 'population',
      label: 'Population',
    },
  ],
};
