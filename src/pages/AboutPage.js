import React, {useState, useEffect} from "react";
import { Heart, ShieldCheck, Leaf, Star } from "lucide-react";


const AboutPage = () => {


const [screen,setScreen] = useState(window.innerWidth);


useEffect(()=>{

const resize=()=>{
setScreen(window.innerWidth);
};


window.addEventListener("resize",resize);


return()=>window.removeEventListener("resize",resize);


},[]);



const isMobile = screen <= 768;
const isTablet = screen <= 1024;



const styles = {


pageContainer:{
backgroundColor:"#fdfdfb",
fontFamily:"'Playfair Display', serif",
color:"#1a1a1a",
width:"100%",
maxWidth:"100%",
overflowX:"hidden"
},



container:{

width:"100%",
maxWidth:"1200px",
margin:"0 auto",
padding:isMobile?"0 16px":"0 25px",
boxSizing:"border-box"

},



containerCenter:{

width:"100%",
maxWidth:"900px",
margin:"0 auto",
textAlign:"center",
padding:isMobile?"0 16px":"0 25px",
boxSizing:"border-box"

},




sectionPadding:{

padding:isMobile?"50px 0":"100px 0"

},




heroBanner:{

height:isMobile?"280px":"450px",

width:"100%",

backgroundImage:
'url("https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=2000")',

backgroundSize:"cover",

backgroundPosition:"center",

position:"relative",

display:"flex",

alignItems:"center",

justifyContent:"center",

overflow:"hidden"

},





heroOverlay:{

position:"absolute",

inset:0,

backgroundColor:"rgba(6,59,42,.7)"

},




heroContent:{

position:"relative",

zIndex:2,

textAlign:"center",

color:"#d4af37",

padding:"20px",

width:"100%"

},




heroSubtitle:{

fontSize:"12px",

letterSpacing:"4px"

},




heroTitle:{

fontSize:isMobile?"34px":isTablet?"45px":"56px",

fontWeight:"400",

margin:0,

lineHeight:"1.2"

},




introGrid:{

display:"grid",

gridTemplateColumns:

isTablet

?"1fr"

:"repeat(2,minmax(0,1fr))",

gap:isMobile?"40px":"60px",

alignItems:"center"

},




overline:{

color:"#bca172",

fontSize:"11px",

letterSpacing:"2px",

fontWeight:"700"

},




heading:{

fontSize:isMobile?"28px":isTablet?"34px":"42px",

lineHeight:"1.25",

marginBottom:"25px",

fontWeight:"400"

},




paragraph:{

color:"#666",

lineHeight:"1.8",

fontSize:isMobile?"15px":"16px",

marginBottom:"20px"

},





missionCard:{

position:"relative",

width:"100%"

},




missionImageContainer:{

height:isMobile?"350px":isTablet?"420px":"500px",

borderRadius:"20px",

overflow:"hidden",

width:"100%"

},




missionImage:{

width:"100%",

height:"100%",

objectFit:"cover",

display:"block"

},




missionOverlayCard:{

position:"absolute",

bottom:0,

left:0,

width:isMobile?"85%":"45%",

maxWidth:"100%",

backgroundColor:"#063b2a",

padding:isMobile?"20px":"30px",

borderTopRightRadius:"20px",

color:"#fff",

boxSizing:"border-box"

},




missionTitle:{

color:"#d4af37",

fontSize:"20px"

},




missionText:{

fontSize:"14px",

lineHeight:"1.5"

},




statsSection:{

padding:"50px 0",

borderTop:"1px solid #eee"

},




statsGrid:{

display:"flex",

justifyContent:"center",

gap:isMobile?"30px":"100px",

flexWrap:"wrap",

textAlign:"center",

width:"100%"

},




statNumber:{

display:"block",

fontSize:isMobile?"32px":"42px",

color:"#bca172"

},




statLabel:{

fontSize:"14px",

color:"#888"

},




valuesSection:{

padding:isMobile?"50px 0":"100px 0",

backgroundColor:"#f9f9f7"

},




headingCenter:{

textAlign:"center",

fontSize:isMobile?"30px":"40px",

marginBottom:"40px",

fontWeight:"400"

},




valuesGrid:{

display:"grid",

gridTemplateColumns:

isMobile

?"1fr"

:"repeat(auto-fit,minmax(250px,1fr))",

gap:"25px"

},




valueCard:{

background:"#fff",

padding:isMobile?"25px":"40px",

borderRadius:"15px",

border:"1px solid #eee",

height:"100%"

},




valueIcon:{

color:"#bca172",

marginBottom:"15px"

},




valueTitle:{

fontSize:"18px"

},




valueDesc:{

color:"#777",

lineHeight:"1.6",

fontSize:"14px"

},

quoteSection:{

padding:isMobile?"60px 0":"120px 0",

backgroundColor:"#063b2a",

color:"#d4af37",

textAlign:"center"

},



quoteIconCircle:{

width:"60px",

height:"60px",

borderRadius:"50%",

display:"flex",

alignItems:"center",

justifyContent:"center",

margin:"0 auto 25px",

border:"1px solid #d4af37"

},




quoteText:{

fontSize:isMobile?"18px":isTablet?"24px":"28px",

fontStyle:"italic",

lineHeight:"1.6",

padding:"0 10px"

},




quoteAuthor:{

fontSize:"18px"

},



quoteSubtext:{

fontSize:"12px",

color:"#fff"

},




teamGrid:{

display:"grid",

gridTemplateColumns:

isMobile

?"1fr"

:isTablet

?"repeat(2,1fr)"

:"repeat(3,minmax(0,1fr))",

gap:"40px",

textAlign:"center"

},




teamCircle:{

width:isMobile?"100px":"120px",

height:isMobile?"100px":"120px",

borderRadius:"50%",

backgroundColor:"#063b2a",

display:"flex",

alignItems:"center",

justifyContent:"center",

margin:"0 auto 25px",

fontSize:"28px",

color:"#d4af37",

border:"2px solid #d4af37"

},




teamName:{

fontSize:"20px"

},




teamRole:{

color:"#888",

fontSize:"14px"

}



};





return (

<div style={styles.pageContainer}>


{/* HERO */}


<div style={styles.heroBanner}>


<div style={styles.heroOverlay}/>


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

Vanya Collections was born in 2018 when our founder,
Priya Vanya, traveled across India's most celebrated
weaving centers.

</p>



<p style={styles.paragraph}>

We connect India's gifted weavers with women who
appreciate true artistry.

</p>



</div>





<div style={styles.missionCard}>


<div style={styles.missionImageContainer}>


<img

src="https://images.unsplash.com/photo-1610030469668-93510ef2d32e"

style={styles.missionImage}

/>



<div style={styles.missionOverlayCard}>


<h3 style={styles.missionTitle}>
Our Mission
</h3>



<p style={styles.missionText}>

To preserve India's weaving heritage while empowering
artisan communities.

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


<div>

<span style={styles.statNumber}>
6+
</span>

<span style={styles.statLabel}>
Years
</span>

</div>




<div>

<span style={styles.statNumber}>
10K+
</span>

<span style={styles.statLabel}>
Customers
</span>

</div>




<div>

<span style={styles.statNumber}>
500+
</span>

<span style={styles.statLabel}>
Designs
</span>

</div>




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
["⭐","Uncompromising Quality"],
["❤️","Artisan Empowerment"],
["🌿","Sustainable Practices"],
["🛡","Authenticity Guaranteed"]

].map((item,index)=>(


<div
key={index}
style={styles.valueCard}
>


<div style={styles.valueIcon}>

{item[0]}

</div>



<h4 style={styles.valueTitle}>

{item[1]}

</h4>



<p style={styles.valueDesc}>

Every saree is carefully selected with quality
and authenticity.

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

"I wanted to build a bridge between extraordinary
artisans of India and women who cherish their work."

</p>




<p style={styles.quoteAuthor}>
Priya Vanya
</p>



<p style={styles.quoteSubtext}>
Founder & Creative Director
</p>



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

].map((member,index)=>(


<div key={index}>


<div style={styles.teamCircle}>

{member[0]}

</div>




<h4 style={styles.teamName}>

{member[1]}

</h4>



<p style={styles.teamRole}>

Creative Team

</p>



</div>


))


}



</div>


</div>


</div>






</div>

);


};



export default AboutPage;