import PotStockCard from "../components/PotStockCard.jsx";
import Grid from '@mui/material/Grid2';
import "../css/Home.css";

function Home(){

    return (
        <div className="home">
            <Grid className=""container spacing={2}>
                <Grid >
                    <PotStockCard name='Pot Stock 1' potCount={1000} supplier='Kakulondara'/>
                </Grid>
                <Grid >
                    <PotStockCard name='Pot Stock 2' potCount={1250} supplier='Kakulondara'/>
                </Grid>

                <Grid >
                    <PotStockCard name='Pot Stock 2' potCount={1250} supplier='Kakulondara'/>
                </Grid>
            </Grid>



        </div>

    );
}

export default Home;