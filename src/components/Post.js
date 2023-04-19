import '../App.css';
import * as React from 'react';

import { Card, CardActions, CardHeader, CardMedia, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Post(props) {

    return <Card sx={{ maxWidth: 345 }}>
    <CardHeader
      title={props.content.first_name + " "+ props.content.last_name}
      subheader={props.content.instagram_uname}
    />
    <CardMedia
      component="img"
      height="194"
      image={props.content.image_url}
      alt={props.content.image_url}
    />
    <CardActions disableSpacing>
      <IconButton aria-label="Like">
        <FavoriteIcon />
      </IconButton>
    </CardActions>
  </Card>
}

export default Post;