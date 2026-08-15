import React from 'react';

const VanyaCta = () => {
  const promises = [
    {
      icon: '🧵',
      title: 'Pure Handwoven',
      desc: 'Authentic weaves'
    },
    {
      icon: '🌿',
      title: 'Ethically Sourced',
      desc: 'Fair trade certified'
    },
    {
      icon: '📦',
      title: 'Luxury Packaging',
      desc: 'Gift-ready always'
    },
    {
      icon: '✨',
      title: 'Easy Returns',
      desc: '30-day policy'
    }
  ];

  return (
    <section className="vanya-section">
      <div className="vanya-container">
        {/* Header Text */}
        <div className="vanya-header">
          <p className="vanya-tagline">✦ THE VANYA PROMISE ✦</p>
          <h2 className="vanya-main-heading">
            "Where Tradition Meets Timeless Elegance"
          </h2>
          <div className="vanya-underline"></div>
          <p className="vanya-subtext">
            Each saree in our collection is handpicked directly from master weavers across 
            India — ensuring authenticity, quality, and a story in every thread.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="vanya-grid">
          {promises.map((item, index) => (
            <div key={index} className="vanya-card" tabIndex="0">
              <div className="vanya-icon">{item.icon}</div>
              <h4 className="vanya-card-title">{item.title}</h4>
              <p className="vanya-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

          .vanya-section {
            background: linear-gradient(135deg, #4d2356 0%, #35153c 100%); /* Rich Royal Purple matching logo theme */
            padding: 90px 20px;
            text-align: center;
            color: #fff;
            font-family: 'Playfair Display', serif;
            position: relative;
            overflow: hidden;
          }

          .vanya-container {
            max-width: 1150px;
            margin: 0 auto;
            position: relative;
            z-index: 2;
          }

          .vanya-header {
            margin-bottom: 50px;
          }

          .vanya-tagline {
            font-family: 'Montserrat', sans-serif;
            color: #d4af37; /* Brand Gold */
            font-size: 12px;
            letter-spacing: 4px;
            font-weight: 600;
            margin-bottom: 15px;
            text-transform: uppercase;
          }

          .vanya-main-heading {
            font-size: clamp(2rem, 4vw, 3.2rem);
            color: #fdf8f2;
            max-width: 800px;
            margin: 0 auto 20px;
            font-weight: 600;
            line-height: 1.25;
          }

          .vanya-underline {
            width: 70px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #d4af37, transparent);
            margin: 0 auto 20px;
          }

          .vanya-subtext {
            font-family: 'Montserrat', sans-serif;
            font-size: 15px;
            color: rgba(253, 248, 242, 0.8);
            max-width: 680px;
            margin: 0 auto;
            line-height: 1.7;
          }

          .vanya-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 25px;
            margin-top: 40px;
          }

          .vanya-card {
            background-color: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(212, 175, 55, 0.25);
            border-radius: 16px;
            padding: 40px 20px;
            transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), background-color 0.4s ease, border-color 0.4s ease;
            box-shadow: 0 10px 30px rgba(45, 18, 51, 0.2);
            outline: none;
          }

          /* Luxury Purple Highlighter Hover Effect matching logo styling */
          .vanya-card:hover, .vanya-card:focus {
            transform: translateY(-8px);
            background-color: #5c2d66 !important;
            border-color: #d4af37 !important;
            box-shadow: 0 20px 45px rgba(53, 21, 60, 0.5), 0 0 25px rgba(212, 175, 55, 0.3) !important;
          }

          .vanya-icon {
            font-size: 36px;
            margin-bottom: 18px;
            filter: drop-shadow(0 2px 5px rgba(0,0,0,0.2));
          }

          .vanya-card-title {
            font-family: 'Playfair Display', serif;
            font-size: 19px;
            color: #f3c653; /* Luminous Gold */
            margin: 0 0 10px 0;
            font-weight: 600;
            letter-spacing: 0.5px;
          }

          .vanya-card-desc {
            font-family: 'Montserrat', sans-serif;
            font-size: 13px;
            color: rgba(253, 248, 242, 0.75);
            margin: 0;
            letter-spacing: 0.5px;
          }

          /* Responsive Breakpoints */
          @media (max-width: 992px) {
            .vanya-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 600px) {
            .vanya-grid { grid-template-columns: 1fr; }
            .vanya-section { padding: 60px 15px; }
          }
        `}
      </style>
    </section>
  );
};

export default VanyaCta;