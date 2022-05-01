import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import postImg from './../assets/images/post.jpeg';

export default function CardStats2(props) {
  const {heading, subject} = props;
  return (
    <Card >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={postImg}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {heading}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subject}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Read Complete
        </Button>
      </CardActions>
    </Card>
  );
}
