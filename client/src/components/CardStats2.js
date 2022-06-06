import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import postImg from './../assets/images/post.jpeg';

export default function CardStats2(props) {
  const { heading, subject, cardActions, allData, img} = props;
  let cardActionsCont = <></>;

  if(cardActions && cardActions.length > 0) {
    cardActionsCont = cardActions.map(action => {
      if (action.label === 'read_more') {
        return <Button size="small"  onClick={() => action.fun({status: true, data: allData})} color="primary"> Read Complete </Button>
      } else if (action.label === 'delete') {
        return <Button size="small" onClick={() => action.fun(true)} sx={{ color: 'red' }}> Delete </Button>
      } else {
        return <></>
      }
    })
  }
  let imgUrl;
  if(img) {
    imgUrl = img;
  } else {
    imgUrl = postImg;
  }
  return (
    <Card >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imgUrl}
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
        {cardActionsCont}
      </CardActions>
    </Card>
  );
}
