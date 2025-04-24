import Card from "@mui/material/Card";
import React from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import PageLayout from "examples/LayoutContainers/PageLayout";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";


function BienesView(){
    return(
        <Card sx={{ height: "100%" }}>
            <DefaultNavbar />
            <PageLayout title="Bienes" breadcrumbs={[{ name: "Bienes", href: "/bienes" }]}>
                <div className="Bienes">
                    <h1>Bienes</h1>
                    <p>Esta es la página de Bienes.</p>
                </div>
            </PageLayout>
        </Card>
    );
}









export default BienesView;