import Connect from './components/connect_page/connect'
import Accueil from  './components/accueil_page/accueil'
import GetAllUsers from  './components/getAllUsers_page/getAllUsers'
import MyAccount from  './components/myAccount_page/myAccount'

export default [
    {path: '/', component: Connect},
    {path: '/accueil', component: Accueil},
    {path: '/getallusers', component: GetAllUsers},
    {path: '/myaccount', component: MyAccount}
]