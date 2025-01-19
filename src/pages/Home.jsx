import PotStockCard from "../components/PotStockCard.jsx";
import Grid from '@mui/material/Grid2';
import "../css/Home.css";
import axios from "axios";
import {useEffect, useState} from "react";

const baseURL = "http://localhost:8080/mushroom-analyzer/backend/api/v1/pot-stock";

function Home(){
    const [potStocks, setPotStocks] = useState([]);

    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setPotStocks(response.data);
        })
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