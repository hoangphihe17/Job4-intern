import NotSignIn from "../pages/NotSignIn"
import SignIn from "../pages/SignIn";
import Profile from "../pages/Profile";
import HomeSignIn from "../pages/HomeSignIn";
// Public Routes
const publicRoutes = [
    { path: '/', component: NotSignIn},
    { path: '/login', component: SignIn},
    { path: '/profile', component: Profile},
    { path: '/home',component:HomeSignIn},
]


export  { publicRoutes}