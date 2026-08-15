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
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

          .vanya-testimonials {
            background-color: #633878; /* Matched exact purple background from the logo */
            color: #fbd349; /* Matched exact yellow/gold from the logo */
            padding: 90px 20px;
            font-family: 'Montserrat', sans-serif;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          .subtitle {
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 4px;
            margin-bottom: 12px;
            display: block;
            color: #fbd349;
            font-weight: 600;
          }
          .main-title {
            font-family: 'Playfair Display', serif;
            font-size: clamp(2.2rem, 3.8vw, 3.2rem);
            margin: 0 auto 15px auto;
            font-weight: 600;
            color: #ffffff;
            letter-spacing: 0.5px;
          }
          .title-underline {
            width: 70px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #fbd349, transparent);
            margin: 0 auto 50px auto;
          }
          .testimonial-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 25px;
            max-width: 1300px;
            margin: 0 auto;
          }
          .testimonial-card {
            background-color: #512b61; /* Darker shade of the logo purple for card depth */
            border: 1px solid rgba(251, 211, 73, 0.25);
            padding: 35px 25px;
            border-radius: 16px;
            text-align: left;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-shadow: 0 10px 30px rgba(53, 20, 64, 0.4);
            transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), background-color 0.4s ease, border-color 0.4s ease;
          }
          
          /* Hover effect using exact logo gold and deeper purple accents */
          .testimonial-card:hover {
            transform: translateY(-8px);
            background-color: #74418c !important;
            border-color: #fbd349 !important;
            box-shadow: 0 20px 45px rgba(53, 20, 64, 0.6), 0 0 25px rgba(251, 211, 73, 0.3) !important;
          }

          .stars {
            color: #fbd349;
            font-size: 15px;
            margin-bottom: 18px;
            letter-spacing: 3px;
          }
          .review-text {
            color: rgba(255, 255, 255, 0.85);
            font-family: 'Playfair Display', serif;
            font-style: italic;
            line-height: 1.7;
            font-size: 15px;
            margin-bottom: 30px;
          }
          .user-info {
            display: flex;
            align-items: center;
            gap: 14px;
            border-top: 1px solid rgba(251, 211, 73, 0.15);
            padding-top: 18px;
          }
          .avatar {
            background-color: #3b1c47;
            color: #fbd349;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 13px;
            font-family: 'Montserrat', sans-serif;
            border: 1px solid rgba(251, 211, 73, 0.4);
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            flex-shrink: 0;
          }
          .user-details h4 {
            margin: 0;
            font-size: 15px;
            font-weight: 600;
            color: #fbd349;
            font-family: 'Playfair Display', serif;
            letter-spacing: 0.5px;
          }
          .user-details p {
            margin: 3px 0 0 0;
            font-size: 11px;
            color: rgba(255, 255, 255, 0.6);
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          /* Responsive adjustments */
          @media (max-width: 1200px) {
            .testimonial-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 768px) {
            .testimonial-grid {
              grid-template-columns: 1fr;
            }
            .vanya-testimonials {
              padding: 60px 15px;
            }
          }
        `}
      </style>

      <span className="subtitle">✦ What Our Customers Say ✦</span>
      <h2 className="main-title">Love from Our Queens</h2>
      <div className="title-underline"></div>

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