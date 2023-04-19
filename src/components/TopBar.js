import * as React from 'react';
import { paths } from '../config/config';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Menu } from '@mui/icons-material';
import { Button, Drawer, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';

function TopBar() {

    const [openLeft, setOpenLeft] = React.useState(false)
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const toggleDrawer = () => {
        setOpenLeft((prev) => !prev)
    }

    const list = () => (
        <List>
            {Object.entries(paths).map((page) => (
                <ListItem key={page[0]}>
                    <Button
                        key={page}
                        onClick={() => {
                            handleCloseNavMenu()
                            toggleDrawer()
                        }}
                    >
                        <Link to={page[1].url}>{page[1].label}</Link>
                    </Button>
                </ListItem>
            ))
            }
        </List >
        // </Box>
    );

    return <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <IconButton onClick={toggleDrawer}
                        style={{ color: 'white' }}>
                        <Menu />
                    </IconButton>
                    <Drawer
                        anchor={"left"}
                        open={openLeft}
                        onClose={toggleDrawer}
                    >
                        {list()}
                    </Drawer>
                </Box>
            </Toolbar>
        </AppBar>
    </Box>
}

export default TopBar;