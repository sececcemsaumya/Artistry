
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter,Routes,Route,useLocation } from 'react-router-dom'
import Home from './Components/Home.jsx'
import Login from './Components/Login.jsx'
import SignUp from './Components/SignUp.jsx'
import BackgroundVideo from './Components/BackgroundVideo.jsx'
import AboutUs from './Components/AboutUs.jsx'
import ArtistGallery from './Components/ArtistGallery.jsx'
import ArtistCard from './Components/ArtistCard.jsx'
import ArtworksPage from './Components/ArtWorksPage.jsx'
import Wishlist from './Components/Wishlist.jsx'
import Cart from './Components/Cart.jsx'
import Contact from './Components/Contact.jsx'
import Orders from './Components/Orders.jsx'
import Payment from './Components/Payment.jsx'

const artists = [
   {
     name: "Leonardo da Vinci",
     image: "https://www.thefamouspeople.com/profiles/images/leonardo-da-vinci-6.jpg",
     bio: "Italian polymath of the Renaissance known for masterpieces like the Mona Lisa and The Last Supper.",
     wiki: "https://en.wikipedia.org/wiki/Leonardo_da_Vinci"
   },
   {
     name: "Pablo Picasso",
     image: "https://i.pinimg.com/originals/3d/b6/35/3db635008be227ff550dd5fa80453a25.jpg",
     bio: "Spanish painter, sculptor, co-founder of Cubism and one of the most influential artists of the 20th century.",
     wiki: "https://en.wikipedia.org/wiki/Pablo_Picasso"
   },
  
   {
     name: "Frida Kahlo",
     image: "https://hg-images.condecdn.net/image/9RYGDdoleeB/crop/2040/f/frida-kahlo-in-blue-satin-blouse-1939-photograph-nickolas-muray-nickolas-muray-photo-archives.jpg",
     bio: "Mexican painter known for her self-portraits, emotional intensity, and vibrant depiction of Mexican culture and identity.",
     wiki: "https://en.wikipedia.org/wiki/Frida_Kahlo"
   },
   {
    name: "Jackson Pollock",
    image: "https://tse1.mm.bing.net/th?id=OIP.xTQv3F5_USqp1_0R6zY9ZwHaGL&pid=Api&P=0&h=180",
    bio: "American painter famous for abstract expressionist drip paintings.",
    wiki: "https://en.wikipedia.org/wiki/Jackson_Pollock"
  },
  {
    name: "Henri Matisse",
    image: "https://i.pinimg.com/originals/0e/28/8f/0e288fee44a3fcf2566ab523b5414307.jpg",
    bio: "French artist, leader of Fauvism, known for bold colors and expressive forms.",
    wiki: "https://en.wikipedia.org/wiki/Henri_Matisse"
  },
   {
     name: "Salvador Dalí",
     image: "https://i.pinimg.com/736x/e4/99/99/e499995a3ec315aa1add6e3d26339b6b.jpg",
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
     image: "https://arthistoryschool.com/wp-content/uploads/2022/07/Georgia-OKeeffe.jpg.webp",
     bio: "Mother of American modernism, celebrated for her large-scale flowers and desert landscapes.",
     wiki: "https://en.wikipedia.org/wiki/Georgia_O%27Keeffe"
   },

   {
      name: "Amrita Sher-Gil",
      image: "https://arthistoryschool.com/wp-content/uploads/2022/07/sher1.jpg",
      bio: "Hungarian-Indian painter, often called India’s Frida Kahlo, known for blending Western and Indian styles.",
      wiki: "https://en.wikipedia.org/wiki/Amrita_Sher-Gil"
    },
   {
    name: "Claude Monet",
    image: "https://i.pinimg.com/736x/68/74/d4/6874d4b38593e8345962c2558977d77b--oscar-claude-monet-colorized-photos.jpg",
    bio: "Founder of French Impressionist painting known for his landscape series like Water Lilies.",
    wiki: "https://en.wikipedia.org/wiki/Claude_Monet"
  },
   {
    "name": "Gustav Klimt",
    "image": "https://i.pinimg.com/originals/db/de/8a/dbde8a2cf4896c9db3cc6ea12e03445c.png",
    "bio": "Austrian symbolist painter known for The Kiss and his ornate, decorative style.",
    "wiki": "https://en.wikipedia.org/wiki/Gustav_Klimt"
  },
   {
     name: "Edvard Munch",
     image: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-600031727jpg--.jpg",
     bio: "Norwegian artist known for The Scream and psychological themes.",
     wiki: "https://en.wikipedia.org/wiki/Edvard_Munch"
   },
   {
     name: "Johannes Vermeer",
     image: "https://i.pinimg.com/originals/84/00/74/8400746e2dd0d6a865a5dc7e0d2873ee.jpg",
     bio: "Dutch Baroque painter known for Girl with a Pearl Earring.",
     wiki: "https://en.wikipedia.org/wiki/Johannes_Vermeer"
   },
   {
     name: "Raphael",
     image: "https://i.pinimg.com/originals/c9/46/07/c946075c41395df8096d197e08504412.jpg",
     bio: "High Renaissance artist famed for his Madonnas and harmony in composition.",
     wiki: "https://en.wikipedia.org/wiki/Raphael"
   },
   {
    "name": "Elisabeth Vigee Le Brun",
    "image": "https://media.mutualart.com/Images/2015_06/11/13/133313611/9b07586e-d8fd-4288-942a-38e3c538d08b.Jpeg",
    "bio": "French portraitist of the 18th century known for painting European nobility, especially Marie Antoinette.",
    "wiki": "https://en.wikipedia.org/wiki/%C3%89lisabeth_Vig%C3%A9e_Le_Brun"
  },
   
 ];

createRoot(document.getElementById('root')).render(
     <BrowserRouter>
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/artgallery" element={<BackgroundVideo/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/artists" element={<ArtistGallery artists={artists} />} />
        <Route path="/artworks" element={<ArtworksPage/>}/>
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/payment" element={<Payment/>}/>
     </Routes>
     </BrowserRouter>

)
