import React from 'react';

const InstagramGallery = () => {
  const instagramPosts = [
    { id: 1, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=400" },
    { id: 2, image: "/silksaree.jpg" },
    { id: 3, image: "/normalsaree.jpg" },
    { id: 4, image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=400" },
    { id: 5, image: "/festivalsaree.jpg" },
    { id: 6, image: "/designersaree.jpg" }
  ];

  return (
    <section className="insta-section">
      <div className="insta-container">
        <div className="insta-header">
          <p className="insta-tagline">FOLLOW US ON INSTAGRAM</p>
          <h2 className="insta-handle">@vanyacollections</h2>
        </div>

        <div className="insta-grid">
          {instagramPosts.map((post) => (
            <div key={post.id} className="insta-card">
              <img src={post.image} alt="Saree Style" className="insta-img" />
              <div className="insta-overlay"><span>❤</span></div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .insta-section {
            padding: 80px 5%;
            /* Subtle soft cream background to match 'About' storytelling vibe */
            background-color: #fcf9f4; 
          }
          
          .insta-container {
            max-width: 1200px;
            margin: 0 auto;
            text-align: center;
          }

          .insta-header { 
            margin-bottom: 50px; 
          }

          .insta-tagline { 
            color: #c4a46a; /* Muted Gold */
            font-size: 12px; 
            letter-spacing: 4px; 
            font-weight: 600; 
            text-transform: uppercase;
            margin-bottom: 8px;
          }

          .insta-handle { 
            font-size: clamp(32px, 5vw, 48px); 
            color: #1a1a1a; 
            font-family: 'Playfair Display', serif; 
            font-weight: 400;
            margin-top: 0;
          }

          .insta-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 15px;
          }

          .insta-card {
            position: relative;
            border-radius: 8px;
            overflow: hidden;
            aspect-ratio: 1 / 1.3; /* Taller cards to match the screenshot style */
          }

          .insta-img { 
            width: 100%; 
            height: 100%; 
            object-fit: cover; 
            transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1); 
          }

          .insta-card:hover .insta-img { 
            transform: scale(1.1); 
          }

          .insta-overlay {
            position: absolute; 
            inset: 0; 
            background: rgba(0,0,0,0.15);
            display: flex; 
            align-items: center; 
            justify-content: center;
            opacity: 0; 
            transition: 0.3s; 
            color: white; 
            font-size: 24px;
          }

          .insta-card:hover .insta-overlay { 
            opacity: 1; 
          }

          /* Responsive adjustments */
          @media (max-width: 1024px) {
            .insta-grid { grid-template-columns: repeat(3, 1fr); }
            .insta-section { padding: 50px 20px; }
          }

          @media (max-width: 640px) {
            .insta-grid { grid-template-columns: repeat(2, 1fr); }
            .insta-handle { font-size: 28px; }
          }
        `}
      </style>
    </section>
  );
};

export default InstagramGallery;