import React from "react";
import useAuth from "../hooks/useAuth.jsx";
import SideBar from "../components/SideBar.jsx";

const DashboardView = function() {
    const { auth } = useAuth();
    
    return(
        <>
        <SideBar />
            {/* <MiniDrawer />
            <Grid container height="100vh">
                <Grid item xs={3}>
                    <Box sx={{background: "grey"}}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci accusamus 
                        nisi at dicta, nulla sequi inventore libero excepturi pariatur. Voluptate 
                        temporibus earum molestiae dicta inventore ipsa quisquam unde tenetur libero!
                    </Box>
                </Grid>
                <Grid item xs={6} sx={{background: "lightGrey"}}>
                    Welcome {auth?.user?.handle}
                </Grid>
                <Grid item xs={3} sx={{background: "grey"}}>
                </Grid>
            </Grid> */}
        </>
    );
};

export default DashboardView;