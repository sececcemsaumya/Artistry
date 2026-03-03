import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaShoppingCart, FaUser, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { color } from 'framer-motion';


const staticArtData = {
 traditional : [
  {
    id: 'traditional-1',
    title: "Nirmal Art Floral Motif",
    artist: "Madhvi Parekh",
    price: 2250,
    ratings: "4.6",
    img: "https://cultureandheritage.org/wp-content/uploads/2023/01/image-104.png",
    description: "A graceful Nirmal art floral motif, blending tradition and elegance.",
    dimensions: "35 x 58 inches",
    medium: "Serigraph on paper",
    frameStatus: "Unframed (ships rolled)"
  },
  {
    id: 'traditional-2',
    title: "Peacock in Mandana Art",
    artist: "Leela Bai",
    price: 2800,
    ratings: "4.8",
    img: "https://i.pinimg.com/originals/19/aa/1a/19aa1a59d37f668015b847377bf50b0a.jpg",
    description: "A vibrant depiction of a peacock using traditional Mandana motifs, symbolizing prosperity and grace.",
    dimensions: "18 x 24 inches",
    medium: "Natural pigment on handmade paper",
    frameStatus: "Framed"
  },
  {
    id: 'traditional-3',
    title: "Kathakali Dancer",
    artist: "Suresh Muthukulam",
    price: 3200,
    ratings: "5.0",
    img: "https://i.pinimg.com/736x/08/3e/49/083e49707e6547c21c8748f9756c479c.jpg",
    description: "An expressive portrayal of a Kathakali dancer capturing the essence of Kerala's classical dance.",
    dimensions: "20 x 28 inches",
    medium: "Acrylic on canvas",
    frameStatus: "Not framed"
  },
  {
    id: 'traditional-4',
    title: "Three Seated Women",
    artist: "Jamini Roy",
    price: 2900,
    ratings: "4.9",
    img: "https://tse3.mm.bing.net/th?id=OIP.KGQE8CFKEANBogPdnIH46QHaEJ&pid=Api&P=0&h=180",
    description: "A minimalist and bold composition showing three women in Jamini Roy’s signature folk-art style.",
    dimensions: "16 x 20 inches",
    medium: "Tempera on board",
    frameStatus: "Framed"
  },
  {
    id: 'traditional-5',
    title: "Ganesha in Gold",
    artist: "S. Rajam",
    price: 2700,
    ratings: "4.7",
    img: "https://i.pinimg.com/originals/a3/1e/dc/a31edc97e5b8a1e374f4dd3c25b4bc26.jpg",
    description: "A divine and serene representation of Lord Ganesha, adorned in golden hues.",
    dimensions: "22 x 30 inches",
    medium: "Watercolor on silk",
    frameStatus: "Not framed"
  },
  {
    id: 'traditional-6',
    title: "Tribal Festival Art",
    artist: "Venkat Raman Singh Shyam",
    price: 3100,
    ratings: "5.0",
    img: "https://cdn.dollsofindia.com/images/p/kalighat-paintings/tribal-painting-SM51_l.jpg",
    description: "A lively depiction of a tribal festival in bold lines and vibrant colors.",
    dimensions: "19 x 25 inches",
    medium: "Ink on handmade paper",
    frameStatus: "Framed"
  },
  {
    id: 'traditional-7',
    title: "Tree of Life",
    artist: "Bhawani Das",
    price: 3200,
    ratings: "5.0",
    img: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/2-the-tree-of-life-is-a-painting-on-stained-glass-in-the-style-of-vibrant-color-fields-mosaic-compos-owl-gallery.jpg",
    description: "A symbolic tree of life, rendered in vibrant color fields and intricate detail.",
    dimensions: "24 x 36 inches",
    medium: "Gouache on paper",
    frameStatus: "Framed"
  },
  {
    id: 'traditional-8',
    title: "Goddess Durga",
    artist: "Jamini Roy",
    price: 2800,
    ratings: "4.8",
    img: "https://i.etsystatic.com/17022861/r/il/f10654/2483468851/il_fullxfull.2483468851_23kq.jpg",
    description: "A folk-art portrayal of Goddess Durga in Jamini Roy's iconic style.",
    dimensions: "18 x 24 inches",
    medium: "Tempera on canvas",
    frameStatus: "Unframed"
  },
  {
    id: 'traditional-9',
    title: "Warli Village Dance",
    artist: "Jivya Soma Mashe",
    price: 2900,
    ratings: "4.9",
    img: "https://pwonlyias.com/wp-content/uploads/2024/01/Untitled-100-1.webp",
    description: "Traditional Warli painting capturing the rhythm and joy of village dance.",
    dimensions: "16 x 24 inches",
    medium: "Natural pigment on paper",
    frameStatus: "Framed"
  },
  {
    id: 'traditional-10',
    title: "Buddha in Meditation",
    artist: "Lokesh Chandra",
    price: 2500,
    ratings: "4.6",
    img: "https://wallpapercave.com/wp/wp8877587.jpg",
    description: "A serene image of Buddha meditating, radiating peace and enlightenment.",
    dimensions: "18 x 24 inches",
    medium: "Acrylic on canvas",
    frameStatus: "Unframed"
  },
  {
    id: 'traditional-11',
    title: "Encyclopedia of Intangible",
    artist: "Badrinath Jogi",
    price: 2600,
    ratings: "4.7",
    img: "https://asiainch.org/wp-content/uploads/2001/06/Pithori-Rani.jpg",
    description: "A detailed folk narrative celebrating intangible cultural heritage.",
    dimensions: "15 x 20 inches",
    medium: "Mixed media on paper",
    frameStatus: "Framed"
  },
  {
    id: 'traditional-12',
    title: "Radha Krishna",
    artist: "M.F. Husain",
    price: 2600,
    ratings: "4.7",
    img: "https://static.vecteezy.com/system/resources/previews/021/979/809/large_2x/radha-krishna-in-love-painting-wall-art-8k-generative-ai-radha-krishna-paintings-on-canvas-photo.jpg",
    description: "A modernist take on the divine love of Radha and Krishna.",
    dimensions: "20 x 28 inches",
    medium: "Watercolor on paper",
    frameStatus: "Unframed"
  },
  {
    id: 'traditional-13',
    title: "Batik Art of Odisha",
    artist: "Batik Painting – Odisha",
    price: 2900,
    ratings: "4.9",
    img: "https://odishatourism.gov.in/content/dam/tourism/home/discover/attractions/art-and-crafts/pipili/pipstb/Pipili_STB1.jpg",
    description: "A vibrant batik painting from Odisha, featuring traditional motifs.",
    dimensions: "18 x 24 inches",
    medium: "Batik on fabric",
    frameStatus: "Framed"
  },
  {
    id: 'traditional-14',
    title: "Bengal Tiger",
    artist: "Shuvaprasanna",
    price: 1500,
    ratings: "4.0",
    img: "https://wallpapercave.com/wp/wp7131044.png",
    description: "A bold and expressive painting of the majestic Bengal Tiger.",
    dimensions: "16 x 22 inches",
    medium: "Oil on canvas",
    frameStatus: "Unframed"
  },
  {
    id: 'traditional-15',
    title: "Rajput Bridal Procession",
    artist: "Bhuri Bai",
    price: 1600,
    ratings: "4.1",
    img: "https://cdn.dollsofindia.com/images/p/phad-paintings/rajput-bridal-procession-BL42_l.jpg",
    description: "A festive Rajput bridal procession painted in the Phad style.",
    dimensions: "18 x 26 inches",
    medium: "Gouache on paper",
    frameStatus: "Framed"
  },
  {
    id: 'traditional-16',
    title: "Lord Shiva",
    artist: "Sita Devi",
    price: 2800,
    ratings: "4.8",
    img: "https://artfactory.in/product_pictures/God-CP104.jpg",
    description: "A powerful depiction of Lord Shiva in vibrant folk colors.",
    dimensions: "20 x 28 inches",
    medium: "Acrylic on canvas",
    frameStatus: "Unframed"
  },
  {
    id: 'traditional-17',
    title: "Holi Festival",
    artist: "Chittaprosad",
    price: 2350,
    ratings: "4.5",
    img: "https://tse1.mm.bing.net/th?id=OIP.EKvB9zzudlAh8R-1dkQOigHaE8&pid=Api&P=0&h=180",
    description: "A lively painting capturing the colors and joy of Holi festival.",
    dimensions: "18 x 24 inches",
    medium: "Watercolor on paper",
    frameStatus: "Unframed"
  },
  {
    id: 'traditional-18',
    title: "Satyajit Ray",
    artist: "Jogen Chowdhury",
    price: 2750,
    ratings: "4.8",
    img: "https://tse1.mm.bing.net/th?id=OIP.na8fksnHlG-VlgGNVwRKRAHaFC&pid=Api&P=0&h=180",
    description: "A portrait of Satyajit Ray in expressive lines and subtle tones.",
    dimensions: "20 x 28 inches",
    medium: "Mixed media on paper",
    frameStatus: "Framed"
  },
  {
    id: 'traditional-19',
    title: "Folk Musicians",
    artist: "Rama Balakrishnan",
    price: 1950,
    ratings: "4.3",
    img: "https://i.pinimg.com/originals/8f/f2/16/8ff21694e01f86cf664b257bcf8f4924.jpg",
    description: "A lively folk scene featuring musicians and dancers.",
    dimensions: "20 x 28 inches",
    medium: "Acrylic on canvas",
    frameStatus: "Unframed"
  },
  {
    id: 'traditional-20',
    title: "Goddess Saraswati",
    artist: "Raja Ravi Varma",
    price: 2100,
    ratings: "4.4",
    img: "https://www.artfactory.in/product_pictures/God-CP160.jpg",
    description: "A delicate painting of Goddess Saraswati playing the veena.",
    dimensions: "18 x 24 inches",
    medium: "Watercolor on paper",
    frameStatus: "Framed"
  },
  {
    id: 'traditional-21',
    title: "Madhubani Elephant",
    artist: "Sita Devi",
    price: 2450,
    ratings: "4.5",
    img: "https://i.pinimg.com/originals/86/ed/e6/86ede69a92894589f8b5e33df7934f63.jpg",
    description: "A vibrant Madhubani painting of an elephant, rich in symbolism.",
    dimensions: "22 x 30 inches",
    medium: "Natural pigment on handmade paper",
    frameStatus: "Framed"
  }
],

   modern : [
  {
    id: 'modern-1',
    title: "Glacial Lagoon",
    artist: "Salvador Dalí",
    price: 2900,
    ratings: "5.0",
    img: "https://img.freepik.com/premium-photo/beautiful-glacial-lagoon-background-abstract-winter-landscape-hyper-realistic-digital-painting_926199-1468789.jpg",
    description: "A surreal landscape blending icy blues and abstract forms, evoking a dreamlike glacial lagoon.",
    dimensions: "24 x 36 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: 'modern-2',
    title: "Sunset",
    artist: "Pablo Picasso",
    price: 2700,
    ratings: "4.9",
    img: "https://png.pngtree.com/background/20230611/original/pngtree-painting-at-sunset-with-trees-and-water-picture-image_3157009.jpg",
    description: "A vibrant sunset scene with bold strokes and abstracted trees by the water.",
    dimensions: "22 x 30 inches",
    medium: "Acrylic on canvas",
    frameStatus: "Not framed"
  },
  {
    id: 'modern-3',
    title: "Whispers in Color",
    artist: "Pablo Picasso",
    price: 3100,
    ratings: "5.0",
    img: "https://wallpaperaccess.com/full/160605.jpg",
    description: "An abstract composition with swirling colors and subtle forms, evoking a sense of emotion.",
    dimensions: "20 x 28 inches",
    medium: "Mixed media",
    frameStatus: "Framed"
  },
  {
    id: 'modern-4',
    title: "The Elephants",
    artist: "Salvador Dalí",
    price: 2600,
    ratings: "4.8",
    img: "https://i.pinimg.com/originals/76/fd/93/76fd93dbf3d05a625aec7af8fdf148c0.jpg",
    description: "Surreal elephants with elongated legs march across a dreamlike landscape.",
    dimensions: "24 x 36 inches",
    medium: "Oil on canvas",
    frameStatus: "Not framed"
  },
  {
    id: 'modern-5',
    title: "Soul in Bloom",
    artist: "Anika Bose",
    price: 2950,
    ratings: "4.9",
    img: "https://static.vecteezy.com/system/resources/previews/022/154/516/large_2x/water-color-or-oil-painting-fine-art-illustration-of-abstract-close-up-colorful-nature-and-blooming-floral-flowers-print-digital-art-photo.jpg",
    description: "A vibrant, modern floral painting celebrating the colors and energy of spring.",
    dimensions: "20 x 28 inches",
    medium: "Watercolor on canvas",
    frameStatus: "Framed"
  },
  {
    id: 'modern-6',
    title: "Whispers of Spring",
    artist: "Tomás Ibarra",
    price: 2700,
    ratings: "4.5",
    img: "https://wallpaperaccess.com/full/2279238.jpg",
    description: "Soft pastel tones and abstract blossoms evoke the gentle arrival of spring.",
    dimensions: "18 x 24 inches",
    medium: "Acrylic on canvas",
    frameStatus: "Not framed"
  },
  {
    id: 'modern-7',
    title: "Floral Symphony",
    artist: "Andy Warhol",
    price: 2700,
    ratings: "4.8",
    img: "https://thumbs.dreamstime.com/b/floral-symphony-abstract-painting-featuring-multitude-flowers-swirling-colors-blend-harmonious-background-image-has-304602164.jpg",
    description: "A lively and colorful symphony of flowers in Warhol's iconic pop-art style.",
    dimensions: "24 x 36 inches",
    medium: "Acrylic on canvas",
    frameStatus: "Framed"
  },
  {
    id: 'modern-8',
    title: "Dusk Reverie",
    artist: "Hokusai",
    price: 2400,
    ratings: "4.9",
    img: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3f0f0d8c-eacc-48db-abd0-e7c953bbc059/dgja312-4a2fdef5-3cbf-48f1-9cab-de14f47e9b5e.png/v1/fill/w_1280,h_732,q_80,strp/dusk_reverie__anime_cafe_encounter_by_abdallahalswaiti_dgja312-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzNmMGYwZDhjLWVhY2MtNDhkYi1hYmQwLWU3Yzk1M2JiYzA1OVwvZGdqYTMxMi00YTJmZGVmNS0zY2JmLTQ4ZjEtOWNhYi1kZTE0ZjQ3ZTliNWUucG5nIiwiaGVpZ2h0IjoiPD03MzIiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC8zZjBmMGQ4Yy1lYWNjLTQ4ZGItYWJkMC1lN2M5NTNiYmMwNTlcL2FiZGFsbGFoYWxzd2FpdGktNC5wbmciLCJvcGFjaXR5Ijo5NSwicHJvcG9ydGlvbnMiOjAuNDUsImdyYXZpdHkiOiJjZW50ZXIifX0.a2SOhZuMkEcl6i3xQ9L58jk9P0OdzVCqN_o2_BsLB7g",
    description: "A dreamy, atmospheric scene at dusk, blending anime influences and modern abstraction.",
    dimensions: "18 x 24 inches",
    medium: "Digital painting",
    frameStatus: "Not framed"
  },
  {
    id: 'modern-9',
    title: "Crimson Horizon",
    artist: "Frida Kahlo",
    price: 2500,
    ratings: "4.7",
    img: "https://paintings.pinotspalette.com/crimson-horizon-tv.jpg?v=10026801",
    description: "A bold, modern landscape with a striking crimson sky and horizon.",
    dimensions: "20 x 28 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: 'modern-10',
    title: "Enchanted Silence",
    artist: "Jackson Pollock",
    price: 2400,
    ratings: "4.5",
    img: "https://i.pinimg.com/originals/f8/9f/a3/f89fa3316c37b3f2479d3301c0a09cd8.jpg",
    description: "Abstract patterns and textures create a mysterious, silent mood.",
    dimensions: "18 x 24 inches",
    medium: "Acrylic on canvas",
    frameStatus: "Not framed"
  },
  {
    id: 'modern-11',
    title: "Radiant Stillness",
    artist: "Jackson Pollock",
    price: 2800,
    ratings: "4.6",
    img: "https://wallpaperaccess.com/full/230569.jpg",
    description: "A modern study in light and stillness, rendered in radiant tones.",
    dimensions: "22 x 30 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: 'modern-12',
    title: "Water Lilies",
    artist: "Claude Monet",
    price: 2600,
    ratings: "4.9",
    img: "https://wallpaperbat.com/img/3585584-water-lily-wallpaper.jpg",
    description: "A modern homage to Monet's water lilies, with a fresh, digital twist.",
    dimensions: "20 x 28 inches",
    medium: "Digital painting",
    frameStatus: "Not framed"
  },
  {
    id: 'modern-13',
    title: "Echoes in Blue",
    artist: "Vincent van Gogh",
    price: 2800,
    ratings: "5.0",
    img: "https://img.uhdpaper.com/wallpaper/abstract-blue-wave-background-digital-art-486@0@f",
    description: "Blue waves and echoes ripple across this digital abstraction.",
    dimensions: "24 x 36 inches",
    medium: "Digital art",
    frameStatus: "Framed"
  },
  {
    id: 'modern-14',
    title: "Floral Fusion",
    artist: "Vincent van Gogh",
    price: 3100,
    ratings: "5.0",
    img: "https://www.pattern-designs.com/wp-content/uploads/2023/09/Floral_Fusion_Baroque_Blooms_PTN-003469.jpeg",
    description: "A fusion of baroque blooms and modern color palettes.",
    dimensions: "18 x 24 inches",
    medium: "Acrylic on canvas",
    frameStatus: "Framed"
  },
  {
    id: 'modern-15',
    title: "Mystical Nature",
    artist: "Ishita Sen",
    price: 1500,
    ratings: "4.2",
    img: "https://wallpaperaccess.com/full/1783834.jpg",
    description: "A mystical, abstracted landscape blending nature and fantasy.",
    dimensions: "20 x 28 inches",
    medium: "Acrylic on canvas",
    frameStatus: "Not framed"
  },
  {
    id: 'modern-16',
    title: "Mystic Lotus",
    artist: "Aishwarya Nair",
    price: 1650,
    ratings: "4.1",
    img: "https://1.bp.blogspot.com/-e5XtglgJOm8/ULhhKPmmLFI/AAAAAAAAAsM/ul9cbxH6pfE/s1600/lotus+flower+art+8.jpg",
    description: "A modern interpretation of the lotus flower, symbolizing purity and rebirth.",
    dimensions: "18 x 24 inches",
    medium: "Watercolor on paper",
    frameStatus: "Framed"
  },
  {
    id: 'modern-17',
    title: "Sacred Flow",
    artist: "Yayoi Kusama",
    price: 2300,
    ratings: "4.7",
    img: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/creative-flow-renee-sarasvati.jpg",
    description: "Flowing forms and sacred geometry in a vibrant, modern palette.",
    dimensions: "24 x 36 inches",
    medium: "Acrylic on canvas",
    frameStatus: "Not framed"
  },
  {
    id: 'modern-18',
    title: "Digital Bloom",
    artist: "Tariq El-Sayed",
    price: 2350,
    ratings: "4.7",
    img: "https://img.freepik.com/premium-photo/digital-painting-full-bloom-pappy-flower_1029473-372690.jpg",
    description: "A digital painting of a blooming poppy, bursting with color and life.",
    dimensions: "18 x 24 inches",
    medium: "Digital painting",
    frameStatus: "Not framed"
  },
  {
    id: 'modern-19',
    title: "Radha Krishna",
    artist: "M.F. Husain",
    price: 2550,
    ratings: "4.8",
    img: "https://as2.ftcdn.net/v2/jpg/05/59/20/99/1000_F_559209912_4Qew7SRpZFYR9sg4kqq2YHxBSQeT0VLg.jpg",
    description: "A modernist depiction of Radha and Krishna, blending tradition and abstraction.",
    dimensions: "20 x 28 inches",
    medium: "Mixed media on paper",
    frameStatus: "Framed"
  },
  {
    id: 'modern-20',
    title: "Vibrant Landscapes",
    artist: "Jamini Roy",
    price: 2650,
    ratings: "4.9",
    img: "https://images.joseartgallery.com/15000/conversions/landscape-painting-bright-colors-autumn-thumb1920.jpg",
    description: "A landscape painted in bright, bold colors, capturing the energy of nature.",
    dimensions: "24 x 36 inches",
    medium: "Acrylic on canvas",
    frameStatus: "Framed"
  },
  {
    id: 'modern-21',
    title: "Blossom Breeze",
    artist: "Anaya Iyer",
    price: 2550,
    ratings: "4.9",
    img: "https://i.pinimg.com/originals/2a/d3/8c/2ad38c04c419ff7e7ecc3f27d6987b1c.jpg",
    description: "A gentle breeze carries blossoms across this dreamy, modern floral painting.",
    dimensions: "18 x 24 inches",
    medium: "Watercolor on canvas",
    frameStatus: "Framed"
  }
],

  abstract : [
  {
    id: 'abstract-1',
    title: "Composition VII",
    artist: "Wassily Kandinsky",
    price: 2500,
    ratings: "4.8",
    img: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/study-for-composition-vii-by-wassily-kandinsky-1912-wassily-kandinsky.jpg",
    description: "A vibrant, energetic composition by Kandinsky, considered a masterpiece of abstract art.",
    dimensions: "24 x 36 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: 'abstract-2',
    title: "Lavender Mist",
    artist: "Jackson Pollock",
    price: 2200,
    ratings: "4.5",
    img: "https://paintingvalley.com/images/lavender-mist-painting-30.jpg",
    description: "Pollock's iconic drip painting, filled with swirling lavender tones and abstract forms.",
    dimensions: "22 x 30 inches",
    medium: "Enamel on canvas",
    frameStatus: "Not framed"
  },
  {
    id: 'abstract-3',
    title: "The Gate",
    artist: "Mark Rothko",
    price: 2400,
    ratings: "4.7",
    img: "https://www.artexpertswebsite.com/pages/uploads/artists/artists_a-k/hoffman/2.hofmann.jpg",
    description: "A meditative abstract with bold color fields and a sense of depth.",
    dimensions: "20 x 28 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: 'abstract-4',
    title: "Dreamscape Symphony",
    artist: "Kazimir Malevich",
    price: 1900,
    ratings: "4.3",
    img: "https://img.freepik.com/premium-photo/dreamscape-symphony-immerse-yourself-world-soft-dreamy-watercolor-paintings-where-every-brushstroke-narrates-captivating-tale_1135038-173.jpg",
    description: "Soft, dreamy watercolors create a symphonic abstract landscape.",
    dimensions: "18 x 24 inches",
    medium: "Watercolor on paper",
    frameStatus: "Not framed"
  },
  {
    id: 'abstract-5',
    title: "Convergence",
    artist: "Jackson Pollock",
    price: 2800,
    ratings: "4.9",
    img: "https://www.singulart.com/images/artworks/v2/cropped/20887/main/zoom/1802173_fe24b210a72aa239e781377f316a9983.jpeg",
    description: "A dynamic explosion of color and line in Pollock's signature style.",
    dimensions: "24 x 36 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: 'abstract-6',
    title: "Harmony in Chaos",
    artist: "Henri Matisse",
    price: 2300,
    ratings: "4.6",
    img: "https://media.artsper.com/artwork/208885_1_l.jpg",
    description: "Matisse explores the balance between order and disorder in this abstract piece.",
    dimensions: "20 x 28 inches",
    medium: "Acrylic on canvas",
    frameStatus: "Not framed"
  },
  {
    id: 'abstract-7',
    title: "Dreams in Blue",
    artist: "Henri Matisse",
    price: 2100,
    ratings: "4.4",
    img: "https://wallpaperaccess.com/full/2289563.jpg",
    description: "A calming abstract painting using various shades of blue to evoke a dreamlike state.",
    dimensions: "18 x 24 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: 'abstract-8',
    title: "Neon Horizon",
    artist: "Diego Rivera",
    price: 2600,
    ratings: "4.7",
    img: "https://tse1.mm.bing.net/th?id=OIP.tbQjgj3_zePh5s1ldhWuRQHaEo&pid=Api&P=0&h=180",
    description: "Bold neon colors create a striking, modern horizon in this abstract work.",
    dimensions: "22 x 30 inches",
    medium: "Acrylic on canvas",
    frameStatus: "Not framed"
  },
  {
    id: 'abstract-9',
    title: "Mural",
    artist: "Jackson Pollock",
    price: 3100,
    ratings: "4.8",
    img: "https://www.gannett-cdn.com/-mm-/1431032a906b2741a431eb45527fc4583785bf38/c=0-292-5616-3451/local/-/media/IowaCity/2015/01/12/B9315804495Z.1_20150112165150_000_G2P9KN8S8.1-0.jpg?width=3200&height=1680&fit=crop",
    description: "Pollock's large-scale mural, filled with energetic lines and vibrant color.",
    dimensions: "36 x 60 inches",
    medium: "Oil and casein on canvas",
    frameStatus: "Framed"
  },
  {
    id: 'abstract-10',
    title: "Optical Illusion",
    artist: "Marc Chagall",
    price: 2300,
    ratings: "4.5",
    img: "https://cdn.mos.cms.futurecdn.net/hm5ZyVyLzFeNUUQSa9XV8g.jpg",
    description: "A playful exploration of perception and illusion with geometric forms.",
    dimensions: "18 x 24 inches",
    medium: "Mixed media",
    frameStatus: "Not framed"
  },
  {
    id: 'abstract-11',
    title: "Chromatic Storm",
    artist: "Yves Klein",
    price: 1800,
    ratings: "4.2",
    img: "https://fydn.imgix.net/m/x1000/d1b664c3-b5c9-4ea0-a2d3-917447f486f2.jpg?q=75&auto=format,compress&dpr=1",
    description: "Vivid colors swirl together in a storm of chromatic energy.",
    dimensions: "20 x 28 inches",
    medium: "Acrylic on canvas",
    frameStatus: "Framed"
  },
  {
    id: 'abstract-12',
    title: "Magnetic Veil",
    artist: "Henri Matisse",
    price: 2700,
    ratings: "4.9",
    img: "https://images.squarespace-cdn.com/content/v1/5395e1ebe4b09ddb699bbce0/1729088208950-37IKZ5XVJYPKVEDM0JWF/AnaVic01+copy.jpg",
    description: "Layers of color and form create a magnetic, mysterious effect.",
    dimensions: "22 x 30 inches",
    medium: "Oil on canvas",
    frameStatus: "Not framed"
  },
  {
    id: 'abstract-13',
    title: "Color Fields",
    artist: "Henri Rousseau",
    price: 2200,
    ratings: "4.6",
    img: "https://www.boredart.com/wp-content/uploads/2016/08/Brilliant-Examples-Of-Color-Field-Paintings-12.jpg",
    description: "Large fields of color blend and contrast in this expressive abstract.",
    dimensions: "24 x 36 inches",
    medium: "Acrylic on canvas",
    frameStatus: "Framed"
  },
  {
    id: 'abstract-14',
    title: "Improvisation 28",
    artist: "Wassily Kandinsky",
    price: 2600,
    ratings: "4.7",
    img: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/improvisation-28-1912-vasily-kandinsky.jpg",
    description: "A lively, improvisational work filled with movement and color.",
    dimensions: "18 x 24 inches",
    medium: "Oil on canvas",
    frameStatus: "Not framed"
  },
  {
    id: 'abstract-15',
    title: "Visual Rhythm",
    artist: "Pablo Picasso",
    price: 3200,
    ratings: "5.0",
    img: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/rhythm-in-blues-lynda-lehmann.jpg",
    description: "Rhythmic lines and shapes create a visual symphony in this bold abstract.",
    dimensions: "20 x 28 inches",
    medium: "Acrylic on canvas",
    frameStatus: "Framed"
  },
  {
    id: 'abstract-16',
    title: "Transverse Line",
    artist: "Henri Matisse",
    price: 1500,
    ratings: "4.0",
    img: "https://www.vangoghstudio.com/Files/6/102000/102147/FileBrowser/paintings/transverse-line-wassily-kadinsky-reproduction.jpg",
    description: "A study in line and movement, rendered in a minimalist abstract style.",
    dimensions: "18 x 24 inches",
    medium: "Oil on canvas",
    frameStatus: "Not framed"
  },
  {
    id: 'abstract-17',
    title: "Composition VIII",
    artist: "Wassily Kandinsky",
    price: 1550,
    ratings: "4.1",
    img: "https://www.arthistoryproject.com/site/assets/files/12097/wassily_kandinsky-composition_6-1913-obelisk-art-history.webp",
    description: "Geometric forms and vibrant colors in Kandinsky's abstract masterpiece.",
    dimensions: "22 x 30 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: 'abstract-18',
    title: "Yellow-Red-Blue",
    artist: "Wassily Kandinsky",
    price: 2350,
    ratings: "4.6",
    img: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/5-yellow-red-blue-wassily-kandinsky.jpg",
    description: "A bold exploration of primary colors and abstract forms.",
    dimensions: "24 x 36 inches",
    medium: "Oil on canvas",
    frameStatus: "Not framed"
  },
  {
    id: 'abstract-19',
    title: "Fugue",
    artist: "Wassily Kandinsky",
    price: 2150,
    ratings: "4.4",
    img: "https://www.artmajeur.com/medias/hd/m/a/marc-trabys/artwork/16541974_fugue-en-sol-50x70-2012.jpg",
    description: "A musical, rhythmic abstraction inspired by the structure of a fugue.",
    dimensions: "18 x 24 inches",
    medium: "Acrylic on canvas",
    frameStatus: "Framed"
  },
  {
    id: 'abstract-20',
    title: "Dynamic Suprematism",
    artist: "James Abbott McNeill Whistler",
    price: 1950,
    ratings: "4.3",
    img: "https://www.creativefabrica.com/wp-content/uploads/2023/03/23/Suprematism-Kazimir-Malevich-Pointilism-Claude-Monet-Painting-Graphic-65130187-1.png",
    description: "Dynamic geometric forms and bold color in a suprematist style.",
    dimensions: "20 x 28 inches",
    medium: "Oil on canvas",
    frameStatus: "Not framed"
  },
  {
    id: 'abstract-21',
    title: "Sea and Red",
    artist: "Mark Rothko",
    price: 2650,
    ratings: "4.7",
    img: "https://tse4.mm.bing.net/th?id=OIP.w6AeCAdsfZphZCV0ftI-2wHaEo&pid=Api&P=0&h=180",
    description: "Rothko's signature color fields with a striking red and blue contrast.",
    dimensions: "24 x 36 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  }
],

  realism : [
  {
    id: "realism-1",
    title: "Ploughing in the Nivernais",
    artist: "Jean-François Millet",
    price: 2300,
    ratings: "4.7",
    img: "https://rehs.com/catalogimages/vhistory/auguste_bonheur_plowing_in_the_nivernais.jpg",
    description: "A detailed depiction of rural life showing farmers ploughing fields in the Nivernais region.",
    dimensions: "24 x 36 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: "realism-2",
    title: "Interior with Woman Sewing",
    artist: "Gustave Courbet",
    price: 2000,
    ratings: "4.5",
    img: "https://paintingvalley.com/images/woman-sewing-painting-1.jpg",
    description: "An intimate interior scene featuring a woman sewing, capturing everyday life.",
    dimensions: "20 x 28 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: "realism-3",
    title: "The Iron Rolling Mill",
    artist: "Édouard Manet",
    price: 2500,
    ratings: "4.8",
    img: "https://www.dailyartmagazine.com/wp-content/uploads/2021/10/16113100809_42b94922c6_o.jpg",
    description: "A powerful industrial scene depicting workers in a rolling mill.",
    dimensions: "30 x 40 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: "realism-4",
    title: "The Raft of the Medusa",
    artist: "Théodore Géricault",
    price: 2700,
    ratings: "4.9",
    img: "https://www.allvisualarts.org/UserFiles/Image/6088_lb1024x768.jpg?4",
    description: "A dramatic and emotional portrayal of shipwreck survivors on a raft.",
    dimensions: "36 x 48 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: "realism-5",
    title: "Edge of the Forest",
    artist: "Jean-François Millet",
    price: 2100,
    ratings: "4.6",
    img: "https://i.ytimg.com/vi/79EC8lsFMhM/maxresdefault.jpg",
    description: "A serene landscape showing the edge of a forest with natural light.",
    dimensions: "24 x 30 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: "realism-6",
    title: "The Sermon",
    artist: "Sandro Botticelli",
    price: 2900,
    ratings: "5.0",
    img: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/sermon-on-the-mount-celestial-images.jpg",
    description: "A religious scene depicting a sermon with detailed figures and expressions.",
    dimensions: "28 x 36 inches",
    medium: "Tempera on panel",
    frameStatus: "Framed"
  },
  {
    id: "realism-7",
    title: "The Last Supper",
    artist: "Leonardo da Vinci",
    price: 3100,
    ratings: "5.0",
    img: "https://img.freepik.com/premium-photo/last-supper-painting-by-christian-art_888396-3076.jpg?w=900",
    description: "Leonardo da Vinci's iconic depiction of the Last Supper of Jesus with his disciples.",
    dimensions: "29 x 45 feet",
    medium: "Tempera and oil on plaster",
    frameStatus: "Framed"
  },
  {
    id: "realism-8",
    title: "Harvesters Resting",
    artist: "Jan van Eyck",
    price: 2400,
    ratings: "4.7",
    img: "https://m.media-amazon.com/images/I/81jT21nUp8L._AC_SX679_.jpg",
    description: "A detailed scene of harvesters taking a break in a lush field.",
    dimensions: "22 x 30 inches",
    medium: "Oil on panel",
    frameStatus: "Framed"
  },
  {
    id: "realism-9",
    title: "The Barge Haulers",
    artist: "Eugène Delacroix",
    price: 2200,
    ratings: "4.6",
    img: "https://cdna.artstation.com/p/assets/images/images/033/033/528/large/jinrui-liang-faaa.jpg?1608196341",
    description: "A powerful depiction of laborers hauling a barge along a river.",
    dimensions: "24 x 36 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: "realism-10",
    title: "Las Meninas",
    artist: "Diego Velázquez",
    price: 2600,
    ratings: "4.9",
    img: "https://cdn.thecollector.com/wp-content/uploads/2020/04/las-meninas-painting-by-diego-velazquez-prado.jpg",
    description: "Velázquez's masterpiece depicting the Spanish royal family in a complex composition.",
    dimensions: "30 x 40 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: "realism-11",
    title: "The Fighting Temeraire",
    artist: "J.M.W. Turner",
    price: 2300,
    ratings: "4.7",
    img: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/the-fighting-temeraire-thames-1858-joseph-mallord-william-turner.jpg",
    description: "A nostalgic painting of a warship being towed to its final berth.",
    dimensions: "24 x 36 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: "realism-12",
    title: "Wanderer Above the Sea of Fog",
    artist: "Caspar David Friedrich",
    price: 2200,
    ratings: "4.6",
    img: "https://paintingvalley.com/images/wanderer-above-the-sea-of-fog-painting-33.jpg",
    description: "A romantic painting of a man standing above a foggy landscape, contemplating nature.",
    dimensions: "20 x 28 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: "realism-13",
    title: "The Hay Wain",
    artist: "John Constable",
    price: 1900,
    ratings: "4.4",
    img: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/the-hay-wain-john-constable-1821-john-constable.jpg",
    description: "A peaceful rural scene with a horse-drawn cart crossing a river.",
    dimensions: "24 x 30 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: "realism-14",
    title: "Toilers of the Sea",
    artist: "Johannes Vermeer",
    price: 2500,
    ratings: "4.2",
    img: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/toilers-of-the-sea-william-orchardson.jpg",
    description: "A detailed painting of workers at sea, capturing the hardships of labor.",
    dimensions: "22 x 30 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: "realism-15",
    title: "Nocturne in Black and Gold",
    artist: "Johannes Vermeer",
    price: 2800,
    ratings: "5.0",
    img: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/nocturne-in-black-and-gold-the-falling-rocket-1875-james-abbott-mcneill-whistler.jpg",
    description: "A dramatic night scene with fireworks, blending realism and impressionism.",
    dimensions: "24 x 36 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: "realism-16",
    title: "Forest Path",
    artist: "Nature Artist",
    price: 1500,
    ratings: "4.8",
    img: "https://wallup.net/wp-content/uploads/2017/03/15/85878-painting-path-forest-sunlight-trees-Graham_Gercken.jpg",
    description: "A peaceful forest path bathed in sunlight, inviting the viewer to wander.",
    dimensions: "20 x 28 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: "realism-17",
    title: "Mountain View",
    artist: "Landscape Specialist",
    price: 1600,
    ratings: "4.1",
    img: "https://i.ytimg.com/vi/ZuL7jIQHU_o/maxresdefault.jpg",
    description: "A majestic mountain landscape with detailed natural elements.",
    dimensions: "24 x 36 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: "realism-18",
    title: "Snap the Whip",
    artist: "John Singer Sargent",
    price: 2250,
    ratings: "4.5",
    img: "https://cdn2.oceansbridge.com/2017/07/28014540/Snap-the-Whip-1872-Homer-Winslow-Oil-Painting.jpg",
    description: "A lively scene of children playing, capturing motion and joy.",
    dimensions: "24 x 30 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: "realism-19",
    title: "The Song of the Lark",
    artist: "Ilya Repin",
    price: 2400,
    ratings: "4.6",
    img: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/3-the-song-of-the-lark-sophie-anderson.jpg",
    description: "A rural scene depicting a young woman listening to the song of a lark.",
    dimensions: "20 x 28 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: "realism-20",
    title: "A Burial at Ornans",
    artist: "Édouard Manet",
    price: 2150,
    ratings: "4.7",
    img: "https://imgc.allpostersimages.com/img/posters/burial-at-ornans-un-enterrement-a-ornans_u-L-Q1J917O0.jpg?artHeight=550&artPerspective=n&artWidth=550&background=fbfbfb",
    description: "A realistic depiction of a funeral in a small French town.",
    dimensions: "30 x 40 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  },
  {
    id: "realism-21",
    title: "The Woodcutters",
    artist: "Jean-François Millet",
    price: 2550,
    ratings: "4.7",
    img: "https://cdn2.oceansbridge.com/2019/02/12104720/The-Woodcutter-Thomas-Falcon-Marshall-Oil-Painting.jpg",
    description: "A detailed scene of woodcutters at work in a forest.",
    dimensions: "24 x 36 inches",
    medium: "Oil on canvas",
    frameStatus: "Framed"
  }
],

  digital : [
  {
    id: 'digital-1',
    title: "Holographic Sunset",
    artist: "Beeple",
    price: 1900,
    ratings: "4.8",
    img: "https://img.freepik.com/premium-photo/holographic-retro-vaporwave-sunset-reflection-painting_706399-33414.jpg",
    description: "A mesmerizing digital sunset in holographic retro colors, evoking a vaporwave dream.",
    dimensions: "1920 x 1080 px",
    medium: "Digital painting",
    frameStatus: "Not framed"
  },
  {
    id: 'digital-2',
    title: "Virtual Garden",
    artist: "Beeple",
    price: 2300,
    ratings: "4.1",
    img: "https://wallpapercave.com/wp/wp3309947.png",
    description: "A lush, futuristic garden rendered in vibrant digital hues.",
    dimensions: "1920 x 1080 px",
    medium: "Digital illustration",
    frameStatus: "Not framed"
  },
  {
    id: 'digital-3',
    title: "Neon Galaxy",
    artist: "Beeple",
    price: 2000,
    ratings: "4.7",
    img: "https://static.vecteezy.com/system/resources/previews/022/263/279/large_2x/abstract-outer-space-endless-nebula-galaxy-background-with-clouds-and-neon-lighting-in-the-sky-generative-ai-free-photo.jpg",
    description: "A swirling galaxy illuminated by neon lights and cosmic clouds.",
    dimensions: "1920 x 1080 px",
    medium: "Digital art",
    frameStatus: "Not framed"
  },
  {
    id: 'digital-4',
    title: "Mars 2020",
    artist: "Beeple",
    price: 2200,
    ratings: "4.0",
    img: "https://paintingvalley.com/images/mars-painting-8.JPG",
    description: "A futuristic vision of Mars, blending science fiction and digital realism.",
    dimensions: "1920 x 1080 px",
    medium: "Digital painting",
    frameStatus: "Not framed"
  },
  {
    id: 'digital-5',
    title: "Pixel Dreams",
    artist: "Beeple",
    price: 2500,
    ratings: "4.9",
    img: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/039527cc-8821-4826-ad9d-5e3d555138a8/deelrzp-272c43c1-df9e-4742-a273-9af580e05a1a.png/v1/fill/w_894,h_894,q_70,strp/pixel_art___dream_by_silverxxiii_deelrzp-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcLzAzOTUyN2NjLTg4MjEtNDgyNi1hZDlkLTVlM2Q1NTUxMzhhOFwvZGVlbHJ6cC0yNzJjNDNjMS1kZjllLTQ3NDItYTI3My05YWY1ODBlMDVhMWEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.wxfZIwdWnUAHgJ4Tj0liLqm4unNXfNw5b5Ix0vtPclk",
    description: "A dreamy, vibrant, pixelated vision of a digital landscape.",
    dimensions: "1024 x 1024 px",
    medium: "Pixel art",
    frameStatus: "Not framed"
  },
  {
    id: 'digital-6',
    title: "Solaris",
    artist: "AlienBrush",
    price: 3100,
    ratings: "4.8",
    img: "https://paintingvalley.com/images/solaris-painting-23.jpg",
    description: "A cosmic digital painting inspired by the mysteries of Solaris.",
    dimensions: "1920 x 1080 px",
    medium: "Digital painting",
    frameStatus: "Framed"
  },
  {
    id: 'digital-7',
    title: "Cyber Fog",
    artist: "NeoSoul",
    price: 3300,
    ratings: "4.7",
    img: "https://images.hdqwalls.com/wallpapers/cyber-futuristic-city-fantasy-art-4k-da.jpg",
    description: "A futuristic city shrouded in mysterious glowing neon-lit cyber fog.",
    dimensions: "3840 x 2160 px",
    medium: "Digital art",
    frameStatus: "Framed"
  },
  {
    id: 'digital-8',
    title: "Neon River",
    artist: "GlowCraft",
    price: 3200,
    ratings: "4.0",
    img: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/neon-river-brezabelle.jpg",
    description: "A glowing river of neon colors flows through a digital landscape.",
    dimensions: "1920 x 1080 px",
    medium: "Digital painting",
    frameStatus: "Not framed"
  },
  {
    id: 'digital-9',
    title: "Virtual Skyline",
    artist: "Tim Berners-Lee",
    price: 2300,
    ratings: "4.5",
    img: "https://www.creativefabrica.com/wp-content/uploads/2023/05/10/Abstract-Chicago-Skyline-Painting-69355425-1.png",
    description: "A stylized digital skyline inspired by modern architecture and technology.",
    dimensions: "1920 x 1080 px",
    medium: "Digital illustration",
    frameStatus: "Not framed"
  },
  {
    id: 'digital-10',
    title: "Synthetic Cubism and Multifaceted Portrait",
    artist: "Meta",
    price: 2100,
    ratings: "4.4",
    img: "https://www.cubismartwork.com/wp-content/uploads/2023/09/synthetic-cubism-multifaceted-portrait-2.jpg",
    description: "A digital portrait blending cubist geometry and modern abstraction.",
    dimensions: "1920 x 1080 px",
    medium: "Digital painting",
    frameStatus: "Not framed"
  },
  {
    id: 'digital-11',
    title: "Binary Forest",
    artist: "CodeArt",
    price: 1800,
    ratings: "4.2",
    img: "https://img.freepik.com/premium-photo/digital-illustration-forest-with-lines-binary-code-falling_36682-92950.jpg?w=2000",
    description: "A forest of code, where binary numbers rain down over digital trees.",
    dimensions: "1920 x 1080 px",
    medium: "Digital illustration",
    frameStatus: "Not framed"
  },
  {
    id: 'digital-12',
    title: "Techno Rain",
    artist: "DigitalArtist",
    price: 2400,
    ratings: "4.7",
    img: "https://wallpaperaccess.com/full/754019.jpg",
    description: "A rainy cityscape glowing with techno-inspired neon lights.",
    dimensions: "1920 x 1080 px",
    medium: "Digital painting",
    frameStatus: "Framed"
  },
  {
    id: 'digital-13',
    title: "Revolutions",
    artist: "Cybernetic Art",
    price: 2600,
    ratings: "4.8",
    img: "https://getwallpapers.com/wallpaper/full/6/f/a/325659.jpg",
    description: "A dynamic swirl of digital revolutions and abstract futuristic forms.",
    dimensions: "1920 x 1080 px",
    medium: "Digital art",
    frameStatus: "Framed"
  },
  {
    id: 'digital-14',
    title: "Synthwave Dreams",
    artist: "Digital Visionaries",
    price: 2300,
    ratings: "4.5",
    img: "https://cdna.artstation.com/p/assets/images/images/054/716/264/large/brian-cosmos-synthwave-freelance-digital-painting-f94d9079-36a1-4818-b1cf-31b566da65ec.jpg?1665180531",
    description: "A retro synthwave landscape blending nostalgia and digital fantasy.",
    dimensions: "1920 x 1080 px",
    medium: "Digital painting",
    frameStatus: "Not framed"
  },
  {
    id: 'digital-15',
    title: "Fractal Dimensions",
    artist: "MathVision",
    price: 2000,
    ratings: "4.7",
    img: "https://wallpaperaccess.com/full/1878767.jpg",
    description: "A mesmerizing journey through fractal geometry and infinite patterns.",
    dimensions: "1920 x 1080 px",
    medium: "Digital fractal art",
    frameStatus: "Not framed"
  },
  {
    id: 'digital-16',
    title: "Glitch in Reality",
    artist: "Student Artist",
    price: 1500,
    ratings: "4.0",
    img: "https://www.creativefabrica.com/wp-content/uploads/2023/08/23/Glitch-Painting-Abstract-Seamless-Pattern-77513098-1.png",
    description: "A playful take on digital glitches, blending abstraction and technology.",
    dimensions: "1920 x 1080 px",
    medium: "Digital painting",
    frameStatus: "Not framed"
  },
  {
    id: 'digital-17',
    title: "Nano Universe",
    artist: "Atomic Pixel",
    price: 1550,
    ratings: "4.1",
    img: "https://i.pinimg.com/originals/18/01/d6/1801d68a2caa54cc3b254b7b159a49f7.jpg",
    description: "A cosmic digital art piece exploring the universe at the nano scale.",
    dimensions: "1920 x 1080 px",
    medium: "Digital art",
    frameStatus: "Not framed"
  },
  {
    id: 'digital-18',
    title: "Encrypted Skies",
    artist: "Sky Coder",
    price: 2050,
    ratings: "4.4",
    img: "https://hdqwalls.com/wallpapers/sky-painting-mountains-landscape-4k-6a.jpg",
    description: "A digital sky filled with encrypted patterns and mysterious landscapes.",
    dimensions: "3840 x 2160 px",
    medium: "Digital painting",
    frameStatus: "Not framed"
  },
  {
    id: 'digital-19',
    title: "Neo Tokyo",
    artist: "Synth Artist",
    price: 1850,
    ratings: "4.3",
    img: "https://wallpaperaccess.com/full/112570.jpg",
    description: "A futuristic vision of Tokyo, glowing with neon lights and cyberpunk energy.",
    dimensions: "3840 x 2160 px",
    medium: "Digital painting",
    frameStatus: "Framed"
  },
  {
    id: 'digital-20',
    title: "Fragmented Reality",
    artist: "Genetic Brush",
    price: 2250,
    ratings: "4.5",
    img: "https://img.clipart-library.com/24/f447bad0-2bef-458e-b683-682e6518567d.png",
    description: "A digital abstraction exploring the fragmentation of modern reality.",
    dimensions: "1920 x 1080 px",
    medium: "Digital art",
    frameStatus: "Not framed"
  },
  {
    id: 'digital-21',
    title: "Cyber Bloom",
    artist: "Digital Flora",
    price: 2200,
    ratings: "4.6",
    img: "https://images.hdqwalls.com/wallpapers/apophysis-bloom-flower-digital-art-at.jpg",
    description: "A vibrant digital flower blooming gracefully in a lush cybernetic garden.",
    dimensions: "1920 x 1080 px",
    medium: "Digital painting",
    frameStatus: "Framed"
  }
],

};
const categories = Object.keys(staticArtData);


const ArtworksPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const filteredArtworks =
    selectedCategory === 'all'
      ? Object.values(staticArtData).flat()
      : staticArtData[selectedCategory] || [];

  // Load wishlist on component mount
  useEffect(() => {
  const loadWishlist = async () => {
    if (token) {
      try {
        const response = await axios.get('https://art-gallery-backend-2-oemw.onrender.com/api/wishlist', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Always expect { wishlist: [...] }
        const wishlistData = Array.isArray(response.data.wishlist) ? response.data.wishlist : [];
        setWishlist(wishlistData);
        sessionStorage.setItem('wishlist', JSON.stringify(wishlistData));
      } catch (error) {
        setWishlist([]);
        sessionStorage.removeItem('wishlist');
      }
    } else {
      // For guests, load from sessionStorage
      const sessionWishlist = sessionStorage.getItem('wishlist');
      setWishlist(sessionWishlist ? JSON.parse(sessionWishlist) : []);
    }
  };

  const loadCart = async () => {
    if (token) {
      try {
        const response = await axios.get('https://art-gallery-backend-2-oemw.onrender.com/api/cart', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Always expect { cart: [...] }
        const cartData = Array.isArray(response.data.cart) ? response.data.cart : [];
        setCart(cartData);
        sessionStorage.setItem('cart', JSON.stringify(cartData));
      } catch (error) {
        setCart([]);
        sessionStorage.removeItem('cart');
      }
    } else {
      // For guests, load from sessionStorage
      const sessionCart = sessionStorage.getItem('cart');
      setCart(sessionCart ? JSON.parse(sessionCart) : []);
    }
  };

  loadWishlist();
  loadCart();
}, [token]);

      
  const handleWishlistToggle = async (art) => {
    if (!token) {
      alert('Please login to manage your wishlist');
      navigate('/');
      return;
    }

    try {
      const response = await axios.post(
        'https://art-gallery-backend-2-oemw.onrender.com/api/wishlist', 
        { artwork: art },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
    
      let updatedWishlist = [];
      
      if (Array.isArray(response.data)) {
        updatedWishlist = response.data;
      } else if (response.data && Array.isArray(response.data.wishlist)) {
        updatedWishlist = response.data.wishlist;
      }
      
      setWishlist(updatedWishlist);
      sessionStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

    } catch (error) {
      console.error('Error updating wishlist:', error);
      alert(error.response?.data?.message || 'Failed to update wishlist');
    }
  };
  // alert(`${artwork.title} added to cart!`);
  // Add to cart (
 const addToCart = async (artwork) => {
  if (!token) {
    // Guest logic as before
    const sessionCart = sessionStorage.getItem('cart');
    let currentCart = sessionCart ? JSON.parse(sessionCart) : [];
    if (!currentCart.some(item => item.id === artwork.id)) {
      const newCart = [...currentCart, artwork];
      sessionStorage.setItem('cart', JSON.stringify(newCart));
      setCart(newCart);
      
    
    } else {
      alert('Already in cart!');
    }
  } else {
    try {
      const response = await axios.post('https://art-gallery-backend-2-oemw.onrender.com/api/cart',
        { artwork },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // After successful add, reload cart from backend
      const cartRes = await axios.get('https://art-gallery-backend-2-oemw.onrender.com/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const cartData = Array.isArray(cartRes.data.cart) ? cartRes.data.cart : [];
      setCart(cartData);
      sessionStorage.setItem('cart', JSON.stringify(cartData));
      
    } catch (error) {
      alert('Error adding item to cart');
    }
  }
};



  // Navigation functions
  const handleclick = () => navigate('/');
  const aboutUs = () => navigate('/about');
  const artists = () => navigate('/artists');
  const navigateToArtworks = () => navigate('/artworks');
  const navigateToWishlist = () => navigate('/wishlist');
  const navigateToCart = () => navigate('/cart');
  const navigateToContact = () => navigate('/contact');
  const navigateToHome = () => navigate('/');
  const navigationToOrders = () => navigate('/orders');

  // Safe check if wishlist is an array before using .length
  const wishlistCount = Array.isArray(wishlist) ? wishlist.length : 0;
  const cartCount = Array.isArray(cart) ? cart.length : 0;

  return (
    <div className="artworks-page">
      <nav className="navbar glass-navbar">
        <div className="navbar-left" onClick={handleclick}>
          <span className="logo">🎨 Artistry</span>
        </div>
        <div className="navbar-center">
          <a onClick={handleclick}>Home</a>
          <a onClick={aboutUs}>About Us</a>
          <a onClick={artists}>Artists</a>
          <a onClick={navigateToArtworks}>ArtWorks</a>
          <a onClick={navigationToOrders}>My Orders</a>
          <a onClick={navigateToContact}>Contact</a>
          <a onClick={navigateToHome}>Logout</a>
        </div>
        <div className="navbar-right">
          <button className="icon-btn" onClick={navigateToWishlist} title="Wishlist">
            <FaHeart color={wishlistCount > 0 ? "#fff" : "#fff"} size={22} />
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </button>
          <button className="icon-btn" onClick={navigateToCart} title="Cart">
            <FaShoppingCart color={cartCount > 0 ? "#fff" : "#fff"} size={22} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
        </div>
      </nav>

      <div className="filter-buttons">
        <button
          className={selectedCategory === 'all' ? 'active ripple' : 'ripple'}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? 'active ripple' : 'ripple'}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

<div className="artworks-container">
  {filteredArtworks.length === 0 ? (
    <p>No artworks found in this category</p>
  ) : (
    filteredArtworks.map((art, idx) => (
      <div
        key={art.id}
        className="art-card"
        style={{ animationDelay: `${idx * 0.06}s` }}
      >
        <img
          src={art.img}
          alt={art.title}
          className="art-image"
          onError={(e) => (e.target.src = '/api/placeholder/300/180?text=Image+Not+Available')}
        />
        <h4 className="art-title">{art.title}</h4>
        <p className="art-artist" style={{ fontStyle: 'italic', color: '#666' }}>{art.artist}</p>
        {art.description && (
          <p className="art-desc" style={{ margin: '8px 0', color: '#444' }}>
            {art.description}
          </p>
        )}
        <div className="art-details" style={{ margin: '8px 0', fontSize: '0.95em', color: '#333' }}>
          {art.dimensions && (
            <div>
            <span style={{ color: "#000", fontWeight: 400 }}>Dimensions:</span> {art.dimensions}
            </div>
          )}
          {art.medium && (
            <div>
            <span style={{ color: "#000", fontWeight: 400 }}>Medium:</span> {art.medium}
            </div>

          )}
          {art.frameStatus && (
             <div>
             <span style={{ color: "#000", fontWeight: 400 }}>Frame:</span> {art.frameStatus}
             </div>
          )}
        </div>
        <div className="art-meta" style={{ margin: '10px 0 6px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="price" style={{ fontWeight: 'bold', fontSize: '1.1em', color: '#2d3436' }}>
            ₹{art.price}
          </span>
          <span className="ratings" style={{ color: '#e17055', fontWeight: '500' }}>
            {art.ratings} <span role="img" aria-label="star">⭐</span>
          </span>
        </div>
        <div className="card-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <button
            onClick={() => handleWishlistToggle(art)}
             className={`like-btn ${Array.isArray(wishlist) && wishlist.some(item => item?.id === art.id) ? 'liked' : ''}`}
            aria-label="Like"
            title="Like"
          >
            {Array.isArray(wishlist) && wishlist.some(item => item && item.id === art.id)
              ? (
                <>
                  <FaHeart color='#e17055' size={18} className="pop" style={{ marginRight: 6, verticalAlign: 'middle' }} />
                  <span style={{ color: '#e17055', fontWeight: 500 }}>Liked</span>
                </>
              )
              : (
                <>
                  <FaRegHeart color="#e17055" size={18} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                  <span style={{ color: '#e17055', fontWeight: 500 }}>Like</span>
                </>
              )
            }
          </button>
        <button
  onClick={() => addToCart(art)}
  className={`add-cart-btn ${Array.isArray(cart) && cart.some(item => item?.id === art.id) ? 'added' : ''}`}
  aria-label={Array.isArray(cart) && cart.some(item => item?.id === art.id) ? 'Added to Cart' : 'Add to Cart'}
  title={Array.isArray(cart) && cart.some(item => item?.id === art.id) ? 'Added to Cart' : 'Add to Cart'}
  disabled={Array.isArray(cart) && cart.some(item => item?.id === art.id)}
>
  {Array.isArray(cart) && cart.some(item => item?.id === art.id) ? (
    <>
      <FaShoppingCart size={18} style={{ marginRight: 6, verticalAlign: 'middle' }} />
      <span>Added to Cart</span>
    </>
  ) : (
    <>
      <FaShoppingCart size={18} style={{ marginRight: 6, verticalAlign: 'middle' }} />
      <span>Add to Cart</span>
    </>
  )}
</button>
        </div>
      </div>
    ))
  )}
</div>


    </div>
  );
};

export default ArtworksPage;