import { useAuth0 } from "@auth0/auth0-react"
import { ReactElement, useEffect, useState } from "react"

type AuthNavigatorProps = {
    no_login: ReactElement,
    login: ReactElement
}

function AuthNavigator({ no_login, login }: AuthNavigatorProps) {
    const { isAuthenticated, isLoading } = useAuth0()

    const [display, set_display] = useState<ReactElement>(no_login)

    useEffect(() => {
        if (isAuthenticated) {
            set_display(login)
        }
    }, [isLoading, isAuthenticated])

    return display
}

export default AuthNavigator