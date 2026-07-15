import React from 'react';
import { Heart, ShieldCheck, Leaf, Star } from 'lucide-react';

const AboutPage = () => {

return (

<div style={styles.pageContainer}>


<style>{`

*{
 box-sizing:border-box;
}


html,body{
 overflow-x:hidden;
}



/* TABLET */

@media(max-width:992px){


.heroBanner{
 height:350px !important;
}


.heroTitle{
 font-size:42px !important;
}


.introGrid{

 grid-template-columns:1fr !important;
 gap:40px !important;

}


.heading{

 font-size:34px !important;

}



.missionImageContainer{

 height:420px !important;

}



.missionOverlayCard{

 width:70% !important;

}



.statsGrid{

 flex-wrap:wrap;

 gap:40px;

}



.teamGrid{

 grid-template-columns:repeat(2,1fr) !important;

}


}



/* MOBILE */


@media(max-width:600px){



.container,
.containerCenter{

 padding:0 15px !important;

}



.heroBanner{

 height:280px !important;

}



.heroSubtitle{

 font-size:10px !important;

}



.heroTitle{

 font-size:28px !important;

 padding:0 15px;

}



.sectionPadding{

 padding:50px 0 !important;

}



.heading{

 font-size:26px !important;

 line-height:1.3;

}



.paragraph{

 font-size:14px !important;

 line-height:1.6 !important;

}



.missionImageContainer{

 height:330px !important;

}



.missionOverlayCard{

 width:100% !important;

 padding:18px !important;

 border-radius:0 !important;

}



.missionTitle{

 font-size:18px !important;

}



.missionText{

 font-size:13px !important;

}



.statsSection{

 padding:40px 0 !important;

}



.statsGrid{

 flex-direction:column;

 gap:30px;

}



.statNumber{

 font-size:35px !important;

}



.valuesSection{

 padding:50px 0 !important;

}



.headingCenter{

 font-size:28px !important;

 margin-bottom:30px !important;

}



.valuesGrid{

 grid-template-columns:1fr !important;

 gap:20px !important;

}



.valueCard{

 padding:25px !important;

}



.quoteSection{

 padding:70px 0 !important;

}



.quoteText{

 font-size:18px !important;

 padding:0 10px;

}



.teamGrid{

 grid-template-columns:1fr !important;

 gap:40px !important;

}



.teamCircle{

 width:100px !important;

 height:100px !important;

 font-size:24px !important;

}



.teamName{

 font-size:18px !important;

}



}



/* SMALL MOBILE */


@media(max-width:380px){


.heroTitle{

 font-size:24px !important;

}


.heading{

 font-size:23px !important;

}


.quoteText{

 font-size:16px !important;

}


}




`}</style>





{/* HERO */}

<div style={styles.heroBanner}>

<div style={styles.heroOverlay}></div>


<div style={styles.heroContent}>

<p style={styles.heroSubtitle}>
OUR STORY
</p>


<h1 style={styles.heroTitle}>
About Vanya Collections
</h1>


</div>

</div>





{/* INTRO */}


<div style={styles.sectionPadding}>


<div style={styles.container}>


<div style={styles.introGrid}>


<div>


<p style={styles.overline}>
WHO WE ARE
</p>


<h2 style={styles.heading}>
Born from a Passion for India's Textile Heritage
</h2>


<p style={styles.paragraph}>
Vanya Collections was born in 2018 when our founder, Priya Vanya,
traveled across India's most celebrated weaving centers.
</p>


<p style={styles.paragraph}>
We connect India's gifted weavers with women who appreciate
true artistry and traditional craftsmanship.
</p>


</div>





<div style={styles.missionCard}>


<div style={styles.missionImageContainer}>


<img

src="https://images.unsplash.com/photo-1610030469668-93510ef2d32e?auto=format&fit=crop&q=80&w=800"

style={styles.missionImage}

/>


<div style={styles.missionOverlayCard}>


<h3 style={styles.missionTitle}>
Our Mission
</h3>


<p style={styles.missionText}>
To preserve India's weaving heritage while empowering artisan communities.
</p>


</div>


</div>


</div>


</div>


</div>


</div>






{/* STATS */}


<div style={styles.statsSection}>


<div style={styles.container}>


<div style={styles.statsGrid}>


{
[
["6+","Years"],
["10K+","Customers"],
["500+","Designs"]
].map((x,i)=>(

<div key={i}>

<span style={styles.statNumber}>
{x[0]}
</span>


<span style={styles.statLabel}>
{x[1]}
</span>

</div>


))
}


</div>


</div>


</div>







{/* VALUES */}



<div style={styles.valuesSection}>


<div style={styles.container}>


<h2 style={styles.headingCenter}>
Our Values
</h2>



<div style={styles.valuesGrid}>


{
[
{
icon:<Star/>,
title:"Uncompromising Quality",
desc:"Every saree is handpicked and quality checked."
},

{
icon:<Heart/>,
title:"Artisan Empowerment",
desc:"We support traditional weavers."
},

{
icon:<Leaf/>,
title:"Sustainable Practices",
desc:"Eco friendly weaving methods."
},

{
icon:<ShieldCheck/>,
title:"Authenticity Guaranteed",
desc:"Original handcrafted products."
}

].map((v,i)=>(


<div key={i} style={styles.valueCard}>


<div style={styles.valueIcon}>
{v.icon}
</div>


<h4 style={styles.valueTitle}>
{v.title}
</h4>


<p style={styles.valueDesc}>
{v.desc}
</p>


</div>


))


}



</div>


</div>


</div>








{/* QUOTE */}



<div style={styles.quoteSection}>


<div style={styles.containerCenter}>


<div style={styles.quoteIconCircle}>
PV
</div>


<p style={styles.quoteText}>

"I wanted to build a bridge between extraordinary artisans of India and women who cherish their work."

</p>



<h3>
Priya Vanya
</h3>


</div>


</div>








{/* TEAM */}



<div style={styles.sectionPadding}>


<div style={styles.container}>


<h2 style={styles.headingCenter}>
Meet Our Team
</h2>


<div style={styles.teamGrid}>


{
[
["PV","Priya Vanya"],
["AS","Ananya Sharma"],
["KR","Kavitha Rajan"]

].map((m,i)=>(


<div key={i}>


<div style={styles.teamCircle}>
{m[0]}
</div>


<h4 style={styles.teamName}>
{m[1]}
</h4>


</div>


))

}



</div>


</div>


</div>



</div>


);

};






const styles={


pageContainer:{
background:"#fdfdfb",
fontFamily:"'Playfair Display',serif"
},


container:{
maxWidth:"1200px",
margin:"auto",
padding:"0 25px"
},


containerCenter:{
maxWidth:"900px",
margin:"auto",
textAlign:"center"
},


sectionPadding:{
padding:"100px 0"
},



heroBanner:{
height:"450px",
backgroundImage:
'url("https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b")',
backgroundSize:"cover",
backgroundPosition:"center",
display:"flex",
alignItems:"center",
justifyContent:"center",
position:"relative"
},


heroOverlay:{
position:"absolute",
inset:0,
background:"rgba(6,59,42,.7)"
},


heroContent:{
zIndex:2,
textAlign:"center",
color:"#d4af37"
},


heroSubtitle:{
letterSpacing:"4px"
},


heroTitle:{
fontSize:"56px",
fontWeight:400
},


introGrid:{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"80px",
alignItems:"center"
},


heading:{
fontSize:"42px"
},


paragraph:{
color:"#666",
lineHeight:1.8
},


missionImageContainer:{
height:"500px",
position:"relative",
overflow:"hidden",
borderRadius:"20px"
},


missionImage:{
width:"100%",
height:"100%",
objectFit:"cover"
},


missionOverlayCard:{
position:"absolute",
bottom:0,
left:0,
width:"45%",
background:"#063b2a",
color:"white",
padding:"30px"
},


missionTitle:{
color:"#d4af37"
},


statsSection:{
padding:"60px 0"
},


statsGrid:{
display:"flex",
justifyContent:"space-around",
textAlign:"center"
},


statNumber:{
display:"block",
fontSize:"42px",
color:"#bca172"
},


statLabel:{
color:"#777"
},


valuesSection:{
padding:"100px 0",
background:"#f9f9f7"
},


headingCenter:{
textAlign:"center",
fontSize:"40px",
marginBottom:"50px"
},


valuesGrid:{
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:"25px"
},


valueCard:{
background:"#fff",
padding:"35px",
borderRadius:"15px"
},


valueIcon:{
color:"#bca172"
},


valueTitle:{
fontSize:"18px"
},


valueDesc:{
color:"#777"
},


quoteSection:{
padding:"120px 0",
background:"#063b2a",
color:"#d4af37",
textAlign:"center"
},


quoteText:{
fontSize:"28px",
fontStyle:"italic"
},


quoteIconCircle:{
margin:"auto",
marginBottom:"30px",
width:"60px",
height:"60px",
borderRadius:"50%",
border:"1px solid #d4af37",
display:"flex",
alignItems:"center",
justifyContent:"center"
},


teamGrid:{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
textAlign:"center"
},


teamCircle:{
margin:"auto",
width:"120px",
height:"120px",
borderRadius:"50%",
background:"#063b2a",
color:"#d4af37",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"30px"
},


teamName:{
textAlign:"center"
}



};



export default AboutPage;