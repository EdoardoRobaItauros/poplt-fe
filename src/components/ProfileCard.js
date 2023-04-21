import * as React from 'react';
import '../App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const randomImage = "https://t4.ftcdn.net/jpg/01/25/86/35/360_F_125863509_jaISqQt7MOfhOT3UxRTHZoEbMmmFYIr8.jpg"

function ProfileCard(props) {

    return <Card sx={{ height:"100vh" }}>
        <CardMedia
            sx={{ height: "40vh" }}
            image={randomImage}
            title={props.user.instagram_uname}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {props.user.first_name + " " + props.user.last_name}
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
                username: {props.user.instagram_uname}
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
                gender: {props.user.gender}
            </Typography>
        </CardContent>
    </Card>
}

export default ProfileCard;