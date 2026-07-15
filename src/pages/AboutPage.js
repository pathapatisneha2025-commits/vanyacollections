import React from "react";
import { Heart, ShieldCheck, Leaf, Star } from "lucide-react";

const AboutPage = () => {

const isMobile = window.innerWidth <= 768;
const isTablet = window.innerWidth <= 1024;


const styles = {

pageContainer:{
backgroundColor:"#fdfdfb",
fontFamily:"'Playfair Display', serif",
color:"#1a1a1a",
overflowX:"hidden"
},


container:{
maxWidth:"1200px",
margin:"auto",
padding:isMobile?"0 15px":"0 25px"
},


containerCenter:{
maxWidth:"900px",
margin:"auto",
textAlign:"center",
padding:isMobile?"0 15px":"0 25px"
},


sectionPadding:{
padding:isMobile?"50px 0":"100px 0"
},



heroBanner:{
height:isMobile?"320px":"450px",
backgroundImage:
'url("https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=2000")',
backgroundSize:"cover",
backgroundPosition:"center",
position:"relative",
display:"flex",
alignItems:"center",
justifyContent:"center"
},


heroOverlay:{
position:"absolute",
inset:0,
backgroundColor:"rgba(6,59,42,.7)"
},


heroContent:{
zIndex:2,
textAlign:"center",
color:"#d4af37",
padding:"20px"
},


heroSubtitle:{
fontSize:"12px",
letterSpacing:"4px"
},


heroTitle:{
fontSize:isMobile?"32px":"56px",
fontWeight:"400",
margin:0
},



introGrid:{
display:"grid",
gridTemplateColumns:isTablet?"1fr":"1fr 1fr",
gap:isMobile?"40px":"80px",
alignItems:"center"
},



overline:{
color:"#bca172",
fontSize:"11px",
letterSpacing:"2px",
fontWeight:"700"
},


heading:{
fontSize:isMobile?"30px":"42px",
lineHeight:"1.2",
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
position:"relative"
},


missionImageContainer:{
height:isMobile?"380px":"500px",
borderRadius:"20px",
overflow:"hidden"
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
width:isMobile?"80%":"45%",
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
gap:isMobile?"35px":"100px",
flexWrap:"wrap",
textAlign:"center"
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
gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
gap:"25px"
},



valueCard:{
background:"#fff",
padding:isMobile?"25px":"40px",
borderRadius:"15px",
border:"1px solid #eee"
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
fontSize:isMobile?"20px":"28px",
fontStyle:"italic",
lineHeight:"1.5"
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
gridTemplateColumns:isTablet?"1fr":"repeat(3,1fr)",
gap:"40px",
textAlign:"center"
},


teamCircle:{
width:"120px",
height:"120px",
borderRadius:"50%",
backgroundColor:"#063b2a",
display:"flex",
alignItems:"center",
justifyContent:"center",
margin:"auto auto 25px",
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


<div style={styles.heroBanner}>
<div style={styles.heroOverlay}/>

<div style={styles.heroContent}>
<p style={styles.heroSubtitle}>OUR STORY</p>
<h1 style={styles.heroTitle}>
About Vanya Collections
</h1>
</div>

</div>



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
To preserve India's weaving heritage while empowering artisan communities.
</p>


</div>


</div>


</div>


</div>

</div>

</div>




<div style={styles.statsSection}>

<div style={styles.container}>

<div style={styles.statsGrid}>

<div>
<span style={styles.statNumber}>6+</span>
<span style={styles.statLabel}>Years</span>
</div>


<div>
<span style={styles.statNumber}>10K+</span>
<span style={styles.statLabel}>Customers</span>
</div>


<div>
<span style={styles.statNumber}>500+</span>
<span style={styles.statLabel}>Designs</span>
</div>


</div>

</div>

</div>





<div style={styles.valuesSection}>

<div style={styles.container}>

<h2 style={styles.headingCenter}>
Our Values
</h2>


<div style={styles.valuesGrid}>


{[
["⭐","Uncompromising Quality"],
["❤️","Artisan Empowerment"],
["🌿","Sustainable Practices"],
["🛡","Authenticity Guaranteed"]

].map((x,i)=>(

<div style={styles.valueCard} key={i}>

<div style={styles.valueIcon}>
{x[0]}
</div>

<h4 style={styles.valueTitle}>
{x[1]}
</h4>

<p style={styles.valueDesc}>
Every saree is carefully selected with quality and authenticity.
</p>

</div>


))}


</div>

</div>

</div>





<div style={styles.quoteSection}>

<div style={styles.containerCenter}>

<div style={styles.quoteIconCircle}>
PV
</div>


<p style={styles.quoteText}>
"I wanted to build a bridge between extraordinary artisans of India and women who cherish their work."
</p>


<p style={styles.quoteAuthor}>
Priya Vanya
</p>


<p style={styles.quoteSubtext}>
Founder & Creative Director
</p>


</div>

</div>






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

)

}


export default AboutPage;