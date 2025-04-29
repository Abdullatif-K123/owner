import { HubConnection } from "@microsoft/signalr";
import { createContext, useContext } from "react";

const socketHubConnectionContext = createContext<HubConnection | null>(null);

export const useSocketConnectionContext = () => useContext(socketHubConnectionContext);

export const SocketConnectionProvider = socketHubConnectionContext.Provider;
