import Avatar from '@mui/material/Avatar';
import { Card, CardMedia, CardHeader, CardContent, CardActionArea, CardActions } from '@mui/material';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';


const ExperienceCard = ({company, title, location, start, end, description}) =>{
    return (<CardActionArea>
                <CardHeader
                avatar={
                  <Avatar alt={company} src={"//logo.clearbit.com/"+company.toLowerCase()+".com"} />
                }
                title={title}
                subheader={company}
                />
                <CardContent>
                  <p>{location}</p>
                  <p>{start}</p>
                  <p>{end}</p>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                </CardContent>
            </CardActionArea>)
}

export default ExperienceCard;
