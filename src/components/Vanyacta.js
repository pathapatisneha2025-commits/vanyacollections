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
          <p className="vanya-tagline">THE VANYA PROMISE</p>
          <h2 className="vanya-main-heading">
            "Where Tradition Meets Timeless Elegance"
          </h2>
          <p className="vanya-subtext">
            Each saree in our collection is handpicked directly from master weavers across 
            India — ensuring authenticity, quality, and a story in every thread.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="vanya-grid">
          {promises.map((item, index) => (
            <div key={index} className="vanya-card">
              <div className="vanya-icon">{item.icon}</div>
              <h4 className="vanya-card-title">{item.title}</h4>
              <p className="vanya-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .vanya-section {
            background-color: #16402d; /* Exact Forest Green from Screenshot */
            padding: 80px 20px;
            text-align: center;
            color: #fff;
            font-family: 'serif';
          }
          .vanya-container {
            max-width: 1100px;
            margin: 0 auto;
          }
          .vanya-header {
            margin-bottom: 50px;
          }
          .vanya-tagline {
            color: #dcc07b;
            font-size: 11px;
            letter-spacing: 3px;
            font-weight: 600;
            margin-bottom: 15px;
            text-transform: uppercase;
          }
          .vanya-main-heading {
            font-size: 42px;
            color: #dcc07b;
            max-width: 800px;
            margin: 0 auto 25px;
            font-weight: 400;
            line-height: 1.2;
          }
          .vanya-subtext {
            font-size: 16px;
            color: #889e8f; /* Muted sage green-grey */
            max-width: 700px;
            margin: 0 auto;
            line-height: 1.6;
          }
          .vanya-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-top: 40px;
          }
          .vanya-card {
            background-color: #0b2319; /* Darker card background from screenshot */
            border: 1px solid rgba(220, 192, 123, 0.1);
            border-radius: 12px;
            padding: 35px 20px;
            transition: transform 0.3s ease;
          }
          .vanya-card:hover {
            transform: translateY(-5px);
          }
          .vanya-icon {
            font-size: 32px;
            margin-bottom: 15px;
          }
          .vanya-card-title {
            font-size: 17px;
            color: #fcc419; /* Brand yellow/gold */
            margin: 0 0 8px 0;
            font-weight: 500;
          }
          .vanya-card-desc {
            font-size: 13px;
            color: #889e8f;
            margin: 0;
          }

          /* Responsive Breakpoints */
          @media (max-width: 992px) {
            .vanya-grid { grid-template-columns: repeat(2, 1fr); }
            .vanya-main-heading { font-size: 36px; }
          }
          @media (max-width: 600px) {
            .vanya-grid { grid-template-columns: 1fr; }
            .vanya-main-heading { font-size: 28px; }
            .vanya-section { padding: 60px 15px; }
          }
        `}
      </style>
    </section>
  );
};

export default VanyaCta;