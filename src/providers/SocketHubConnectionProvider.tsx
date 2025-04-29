import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { SERVER_BASE_URL } from "../constants/domain";
import { SocketConnectionProvider } from "../contexts/socketHubConnectionContext";
import { FC, ReactNode, memo, useEffect, useState } from "react";
export type SocketHubConnectionProviderProps = { children: ReactNode };
const SocketHubConnectionProvider: FC<SocketHubConnectionProviderProps> = ({ children }) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  const createHubConnection = () => {
    const connection = new HubConnectionBuilder()
      .withUrl(`${SERVER_BASE_URL}/safra`)
      .withAutomaticReconnect()
      .build();
    connection.start().then(() => {
      setConnection(connection);
    });

    return connection;
  };
  useEffect(() => {
    const connection = createHubConnection();
    return () => {
      if (connection.connectionId) connection.stop().then(() => setConnection(null));
      else setConnection(null);
    };
  }, []);
  return <SocketConnectionProvider value={connection}>{children}</SocketConnectionProvider>;
};
export default memo(SocketHubConnectionProvider);
