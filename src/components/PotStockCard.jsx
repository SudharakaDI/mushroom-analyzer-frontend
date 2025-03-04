import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProductionDialog from "./ProductionDialog.jsx";
import {useState} from "react";
import ExpenseDialogCapital from "./ExpenseDialogCapital.jsx";

export default function PotStockCard({name, potCount, supplier, potStockId}) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleExpenseDialogOpen = () => {
        setExpenseDialogOpen(true);
    };

    const handleExpenseDialogClose = () => {
        setExpenseDialogOpen(false);
    };

    return (
        <div>
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
                    <Button onClick={handleDialogOpen} size="medium">Add Production</Button>
                    <Button onClick={handleExpenseDialogOpen} size="medium">Add Expense</Button>
                </CardActions>
            </Card>
            <ProductionDialog  open={dialogOpen} onClose={handleDialogClose} potStockId={potStockId} />
            <ExpenseDialogCapital open={expenseDialogOpen} onClose={handleExpenseDialogClose} potStockId={potStockId} />
        </div>

    );
}
