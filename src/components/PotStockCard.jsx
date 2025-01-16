import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PotStockCard({name, potCount, supplier}) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="src/assets/mushroom.jpg"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    No of Pots: {potCount}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Supplier: {supplier}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="medium">Add Production</Button>
                <Button size="medium">Add Expense</Button>
            </CardActions>
        </Card>
    );
}
