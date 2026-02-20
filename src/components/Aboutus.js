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
            {/* The Floating Gold Badge */}
            <div className="experience-badge">
              <h3>6+</h3>
              <p>Years of Weaving Dreams</p>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="story-content">
          <span className="story-tagline">OUR STORY</span>
          <h2 className="story-title">
            Born from a Love of India's Textile Heritage
          </h2>
          
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
          .story-section {
            padding: 100px 5%;
            background-color: #fdfaf5; /* Subtle off-white background from screenshot */
            font-family: 'serif';
          }
          .story-container {
            max-width: 1300px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1.2fr 0.8fr; /* Image-heavy ratio as per screenshot */
            gap: 80px;
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
          }
          .story-img {
            width: 100%;
            height: 500px; /* Fixed height to match the screenshot aspect ratio */
            object-fit: cover;
            display: block;
            border-radius: 24px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          }
          .experience-badge {
            position: absolute;
            bottom: 30px; /* Floating slightly above the bottom edge */
            right: -30px;
            background-color: #fcc419; /* Brand Gold */
            padding: 25px;
            border-radius: 20px;
            width: 150px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
            text-align: left;
            z-index: 10;
          }
          .experience-badge h3 {
            font-size: 36px;
            margin: 0;
            color: #1a3321;
            font-weight: 700;
          }
          .experience-badge p {
            font-size: 14px;
            margin: 2px 0 0 0;
            color: #1a3321;
            font-weight: 600;
            line-height: 1.2;
          }
          .story-tagline {
            color: #b8860b;
            font-size: 11px;
            letter-spacing: 4px;
            font-weight: 700;
            text-transform: uppercase;
          }
          .story-title {
            font-size: 52px;
            color: #1a3321;
            margin: 20px 0;
            line-height: 1.1;
            font-weight: 500;
          }
          .story-description p {
            color: #4a4a4a;
            font-size: 16px;
            line-height: 1.8;
            margin-bottom: 25px;
            font-family: sans-serif;
          }
          .read-story-btn {
            background: transparent;
            border: 1px solid #b8860b;
            color: #b8860b;
            padding: 14px 32px;
            border-radius: 40px;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 15px;
            display: inline-flex;
            align-items: center;
            gap: 12px;
          }
          .read-story-btn:hover {
            background: #b8860b;
            color: #fff;
          }
          .arrow {
            font-size: 18px;
          }

          /* Responsive Mobile Styling */
          @media (max-width: 1024px) {
            .story-container {
              grid-template-columns: 1fr;
              gap: 60px;
            }
            .story-img {
              height: 400px;
            }
            .story-title {
              font-size: 40px;
            }
          }
          @media (max-width: 600px) {
            .story-section {
              padding: 60px 20px;
            }
            .story-img {
              height: 300px;
            }
            .story-title {
              font-size: 32px;
            }
            .experience-badge {
              right: 0px;
              bottom: 10px;
              padding: 15px;
              width: 120px;
            }
            .experience-badge h3 { font-size: 28px; }
          }
        `}
      </style>
    </section>
  );
};

export default AboutOurStory;