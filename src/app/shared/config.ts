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
};
