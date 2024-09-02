// import { Container, Typography, CardContent, Card, Rating, useMediaQuery } from '@mui/material';
// import React from 'react';
// import Grid from '@mui/material/Unstable_Grid2';

// const cardData = [
//   {
//     title: 'Titulo Testimonio 1 ',
//     value: 5,
//     subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis eleifend quam. ',
//     author: 'Autor 1',
//     bussines: 'Empresa 1',
//   },
//   {
//     title: 'Titulo Testimonio 2 ',
//     value: 4,
//     subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis eleifend quam. ',
//     author: 'Autor 2',
//     bussines: 'Empresa 2',
//   },
//   {
//     title: 'Titulo Testimonio 3 ',
//     value: 5,
//     subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis eleifend quam. ',
//     author: 'Autor 3',
//     bussines: 'Empresa 3',
//   },
// ];

// export const Testimonials = () => {
//   const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
//   return (
//     <Container maxWidth='xxl'>
//       <Container
//         id='testimonials'
//         maxWidth='lg'
//         sx={{ py: 10 }}
//       >
//         <Grid container>
//           <Grid
//             xs={12}
//             md={12}
//           >
//             <Typography
//               variant={mdUp ? 'h2' : 'h3'}
//               textAlign='center'
//             >
//               Testimonios
//             </Typography>
//             <Typography
//               textAlign='center'
//               variant='subtitle1'
//             >
//               Testimonios reales de empresas que han mejorado la salud y el bienestar de sus equipos con nuestros
//               servicios.
//             </Typography>
//           </Grid>

//           <Grid
//             xs={12}
//             md={12}
//             container
//             spacing={4}
//             marginTop={2}
//           >
//             {cardData.map((item, index) => (
//               <Grid
//                 key={index}
//                 xs={12}
//                 md={4}
//               >
//                 <Card sx={{ minWidth: 275, backgroundColor: 'primary.main' }}>
//                   <CardContent>
//                     <Rating
//                       name='read-only'
//                       value={item.value}
//                       readOnly
//                       sx={{ color: 'white' }}
//                     />
//                     <Typography
//                       variant='h5'
//                       color='white'
//                     >
//                       {item.title}
//                     </Typography>

//                     <Typography
//                       variant='body2'
//                       marginTop={2}
//                       color='white'
//                     >
//                       {item.subtitle}
//                     </Typography>
//                     <Typography
//                       variant='body2'
//                       marginTop={2}
//                       color='white'
//                     >
//                       {item.author}
//                     </Typography>
//                     <Typography
//                       variant='caption'
//                       marginTop={2}
//                       color='white'
//                     >
//                       {item.bussines}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Grid>
//       </Container>
//     </Container>
//   );
// };
