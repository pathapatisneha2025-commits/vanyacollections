import React from 'react';

const InstagramGallery = () => {
  const instagramPosts = [
    { id: 1, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=400", link: "https://instagram.com" },
    { id: 2, image: "/silksaree.jpg", link: "https://instagram.com" },
    { id: 3, image: "/normalsaree.jpg", link: "https://instagram.com" },
    { id: 4, image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=400", link: "https://instagram.com" },
    { id: 5, image: "/festivalsaree.jpg", link: "https://instagram.com" },
    { id: 6, image: "/designersaree.jpg", link: "https://instagram.com" }
  ];

  return (
    <section className="insta-section">
      <div className="insta-container">
        <div className="insta-header">
          <p className="insta-tagline">✦ FOLLOW US ON INSTAGRAM ✦</p>
          <h2 className="insta-handle">@vanyacollections</h2>
          <div className="title-underline"></div>
        </div>

        <div className="insta-grid">
          {instagramPosts.map((post) => (
            <a 
              key={post.id} 
              href={post.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="insta-card"
            >
              <img src={post.image} alt="Saree Style" className="insta-img" />
              <div className="insta-overlay">
                <div className="insta-icon-circle">
                  <span>📷</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

          .insta-section {
            padding: 90px 20px;
            background: linear-gradient(135deg, #fbf5fc 0%, #f4ebf7 100%);
            font-family: 'Montserrat', sans-serif;
          }
          
          .insta-container {
            max-width: 1300px;
            margin: 0 auto;
            text-align: center;
          }

          .insta-header { 
            margin-bottom: 45px; 
          }

          .insta-tagline { 
            color: #d4af37; /* Brand Gold */
            font-size: 12px; 
            letter-spacing: 4px; 
            font-weight: 600; 
            text-transform: uppercase;
            margin-bottom: 10px;
          }

          .insta-handle { 
            font-size: clamp(2.2rem, 3.8vw, 3.2rem); 
            color: #522b5b; /* Rich Royal Purple */
            font-family: 'Playfair Display', serif; 
            font-weight: 600;
            margin: 0 0 15px 0;
          }

          .title-underline {
            width: 70px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #d4af37, transparent);
            margin: 0 auto;
          }

          .insta-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 20px;
          }

          .insta-card {
            position: relative;
            border-radius: 16px;
            overflow: hidden;
            aspect-ratio: 1 / 1.3;
            box-shadow: 0 8px 25px rgba(82, 43, 91, 0.08);
            border: 1px solid rgba(212, 175, 55, 0.25);
            display: block;
            transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          }

          /* Luxurious Purple Highlighter Hover Effect matching theme */
          .insta-card:hover {
            transform: translateY(-6px);
            border-color: #8c4a9e !important;
            box-shadow: 0 18px 40px rgba(82, 43, 91, 0.22), 0 0 25px rgba(140, 74, 158, 0.35) !important;
          }

          .insta-img { 
            width: 100%; 
            height: 100%; 
            object-fit: cover; 
            transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1); 
          }

          .insta-card:hover .insta-img { 
            transform: scale(1.08); 
          }

          .insta-overlay {
            position: absolute; 
            inset: 0; 
            background: linear-gradient(to top, rgba(45, 18, 51, 0.75) 0%, rgba(45, 18, 51, 0.2) 100%);
            backdrop-filter: blur(2px);
            display: flex; 
            align-items: center; 
            justify-content: center;
            opacity: 0; 
            transition: opacity 0.3s ease; 
          }

          .insta-icon-circle {
            width: 46px;
            height: 46px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            transform: scale(0.8);
            transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
          }

          .insta-card:hover .insta-overlay { 
            opacity: 1; 
          }

          .insta-card:hover .insta-icon-circle {
            transform: scale(1);
          }

          /* Responsive adjustments */
          @media (max-width: 1024px) {
            .insta-grid { grid-template-columns: repeat(3, 1fr); gap: 15px; }
            .insta-section { padding: 60px 15px; }
          }

          @media (max-width: 640px) {
            .insta-grid { grid-template-columns: repeat(2, 1fr); }
          }
        `}
      </style>
    </section>
  );
};

export default InstagramGallery;