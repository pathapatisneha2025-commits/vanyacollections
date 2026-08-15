import React from 'react';

const AboutOurStory = () => {
  return (
    <section className="story-section">
      <div className="story-container">
        {/* Left Side: Image with Badge */}
        <div className="story-image-wrapper">
          <div className="main-image-container">
            <img 
              src="/festivalsaree.jpg" 
              alt="Vanya Heritage" 
              className="story-img"
            />
            {/* The Floating Gold & Royal Badge */}
            <div className="experience-badge">
              <h3>6+</h3>
              <p>Years of Weaving Dreams</p>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="story-content">
          <span className="story-tagline">✦ OUR HERITAGE STORY ✦</span>
          <h2 className="story-title">
            Born from a Love of India's Textile Heritage
          </h2>
          <div className="title-underline"></div>
          
          <div className="story-description">
            <p>
              Vanya Collections was founded with a singular vision — to bring the finest 
              handwoven sarees directly from India's master craftspeople to women who 
              appreciate true luxury. Every saree is sourced ethically, ensuring artisans 
              receive fair compensation.
            </p>
            <p>
              From the silk looms of Kanchipuram to the Banarasi weavers of Varanasi, our 
              collection spans the rich tapestry of India's textile traditions.
            </p>
          </div>

          <button className="read-story-btn">
            Read Our Story <span className="arrow">→</span>
          </button>
        </div>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

          .story-section {
            padding: 100px 5%;
            background: linear-gradient(135deg, #fbf5fc 0%, #f4ebf7 100%);
            font-family: 'Montserrat', sans-serif;
            position: relative;
            overflow: hidden;
          }
          .story-container {
            max-width: 1300px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 70px;
            align-items: center;
          }
          .story-image-wrapper {
            position: relative;
            width: 100%;
          }
          .main-image-container {
            position: relative;
            border-radius: 24px;
            overflow: visible;
            box-shadow: 0 20px 40px rgba(82, 43, 91, 0.12);
            border: 1px solid rgba(212, 175, 55, 0.3);
            transition: transform 0.4s ease;
          }
          .main-image-container:hover {
            transform: translateY(-5px);
          }
          .story-img {
            width: 100%;
            height: 520px;
            object-fit: cover;
            display: block;
            border-radius: 24px;
            transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
          }
          .main-image-container:hover .story-img {
            transform: scale(1.03);
          }
          .experience-badge {
            position: absolute;
            bottom: 35px;
            right: -35px;
            background: linear-gradient(135deg, #522b5b 0%, #35153c 100%);
            border: 1px solid #d4af37;
            padding: 25px;
            border-radius: 18px;
            width: 160px;
            box-shadow: 0 15px 35px rgba(53, 21, 60, 0.3), 0 0 15px rgba(212, 175, 55, 0.2);
            text-align: center;
            z-index: 10;
          }
          .experience-badge h3 {
            font-family: 'Playfair Display', serif;
            font-size: 38px;
            margin: 0;
            color: #d4af37;
            font-weight: 700;
          }
          .experience-badge p {
            font-family: 'Montserrat', sans-serif;
            font-size: 12px;
            margin: 6px 0 0 0;
            color: #fdf8f2;
            font-weight: 500;
            letter-spacing: 0.5px;
            line-height: 1.3;
          }
          .story-tagline {
            color: #d4af37;
            font-size: 12px;
            letter-spacing: 4px;
            font-weight: 600;
            text-transform: uppercase;
            display: inline-block;
            margin-bottom: 10px;
          }
          .story-title {
            font-family: 'Playfair Display', serif;
            font-size: clamp(2.2rem, 3.8vw, 3.2rem);
            color: #522b5b;
            margin: 0 0 15px 0;
            line-height: 1.2;
            font-weight: 600;
          }
          .title-underline {
            width: 60px;
            height: 2px;
            background-color: #d4af37;
            margin-bottom: 25px;
          }
          .story-description p {
            color: rgba(82, 43, 91, 0.85);
            font-size: 15px;
            line-height: 1.8;
            margin-bottom: 20px;
            font-family: 'Montserrat', sans-serif;
            font-weight: 400;
          }
          .read-story-btn {
            background: #522b5b;
            border: 1px solid #d4af37;
            color: #fdf8f2;
            padding: 15px 34px;
            border-radius: 30px;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
            margin-top: 15px;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 4px 15px rgba(82, 43, 91, 0.15);
          }
          .read-story-btn:hover {
            background: #6a3975;
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(82, 43, 91, 0.25), 0 0 12px rgba(212, 175, 55, 0.3);
            color: #d4af37;
          }
          .arrow {
            font-size: 16px;
            transition: transform 0.3s ease;
          }
          .read-story-btn:hover .arrow {
            transform: translateX(4px);
          }

          /* Responsive Mobile Styling */
          @media (max-width: 1024px) {
            .story-container {
              grid-template-columns: 1fr;
              gap: 60px;
            }
            .story-img {
              height: 420px;
            }
          }
          @media (max-width: 600px) {
            .story-section {
              padding: 60px 20px;
            }
            .story-img {
              height: 320px;
            }
            .experience-badge {
              right: 10px;
              bottom: 15px;
              padding: 18px;
              width: 130px;
            }
            .experience-badge h3 { font-size: 28px; }
            .experience-badge p { font-size: 10px; }
          }
        `}
      </style>
    </section>
  );
};

export default AboutOurStory;