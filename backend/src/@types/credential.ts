import { Document } from "mongoose";

export interface ICredential extends Document {
    dbType: string,
    dbName: string,
    username?: string,
    password?: string,
    isLocal: boolean,
    port?: string,
    clusterName?: string,
    organizationId: string
}