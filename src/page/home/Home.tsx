import { useAuth } from "../../contexts/Auth"
import Header from "./Header"

const Home: React.FC = () => {
    const { user } = useAuth();
    
    return (
        <div>
            <Header 
                onLogout={() => {
                    
                }}
                isLoggedIn={Boolean(user)} userType={user?.userType!} />
        </div>
    )
}

export default Home