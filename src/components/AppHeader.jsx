import { Link, Outlet } from "react-router-dom"
import '../styles/appHeader.css'

const AppHeader = () => {
    return(
        <>
            <header>
                <Link to="/">
                    <h1>
                        Streamer Spotlight App
                    </h1>
                </Link>
            </header>
            <Outlet/>
        </>
    )
}

export default AppHeader