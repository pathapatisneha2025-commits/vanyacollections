import React from 'react';

const Testimonials = () => {
  const reviews = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      initials: "PS",
      text: "I ordered the Kanjeevaram saree for my daughter's wedding and it was absolutely breathtaking. The quality is unmatched and the gold zari work is so intricate. Vanya Collections has won a loyal customer!"
    },
    {
      name: "Ananya Krishnamurthy",
      location: "Bangalore",
      initials: "AK",
      text: "The emerald silk saree I bought is beyond beautiful. The fabric is so soft and the color is even more vibrant in person. Packaging was luxurious and delivery was prompt. Absolutely love Vanya Collections!"
    },
    {
      name: "Meera Patel",
      location: "Ahmedabad",
      initials: "MP",
      text: "My bridal saree from Vanya Collections was the talk of my wedding! Every guest was asking where I got it from. The craftsmanship is exceptional and worth every rupee. Highly recommend!"
    },
    {
      name: "Lakshmi Rajan",
      location: "Chennai",
      initials: "LR",
      text: "Beautiful collection and authentic products. The saree I received was exactly as shown in the photos. Will definitely shop again for Diwali!"
    }
  ];

  return (
    <div className="vanya-testimonials">
      <style>
        {`
          .vanya-testimonials {
            background-color: #16402d; /* Exact Forest Green from Screenshot */
            color: #dcc07b; /* Soft Gold */
            padding: 80px 5%;
            font-family: 'serif';
            text-align: center;
          }
          .subtitle {
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 2.5px;
            margin-bottom: 12px;
            display: block;
            color: #dcc07b;
            opacity: 0.9;
          }
          .main-title {
            font-size: 48px;
            margin: 0 0 50px 0;
            font-weight: 400;
            color: #dcc07b;
            letter-spacing: 1px;
          }
          .testimonial-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            max-width: 1400px;
            margin: 0 auto;
          }
          .testimonial-card {
            background-color: #0b2319; /* Darker green for depth */
            padding: 35px 25px;
            border-radius: 12px;
            text-align: left;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: transform 0.3s ease;
          }
          .testimonial-card:hover {
            transform: translateY(-5px);
          }
          .stars {
            color: #fcc419;
            font-size: 16px;
            margin-bottom: 20px;
            letter-spacing: 2px;
          }
          .review-text {
            color: #dcc07b;
            font-style: italic;
            line-height: 1.6;
            font-size: 14px;
            margin-bottom: 30px;
            opacity: 0.85;
          }
          .user-info {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .avatar {
            background-color: #1a3321;
            color: #fcc419;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 12px;
            border: 1px solid rgba(252, 196, 25, 0.2);
          }
          .user-details h4 {
            margin: 0;
            font-size: 15px;
            font-weight: 600;
            color: #fcc419;
          }
          .user-details p {
            margin: 2px 0 0 0;
            font-size: 11px;
            color: #889e8f;
          }

          /* Responsive adjustments */
          @media (max-width: 1200px) {
            .testimonial-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 650px) {
            .testimonial-grid {
              grid-template-columns: 1fr;
            }
            .main-title {
              font-size: 32px;
            }
            .vanya-testimonials {
              padding: 60px 20px;
            }
          }
        `}
      </style>

      <span className="subtitle">What Our Customers Say</span>
      <h2 className="main-title">Love from Our Queens</h2>

      <div className="testimonial-grid">
        {reviews.map((item, index) => (
          <div key={index} className="testimonial-card">
            <div>
              <div className="stars">★★★★★</div>
              <p className="review-text">"{item.text}"</p>
            </div>
            
            <div className="user-info">
              <div className="avatar">{item.initials}</div>
              <div className="user-details">
                <h4>{item.name}</h4>
                <p>{item.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;