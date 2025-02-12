
import '../css/Production.css';
import {useEffect, useState} from "react";
import ExpandableProductionTable from "../components/ExpandableProductionTable.jsx";
import {fetchPotStocksMinimal} from "../services/apiService.js";


function Production() {
    const [potStocks, setPotStocks] = useState([]);
    const [selectedPotStock, setSelectedPotStock] = useState(null)

    useEffect(() => {
        const loadPotStocks = async () => {
            try {
                const potStocks = await fetchPotStocksMinimal();
                setPotStocks((prev) => {
                    if (potStocks.length > 0) {
                        setSelectedPotStock(potStocks[0].id);
                    }
                    return potStocks;
                });
            } catch (err) {
                console.log(err);
            }
        };
        loadPotStocks();

    },[]);


    return (
        <div className="production">
            <select
                value={selectedPotStock || ""}
                onChange={(e) => setSelectedPotStock(e.target.value)}
                style={{
                    padding: '5px',
                    flex: 1,
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                }}
            >
                <option value="" disabled>
                    Select Pot Stock
                </option>
                {potStocks.map((potStock) => (
                    <option key={potStock.id} value={potStock.id}>
                        {potStock.description}
                    </option>
                ))}
            </select>
            <h1>Productions</h1>
            <ExpandableProductionTable potStockId={selectedPotStock}/>
        </div>

    )
}

export default Production;