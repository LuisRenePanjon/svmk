import {Dancing_Script, Great_Vibes, Raleway, Merriweather_Sans} from "next/font/google";

const greatVibes = Merriweather_Sans({
  subsets: ['latin'], // Incluye solo caracteres necesarios
  weight: '400', // Especifica los pesos que vas a usar
  variable: '--font-great-vibes', // Define una variable CSS
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '700'], // Pesos para texto normal y negrita
  variable: '--font-raleway',
});

export const DancingScript = Dancing_Script({
  subsets: ['latin'],
});
