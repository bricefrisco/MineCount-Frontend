import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CssBaseline} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navigation from "./components/Navigation";
import Admin from "./pages/Admin";
import Ping from "./pages/Ping";

const theme = createTheme({
    typography: {
        fontFamily: 'Roboto'
    },
    palette: {
        mode: 'dark',
        background: {
            default: '#181616'
        },
    },
    navbar: {
        width: 240
    }
})

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Navigation />
            <Routes>
                <Route path='/' element={<App/>}/>
                <Route path='/servers' element={<div>add-server</div>}/>
                <Route path='/ping' element={<Ping />}/>
                <Route path='/add-server' element={<div>add-server</div>}/>
                <Route path='/admin' element={<Admin />}/>
            </Routes>
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
