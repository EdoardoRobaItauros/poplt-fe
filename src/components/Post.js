import '../App.css';
import * as React from 'react';

import { Card, CardActions, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Post(props) {

  const likePost = () => {
    props.content.isliked = props.content.isliked ? !props.content.isliked : true
    props.updateContent(props.content.id, props.content.isliked)
  }

  return <Card style={{ marginLeft: "auto", marginRight: "auto", alignItems: "center" }} sx={{ maxWidth: "60%" }}>
    <CardHeader
      title={props.content.first_name + " " + props.content.last_name}
      subheader={props.content.instagram_uname}
    />
    <CardMedia
      component="img"
      height="194"
      image={props.content.image_url}
      alt={props.content.image_url}
    />
    <CardActions disableSpacing>
      <IconButton onClick={() => { likePost() }} aria-label="Like">
        {props.content.isliked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <Typography variant="subtitle1" gutterBottom>
        {props.content.likes.toString() + " likes"}
      </Typography>
    </CardActions>
  </Card>
}

export default Post;