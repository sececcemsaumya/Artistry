import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ArtistGallery from './Components/ArtistGallery';
const artists = [
  {
    name: "Leonardo da Vinci",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Leonardo_self.jpg/440px-Leonardo_self.jpg",
    bio: "Italian polymath of the Renaissance known for masterpieces like the Mona Lisa and The Last Supper.",
    wiki: "https://en.wikipedia.org/wiki/Leonardo_da_Vinci"
  },
  {
    name: "Vincent van Gogh",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg/440px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg",
    bio: "Dutch post-impressionist painter famous for Starry Night and his emotional, expressive use of color.",
    wiki: "https://en.wikipedia.org/wiki/Vincent_van_Gogh"
  },
  {
    name: "Pablo Picasso",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Pablo_picasso_1.jpg/440px-Pablo_picasso_1.jpg",
    bio: "Spanish painter, sculptor, co-founder of Cubism and one of the most influential artists of the 20th century.",
    wiki: "https://en.wikipedia.org/wiki/Pablo_Picasso"
  },
  {
    name: "Frida Kahlo",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Frida_Kahlo_%281934%29.jpg/440px-Frida_Kahlo_%281934%29.jpg",
    bio: "Mexican painter known for her self-portraits, pain, and vibrant depiction of Mexican culture.",
    wiki: "https://en.wikipedia.org/wiki/Frida_Kahlo"
  },
  {
    name: "Claude Monet",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Claude_Monet_1899_Nadar.jpg/440px-Claude_Monet_1899_Nadar.jpg",
    bio: "Founder of French Impressionist painting known for his landscape series like Water Lilies.",
    wiki: "https://en.wikipedia.org/wiki/Claude_Monet"
  },
  {
    name: "Salvador Dalí",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Salvador_Dali_NYWTS.jpg/440px-Salvador_Dali_NYWTS.jpg",
    bio: "Spanish surrealist known for eccentricity and the iconic painting The Persistence of Memory.",
    wiki: "https://en.wikipedia.org/wiki/Salvador_Dal%C3%AD"
  },
  {
    name: "Andy Warhol",
    image: "https://www.askthemonsters.com/wp-content/uploads/2015/10/Greg-Gorman-Andy-Warhol.jpg",
    bio: "American pop artist known for Campbell's Soup Cans and celebrity culture commentary.",
    wiki: "https://en.wikipedia.org/wiki/Andy_Warhol"
  },
  {
    name: "Georgia O'Keeffe",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/GeorgiaOKeeffe1918.jpg/440px-GeorgiaOKeeffe1918.jpg",
    bio: "Mother of American modernism, celebrated for her large-scale flowers and desert landscapes.",
    wiki: "https://en.wikipedia.org/wiki/Georgia_O%27Keeffe"
  },
  {
    name: "Michelangelo",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Michelangelo_-_Daniello_Portrait.jpg/440px-Michelangelo_-_Daniello_Portrait.jpg",
    bio: "Italian sculptor, painter, and architect, creator of David and the Sistine Chapel ceiling.",
    wiki: "https://en.wikipedia.org/wiki/Michelangelo"
  },
  {
    name: "Rembrandt",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Rembrandt_Harmensz._van_Rijn_130.jpg/440px-Rembrandt_Harmensz._van_Rijn_130.jpg",
    bio: "Dutch Golden Age painter known for his portraits and mastery of light and shadow.",
    wiki: "https://en.wikipedia.org/wiki/Rembrandt"
  },
  {
    name: "Henri Matisse",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Henri_Matisse_1913_photo.jpg/440px-Henri_Matisse_1913_photo.jpg",
    bio: "French artist, leader of Fauvism, known for bold colors and expressive forms.",
    wiki: "https://en.wikipedia.org/wiki/Henri_Matisse"
  },
  {
    name: "Jackson Pollock",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Jackson_Pollock_by_Hans_Namuth.jpg/440px-Jackson_Pollock_by_Hans_Namuth.jpg",
    bio: "American painter famous for abstract expressionist drip paintings.",
    wiki: "https://en.wikipedia.org/wiki/Jackson_Pollock"
  },
  {
    name: "Edvard Munch",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Edvard_Munch_1921.jpeg/440px-Edvard_Munch_1921.jpeg",
    bio: "Norwegian artist known for The Scream and psychological themes.",
    wiki: "https://en.wikipedia.org/wiki/Edvard_Munch"
  },
  {
    name: "Paul Cézanne",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Paul_C%C3%A9zanne_1861.jpg/440px-Paul_C%C3%A9zanne_1861.jpg",
    bio: "Post-impressionist who bridged 19th-century art and Cubism.",
    wiki: "https://en.wikipedia.org/wiki/Paul_C%C3%A9zanne"
  },
  {
    name: "Johannes Vermeer",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg/440px-Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg",
    bio: "Dutch Baroque painter known for Girl with a Pearl Earring.",
    wiki: "https://en.wikipedia.org/wiki/Johannes_Vermeer"
  },
  {
    name: "Roy Lichtenstein",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Roy_Lichtenstein.jpg/440px-Roy_Lichtenstein.jpg",
    bio: "American pop artist who used comic strip-style imagery.",
    wiki: "https://en.wikipedia.org/wiki/Roy_Lichtenstein"
  },
  {
    name: "Gustav Klimt",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Gustav_Klimt_1914.jpg/440px-Gustav_Klimt_1914.jpg",
    bio: "Austrian symbolist painter known for The Kiss and golden motifs.",
    wiki: "https://en.wikipedia.org/wiki/Gustav_Klimt"
  },
  {
    name: "Raphael",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Raffael_1.jpg/440px-Raffael_1.jpg",
    bio: "High Renaissance artist famed for his Madonnas and harmony in composition.",
    wiki: "https://en.wikipedia.org/wiki/Raphael"
  },
  {
    name: "Diego Rivera",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/DiegoRiveraFridaKahlo1932.jpg/440px-DiegoRiveraFridaKahlo1932.jpg",
    bio: "Mexican muralist known for large political artworks and Marxist themes.",
    wiki: "https://en.wikipedia.org/wiki/Diego_Rivera"
  },
  {
    name: "Jean-Michel Basquiat",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Jean-Michel_Basquiat_in_1982.jpg/440px-Jean-Michel_Basquiat_in_1982.jpg",
    bio: "Neo-expressionist artist from NYC who tackled race and power through street-inspired art.",
    wiki: "https://en.wikipedia.org/wiki/Jean-Michel_Basquiat"
  },
  {
    name: "Amrita Sher-Gil",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Amrita_Sher-Gil.jpg",
    bio: "Hungarian-Indian painter, often called India’s Frida Kahlo, known for blending Western and Indian styles.",
    wiki: "https://en.wikipedia.org/wiki/Amrita_Sher-Gil"
  }
];

const App = () => {
    return (
      <>
      </>
    );
  };

export default App;
