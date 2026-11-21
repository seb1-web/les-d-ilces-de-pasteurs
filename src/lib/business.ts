// Source: homepage and Christmas footer in the original repository.
// The old contact page contained conflicting phone and opening hours.
export const business = {
  name: 'Les Délices de Pasteur',
  address: '37, boulevard Pasteur',
  postalCode: '75015',
  city: 'Paris',
  phone: '01 43 06 37 53',
  phoneHref: 'tel:+33143063753',
  facebookUrl: 'https://www.facebook.com/lesdelicesdepasteur/?locale=fr_FR',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Les+D%C3%A9lices+de+Pasteur+37+boulevard+Pasteur+75015+Paris',
} as const;

export const hours = [
  { days: 'Lundi, mardi, mercredi', time: '6h30 – 20h' },
  { days: 'Jeudi', time: 'Fermé' },
  { days: 'Vendredi, samedi', time: '6h30 – 20h' },
  { days: 'Dimanche', time: '7h – 19h' },
] as const;
