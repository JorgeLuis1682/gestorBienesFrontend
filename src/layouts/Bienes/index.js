import Card from "@mui/material/Card";
import React from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import PageLayout from "examples/LayoutContainers/PageLayout";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import icon from "assets/images/logos/alcaldia_favicon.png";
import Sidenav from "examples/Sidenav";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

function BienesView(){
    return(
        <DashboardLayout>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <div className="Bienes">
                    <h1>Bienes</h1>
                    <p>Esta es la página de Bienes.</p>
                </div>
        </Card>
        </DashboardLayout>
    );
}









export default BienesView;