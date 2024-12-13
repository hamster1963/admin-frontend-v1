import { getServers } from "@/api/server"
import { getServerGroups } from "@/api/server-group"
import { ServerContextProps } from "@/types"
import { createContext, useContext, useEffect, useMemo } from "react"
import { useLocation } from "react-router-dom"

import { useServerStore } from "./useServerStore"

const ServerContext = createContext<ServerContextProps>({})

interface ServerProviderProps {
    children: React.ReactNode
    withServer?: boolean
    withServerGroup?: boolean
}

export const ServerProvider: React.FC<ServerProviderProps> = ({
    children,
    withServer,
    withServerGroup,
}) => {
    const serverGroup = useServerStore((store) => store.serverGroup)
    const setServerGroup = useServerStore((store) => store.setServerGroup)

    const server = useServerStore((store) => store.server)
    const setServer = useServerStore((store) => store.setServer)

    const location = useLocation()

    useEffect(() => {
        if (withServerGroup)
            (async () => {
                try {
                    const sg = await getServerGroups()
                    setServerGroup(sg)
                } catch (error) {
                    console.log("setServerGroup error: ", error)
                    setServerGroup(undefined)
                }
            })()
        if (withServer)
            (async () => {
                try {
                    const s = await getServers()
                    const serverData = s.map(({ id, name }) => ({ id, name }))
                    // @ts-expect-error serverData is not a Server type
                    setServer(serverData)
                } catch (error) {
                    console.log("setServer error: ", error)
                    setServer(undefined)
                }
            })()
    }, [location.pathname])

    const value: ServerContextProps = useMemo(
        () => ({
            servers: server,
            serverGroups: serverGroup,
        }),
        [server, serverGroup],
    )
    return <ServerContext.Provider value={value}>{children}</ServerContext.Provider>
}

export const useServer = () => {
    return useContext(ServerContext)
}
