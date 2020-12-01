import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Server from "../Server";

export enum ConnectionState {
    CONNECTING,
    CONNECTED,
    NOT_CONNECTED,
    CONNECTION_FAILED
}

interface AppSliceState {
    connectionState: ConnectionState
}

let initialState: AppSliceState = {
    connectionState: ConnectionState.NOT_CONNECTED
};

export const connectToServer = createAsyncThunk(
    'connect',
    async (address: string, thunkAPI) => {
        await Server.connect(address);
    }
)

let appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        disconnect: (state) => {
            state.connectionState = ConnectionState.CONNECTION_FAILED
        }
    },
    extraReducers: builder => {
        builder.addCase(connectToServer.pending, (state, action) => {
            state.connectionState = ConnectionState.CONNECTING;
        });
        builder.addCase(connectToServer.fulfilled, (state, action) => {
            state.connectionState = ConnectionState.CONNECTED;
        });
        builder.addCase(connectToServer.rejected, (state, action) => {
            state.connectionState = ConnectionState.CONNECTION_FAILED;
        });
    }
});

export default appSlice;