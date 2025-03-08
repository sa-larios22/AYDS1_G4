import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import CollapsibleTable from "../components/Tabla";
import { HomeLayout } from "../components";
const Comprar = () => {
  return (

    <HomeLayout>
      <Card sx={{ 
        margin: 1, 
        width: 900 
        }}
      >
        <CardMedia
          component="img"
          sx={{ height: 270, objectFit: "cover", objectPosition: "top" }}
          image="https://fotografias.larazon.es/clipping/cmsimages02/2024/01/24/7523015D-F5DF-4A1D-9FBF-A125655508A9/calcula-que-dia-producen-120000-vuelos-aunque-numero-puede-ser-mayor_98.jpg?crop=4242,2387,x0,y221&width=1900&height=1069&optimize=low&format=webply"
          alt="Paella dish"
        />
        <CollapsibleTable />
        
      </Card>
    </HomeLayout>
  );
};

export default Comprar;
