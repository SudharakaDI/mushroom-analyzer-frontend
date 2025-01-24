import PotStockCard from "../components/PotStockCard.jsx";
import Grid from '@mui/material/Grid2';
import "../css/Home.css";
import {useEffect, useState} from "react";
import {fetchPotStocks} from "../services/apiService.js";

function Home(){
    const [potStocks, setPotStocks] = useState([]);

    useEffect( () => {
        const loadPotStocks = async () => {
            try {
                const potStocks = await fetchPotStocks();
                setPotStocks(potStocks);
            } catch (err) {
                console.log(err);
            }
        };
        loadPotStocks();
    },[]);



    return (
        <div className="home">
            <Grid container spacing={2}>
                {potStocks && potStocks.map((potStock) => (
                    <Grid key={potStock.id}>
                        <PotStockCard name={potStock.mushroomType} potCount={potStock.numberOfPots} supplier={potStock.mushroomSupplier.name}/>
                    </Grid>
                ))}

            </Grid>
        </div>

    );
}

export default Home;