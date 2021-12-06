import Avatar from '@mui/material/Avatar';
import { Card, CardMedia, CardHeader, CardContent, CardActionArea, CardActions } from '@mui/material';
import Chip from '@mui/material/Chip';


const ProfileInfoCard = ({company, title, location, start, end}) =>{
    return (<CardActionArea>
                <CardHeader
                avatar={
                    <Avatar alt="Yamaha" src="https://www.adacgj.com/uploads/1/2/3/7/123777558/yamaha-icon-26_orig.jpg" />
                }
                title={title}
                subheader={company}
                />
                <p>{location}</p>
                <p>{start}</p>
                <p>{end}</p>
            </CardActionArea>)
}

export default ProfileInfoCard;