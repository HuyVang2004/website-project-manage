import { Routes , Route } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import HomePage from "./pages/user/homePage"
import MasterLayout from "./pages/user/theme/masterLayout";
import ProfilePage from "./pages/user/profilePage";

const renderUserRouter = () => {
    const userRouter = [
        {
            path : ROUTERS.USER.HOME,
            component : <HomePage />
        },
        {
            path : ROUTERS.USER.PROFILE,
            component : <ProfilePage />
        }
    ]
    return (
        <MasterLayout>
            <Routes>
                {
                    userRouter.map((item, key) => (
                        <Route key={key} path={item.path} element={item.component} />      
                    ))
                }
            </Routes>
        </MasterLayout>
    );
};


const RouterCustom = () => { 
    return renderUserRouter() ;
};

export default RouterCustom;