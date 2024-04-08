import React, { useEffect, useState } from 'react'
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Paper, Typography, Button, Card, CardMedia, CardContent,Grid , Box} from '@mui/material';
import { Whatshot } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Two from '../Components/Two';
import Stage from '../Components/Stage';

const circleStyle = {
  width: 60,
  height: 60,
  borderRadius: '50%',
  backgroundColor: 'rgb(251,100,98)', // Default background color
  margin: '0',
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: "100%"
};
const Home = ({ children }) => {

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);

 
  const images = [
    {
      id: 1,
      src: 'https://ossimg.envyenvelope.com/daman/banner/Banner_202303252030007bhh.png',
      alt: 'First Image'
    },
    {
      id: 2,
      src: 'https://ossimg.envyenvelope.com/daman/banner/Banner_20231202231145ivgs.jpg',
      alt: 'Second Image'
    },
    {
      id: 3,
      src: 'https://ossimg.envyenvelope.com/daman/banner/Banner_20231021124415wjus.png',
      alt: 'Third Image'
    },
    {
      id: 4,
      src: 'https://ossimg.envyenvelope.com/daman/banner/Banner_202305270515371rsv.png',
      alt: 'Fourth Image'
    },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, );

  const imageUrls = [
    'assets/images/gamecategory_20231215033613klhe.png',
    'assets/images/gamecategory_202312150336204mtb.png',
    'assets/images/gamecategory_20231215033607yi17.png',
    'assets/images/gamecategory_20231215033600k8os.png',
    'assets/images/gamecategory_20231215033554mpgb.png',
    'assets/images/gamecategory_20231215033528g3gt.png',
    'assets/images/gamecategory_2023121503353389nc.png',
    'assets/images/gamecategory_202312150336366phx.png',
  ];

  const [subtitles] = useState([
    'Lottery',
    'Slots',
    'Sports',
    'Casino',
    'PVC',
    'Finishing',
    'Mini games',
    'Popular',
  ]);

  const imageUrl = 'assets/images/lottery-7b8f3f55.png';

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/head"); // Navigate to the specified link
  };
  const handleClick1 = () => {
    navigate("/k3"); // Navigate to the specified link
  };
  const handleClick2 = () => {
    navigate("/trx"); // Navigate to the specified link
  };
  return (
    <div>
      <Mobile>
        <Box
          display="flex"
          flexDirection="column"
          height="calc(var(--vh, 1vh) * 100)"
          position="relative"
        >
          <Box flexGrow={1}>


            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundImage: 'linear-gradient(90deg, rgb(250,93,92) 0%, rgb(254,148,137) 100%)',
                padding: '8px 16px',
                color: 'white'
              }}
            >
              <Grid item xs={6} textAlign="left">
                <span style={{ fontWeight: "bold" }}>MC </span>
              </Grid>
              <Grid item xs={6} textAlign="right">
              <IconButton color="inherit" onClick={() => navigate('/messages')}>
  <SmsIcon />
</IconButton>
                <IconButton color="inherit">
                  <DownloadIcon />
                </IconButton>
              </Grid>
            </Grid>

            {/* //content */}


            <Grid item xs={12} style={{ display: 'flex' }}>
              {images.map((image, index) => (
                <Paper key={image.id} sx={{ display: index === currentIndex ? 'block' : 'none', width: '100%' }}>
                  <img src={image.src} alt={image.alt} style={{ width: '100%', height: 'auto', margin: 0 }} />
                </Paper>
              ))}
            </Grid>

            <Grid container alignItems="center" sx={{ backgroundColor: "white" }}  >
              <Grid item xs={2} align="left">
                <IconButton>
                  <VolumeUpIcon sx={{ color: "rgb(251,100,98)" }} />
                </IconButton>
              </Grid>
              <Grid item xs={6} align="left" >
                <div style={{ overflow: 'hidden', height: '24px', position: 'relative' }}>

                  <Typography

                    variant="caption"
                    style={{
                      position: 'absolute',
                      color: "black",
                      fontSize: '8px',


                    }}
                  >
                 For your convenience to ensure the safety of your account and successful withdrawal process. Please fill the genuine mobile active number register in your bank account. thanks for your cooperation
                  </Typography>

                </div>
              </Grid>


              <Grid item xs={4}>
                <Button
                  variant="contained"
                  startIcon={<Whatshot />}
                  sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: '20px', backgroundColor: 'rgb(251,100,98)', color: 'white' }}
                >
                  Details
                </Button>
              </Grid>
            </Grid>




 
            <Grid container spacing={1} sx={{width:"98%",margin:"auto"}} >
      {/* First row with 2 columns */}
      <Grid item xs={6}>
        <img src="assets/images/home/2.png" alt="image1" style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={6}>
        <img src="assets/images/home/3.png" alt="image2" style={{ width: '100%' }} />
      </Grid>

      {/* Second row with 3 columns */}
      <Grid item xs={4}>
        <img src="assets/images/home/4.png" alt="image3" style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={4}>
        <img src="assets/images/home/5.png" alt="image4" style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={4}>
        <img src="assets/images/home/8.png" alt="image5" style={{ width: '100%' }} />
      </Grid>

      {/* Third row with 3 columns */}
      <Grid item xs={4}>
        <img src="assets/images/home/6.png" alt="image6" style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={4}>
        <img src="assets/images/home/7.png" alt="image7" style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={4}>
        <img src="assets/images/home/1.png" alt="image8" style={{ width: '100%' }} />
      </Grid>
    </Grid>



    <Grid container spacing={1}  sx={{width:"98%",margin:"auto"}}>
      {/* First row with 2 columns */}
      <Grid item xs={6}  onClick={handleClick}>
        <img src="assets/images/home/9.png" alt="image1" style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={6}  onClick={handleClick1}>
        <img src="assets/images/home/10.png" alt="image2" style={{ width: '100%' }} />
      </Grid>

      {/* Second row with 2 columns */}
      <Grid item xs={6}  >
        <img src="assets/images/home/11.png" alt="image3" style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={6}  onClick={handleClick2}>
        <img src="assets/images/home/12.png" alt="image4" style={{ width: '100%' }} />
      </Grid>
    </Grid>


    <Grid container spacing={1} sx={{width:"98%",margin:"auto"}}>
      {/* Single column */}
      <Grid item xs={12}>
        <img src="assets/images/home/13.png" alt="image" style={{ width: '100%' }} />
      </Grid>
    </Grid>



<Grid sx={{width:"96%",margin:"auto"}}>
    <Typography sx={{fontWeight:"bold",fontSize:"20px"}}align="left"  >Orginal</Typography>
    <Grid container spacing={1} >
     
  {[
    { id: 1, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/900_20240330120217596.png' },
    { id: 2, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/800.png' },
    { id: 3, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/112_20240330120138406.png' },
    { id: 4, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/110_20240330120322752.png' },
    { id: 5, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/110_20240330120322752.png' },
    { id: 6, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/107_20240330120337162.png' },
  ].map((image, index) => (
    <Grid item xs={4} sm={4} md={4} lg={4} key={image.id}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={image.src}
          alt={`image${image.id}`}
          style={{ width: 'auto', maxWidth: '100%', height: 'auto', maxHeight: '100%' }}
        />
      </div>
    </Grid>
  ))}
</Grid>

</Grid>

<Grid sx={{width:"96%",margin:"auto"}}>
<Typography sx={{fontWeight:"bold",fontSize:"20px"}} align="left" > Platform Recommendation</Typography>
    <Grid container spacing={1} >
     
  {[
    { id: 1, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/800.png' },
    { id: 2, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/JDB/7006.png' },
    { id: 3, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/EVO_Electronic/harlecoin0000000.png' },
    { id: 4, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/EVO_Electronic/kitchendrqfrenzy.png' },
    { id: 5, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/EVO_Electronic/warofgods0000000.png' },
    { id: 6, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/V8Card/8910.png' },
  ].map((image, index) => (
    <Grid item xs={4} sm={4} md={4} lg={4} key={image.id}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={image.src}
          alt={`image${image.id}`}
          style={{ width: '124px', maxWidth: '100%', height: '174px', maxHeight: '100%' }}
        />
      </div>
    </Grid>
  ))}
</Grid>
</Grid>
<Grid sx={{width:"96%",margin:"auto"}}>
<Typography sx={{fontWeight:"bold",fontSize:"20px"}} align="left" >Slots</Typography>
    <Grid container spacing={1} >
     
  {[
    { id: 1, src: 'https://ossimg.envyenvelope.com/daman/vendorlogo/vendorlogo_2024011618151716a4.png' },
    { id: 2, src: 'https://ossimg.envyenvelope.com/daman/vendorlogo/vendorlogo_202401161814358lat.png' },
    { id: 3, src: 'https://ossimg.envyenvelope.com/daman/vendorlogo/vendorlogo_20240116181633lq6j.png' },
    { id: 4, src: 'https://ossimg.envyenvelope.com/daman/vendorlogo/vendorlogo_20240116181623alci.png' },
    { id: 5, src: 'https://ossimg.envyenvelope.com/daman/vendorlogo/vendorlogo_20240116181611q84s.png' },
    { id: 6, src: 'https://ossimg.envyenvelope.com/daman/vendorlogo/vendorlogo_20240116181455tg16.png' },
  ].map((image, index) => (
    <Grid item xs={4} sm={4} md={4} lg={4} key={image.id}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={image.src}
          alt={`image${image.id}`}
          style={{ width: '124px', maxWidth: '100%', height: '174px', maxHeight: '100%' }}
        />
      </div>
    </Grid>
  ))}
</Grid>
</Grid>
<Grid sx={{width:"96%",margin:"auto"}}>
<Typography sx={{fontWeight:"bold",fontSize:"20px"}} align="left" >Sports</Typography>
    <Grid container spacing={1} >
     
  {[
    { id: 1, src: 'https://ossimg.envyenvelope.com/daman/vendorlogo/vendorlogo_20240116181202hhjt.png' },
    { id: 2, src: 'https://ossimg.envyenvelope.com/daman/vendorlogo/vendorlogo_20240116181151vd4w.png' },
    { id: 3, src: 'https://ossimg.envyenvelope.com/daman/vendorlogo/vendorlogo_20240116181140kbrq.png' },
    { id: 4, src: 'https://ossimg.envyenvelope.com/daman/vendorlogo/vendorlogo_20240116181011v5fb.png' },
    { id: 5, src: 'https://ossimg.envyenvelope.com/daman/vendorlogo/vendorlogo_20240116180850im3d.png' },
    
  ].map((image, index) => (
    <Grid item xs={4} sm={4} md={4} lg={4} key={image.id}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={image.src}
          alt={`image${image.id}`}
          style={{ width: '125px', maxWidth: '100%', height: '174px', maxHeight: '100%' }}
        />
      </div>
    </Grid>
  ))}
</Grid>
</Grid>

<Grid sx={{width:"96%",margin:"auto"}}>
<Typography sx={{fontWeight:"bold",fontSize:"20px"}} align="left" >Casino</Typography>
    <Grid container spacing={1} >
     
  {[
    { id: 1, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/EVO_Video/CrazyTime0000001.png' },
    { id: 2, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/EVO_Video/AmericanTable001.png' },
    { id: 3, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/EVO_Video/48z5pjps3ntvqc1b.png' },
    { id: 4, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/AG_Video/ROU_EN.png' },
    { id: 5, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/EVO_Video/AndarBahar000001.png' },
    { id: 6, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/EVO_Video/BacBo00000000001.png' },
  ].map((image, index) => (
    <Grid item xs={4} sm={4} md={4} lg={4} key={image.id}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={image.src}
          alt={`image${image.id}`}
          style={{ width: 'auto', maxWidth: '100%', height: 'auto', maxHeight: '100%' }}
        />
      </div>
    </Grid>
  ))}
</Grid>
</Grid>
<Grid sx={{width:"96%",margin:"auto"}}>
<Typography sx={{fontWeight:"bold",fontSize:"20px"}} align="left" >Fishing</Typography>
<Grid container spacing={1}>
  {[
    { id: 1, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/CQ9/AB3.png' },
    { id: 2, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/CQ9/AT01.png' },
    { id: 3, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/CQ9/AT05.png' },
    { id: 4, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/CQ9/GO02.png' },
    { id: 5, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/JDB/7001.png' },
    { id: 6, src: 'https://ossimg.envyenvelope.com/daman/gamelogo/JDB/7002.png' },
  ].map((image, index) => (
    <Grid item xs={4} sm={4} md={4} lg={4} key={image.id}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgb(255,142,137)', // Add this line
        }}
      >
        <img
          src={image.src}
          alt={`image${image.id}`}
          style={{ width: '124px', maxWidth: '100%', height: '174px', maxHeight: '100%' }}
        />
      </div>
    </Grid>
  ))}
</Grid>
</Grid>


<Grid sx={{width:"96%",margin:"auto"}}>
<Typography sx={{fontWeight:"bold",fontSize:"20px"}} align="left" >Rummy</Typography>
    <Grid container spacing={1} >
     
  {[
    { id: 1, src: 'https://ossimg.envyenvelope.com/daman/vendorlogo/vendorlogo_202401161815294l5u.png' },
    { id: 2, src: 'https://ossimg.envyenvelope.com/daman/vendorlogo/vendorlogo_202401161815398gx3.png' },
    
  ].map((image, index) => (
    <Grid item xs={4} sm={4} md={4} lg={4} key={image.id}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={image.src}
          alt={`image${image.id}`}
          style={{ width: '124px', maxWidth: '100%', height: '174px', maxHeight: '100%' }}
        />
      </div>
    </Grid>
  ))}
</Grid>
</Grid>
           
            <Grid sx={{marginTop:"190px"}} >
            <Two/>
            </Grid>
<Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', marginLeft: "5px",marginRight:"5px",marginTop:"250px",marginBottom:"300px" }}>

<Stage/>
</Grid>
            {/* content end */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default Home