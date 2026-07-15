import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Wishlist = () => {


  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    fetchWishlist();

  }, []);




  const fetchWishlist = async () => {

    try {

      const storedUser = localStorage.getItem('user');


      if (!storedUser) {

        alert("Please login first");
        setLoading(false);
        return;

      }


      const user = JSON.parse(storedUser);



      const res = await fetch(
        `https://vanyabackenddatabase-vahr.onrender.com/review/wishlist/${user.id}`
      );


      const data = await res.json();


      setWishlist(data.wishlist || []);


    }
    catch(err){

      console.log(err);

    }
    finally{

      setLoading(false);

    }

  };






  const removeWishlist = async(id)=>{


    try{


      const res = await fetch(

        `https://vanyabackenddatabase-vahr.onrender.com/review/wishlist/${id}`,

        {
          method:"DELETE"
        }

      );



      const data = await res.json();



      if(data.success){


        setWishlist(
          wishlist.filter(
            item=>item.id !== id
          )
        );


      }


    }
    catch(err){

      console.log(err);

    }


  };







  if(loading){

    return (

      <div className="wishlist-loading">

        Loading Wishlist...

      </div>

    );

  }






return (

<div className="wishlist-page">


<style>{`

*{
 box-sizing:border-box;
}


.wishlist-page{

 padding:40px;
 background:#faf9f5;
 min-height:100vh;
 font-family:'Segoe UI',sans-serif;

}



.wishlist-title{

 text-align:center;
 color:#1a3a32;
 font-size:40px;
 font-weight:700;
 margin-bottom:40px;

}



.wishlist-empty{

 text-align:center;
 font-size:22px;
 color:#777;
 padding:80px 20px;

}




.wishlist-grid{

 display:grid;

 grid-template-columns:
 repeat(auto-fit,minmax(260px,1fr));

 gap:30px;

}




.wishlist-card{

 background:white;

 border-radius:18px;

 overflow:hidden;

 box-shadow:
 0 8px 25px rgba(0,0,0,.08);

 transition:.3s;

}



.wishlist-card:hover{

 transform:translateY(-5px);

}




.wishlist-image{

 width:100%;

 height:320px;

 object-fit:cover;

 display:block;

}




.wishlist-content{

 padding:20px;

}




.wishlist-category{

 color:#b8860b;

 font-size:12px;

 letter-spacing:2px;

 text-transform:uppercase;

}




.wishlist-name{

 color:#1a3a32;

 font-size:20px;

 margin:12px 0;

 height:50px;

 overflow:hidden;

 display:-webkit-box;

 -webkit-line-clamp:2;

 -webkit-box-orient:vertical;

}




.wishlist-price{

 color:#b8860b;

 font-size:22px;

 font-weight:bold;

 display:flex;

 align-items:center;

 flex-wrap:wrap;

 gap:8px;

}




.wishlist-old{

 color:#999;

 font-size:15px;

 text-decoration:line-through;

 font-weight:normal;

}




.wishlist-actions{

 display:flex;

 gap:12px;

 margin-top:20px;

}




.view-btn,
.remove-btn{


 flex:1;

 height:42px;

 border-radius:30px;

 display:flex;

 justify-content:center;

 align-items:center;

 font-size:14px;

 cursor:pointer;

}




.view-btn{

 background:#1a3a32;

 color:white;

 text-decoration:none;

}



.remove-btn{

 border:none;

 background:#d9534f;

 color:white;

}




.wishlist-loading{


 min-height:100vh;

 display:flex;

 justify-content:center;

 align-items:center;

 font-size:25px;

 color:#1a3a32;

}







/* Tablet */

@media(max-width:992px){


.wishlist-page{

 padding:30px;

}



.wishlist-grid{

 grid-template-columns:
 repeat(3,1fr);

}



.wishlist-image{

 height:260px;

}


}








/* Mobile */

@media(max-width:600px){



.wishlist-page{

 padding:15px;

}



.wishlist-title{

 font-size:28px;

 margin-bottom:25px;

}



.wishlist-grid{

 grid-template-columns:
 repeat(2,1fr);

 gap:15px;

}



.wishlist-image{

 height:180px;

}



.wishlist-content{

 padding:12px;

}



.wishlist-category{

 font-size:10px;

}



.wishlist-name{

 font-size:15px;

 height:40px;

}



.wishlist-price{

 font-size:17px;

}



.wishlist-old{

 font-size:12px;

}



.wishlist-actions{

 flex-direction:column;

 gap:8px;

}



.view-btn,
.remove-btn{

 height:36px;

 font-size:12px;

}



}







/* Small mobile */

@media(max-width:380px){


.wishlist-grid{

 grid-template-columns:1fr;

}



.wishlist-image{

 height:260px;

}



.wishlist-name{

 font-size:18px;

}



}



`}</style>





<h1 className="wishlist-title">

My Wishlist ❤️

</h1>





{
wishlist.length===0 ?


<div className="wishlist-empty">

Your wishlist is empty

</div>



:


<div className="wishlist-grid">


{
wishlist.map(item=>(


<div 
className="wishlist-card"
key={item.id}
>


<Link to={`/product/${item.product_id}`}>

<img

src={item.img_url}

alt={item.name}

className="wishlist-image"

/>

</Link>





<div className="wishlist-content">


<div className="wishlist-category">

{item.category || "Product"}

</div>




<h3 className="wishlist-name">

{item.name}

</h3>




<div className="wishlist-price">

₹{Number(item.price).toLocaleString()}


{
item.old_price &&

<span className="wishlist-old">

₹{Number(item.old_price).toLocaleString()}

</span>

}


</div>





<div className="wishlist-actions">


<Link

to={`/product/${item.product_id}`}

className="view-btn"

>

View

</Link>





<button

className="remove-btn"

onClick={()=>removeWishlist(item.id)}

>

Remove

</button>



</div>




</div>



</div>


))

}


</div>


}



</div>


);


};


export default Wishlist;