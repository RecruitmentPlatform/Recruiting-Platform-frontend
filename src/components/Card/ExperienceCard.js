import Avatar from '@mui/material/Avatar';
import { Card, CardMedia, CardHeader, CardContent, CardActionArea, CardActions } from '@mui/material';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const ExperienceCard = ({title, employment, company, location, startMonth, startYear, endMonth, endYear
, description}) =>{
  var date = null;
  if(startMonth != null & startYear != null)
    date = startMonth + ", " + startYear + " - "+ (endMonth & endYear?endMonth + ", " + endYear:"Present");

    return (<CardActionArea>
                <CardHeader sx = {{pb:1}}
                avatar={
                  <Avatar alt={company} src={"//logo.clearbit.com/"+company.toLowerCase()+".com"} />
                }
                title={title}
                subheader={company}
                />
                <CardContent sx = {{pt:0}}>
                  <Stack direction="row" spacing={1} sx={{pb:1}}>
                    {employment?<Chip label={employment} size="small" icon={<WorkIcon />} />:null}
                    {location?<Chip label={location} size="small" icon={<LocationOnIcon />} />:null}
                    {date?<Chip label={date} size="small" icon={<AccessTimeFilledIcon />} />:null}
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                </CardContent>
            </CardActionArea>)
}

export default ExperienceCard;
