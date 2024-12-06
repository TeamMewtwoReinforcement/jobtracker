import React from "react";
import BarChart from "./BarChart.js";
import TotalByStatus from "./TotalByStatus.tsx";

const DashboardPage = () => {
    return(
        <div style={{marginTop: '150px'}}>
        <div className="dashboard-container flex gap-0" style={{ gap: '8px' }}>
            <BarChart />
            <TotalByStatus />
        </div>
        </div>
    )
}

export default DashboardPage;