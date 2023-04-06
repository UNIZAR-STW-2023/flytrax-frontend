import React, { useEffect, useState } from "react";
import { ChevronRightOutlined, HomeOutlined, TodayOutlined, CalendarMonthOutlined, AdminPanelSettingsOutlined, PieChartOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { HiViewList } from 'react-icons/hi';

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Estadisticas",
    icon: null,
  },
  {
    text: "Diario",
    icon: <TodayOutlined />,
  },
  {
    text: "Mensual",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Resumen",
    icon: <PieChartOutlined />,
  },
  {
    text: "Gestión",
    icon: null,
  },
  {
    text: "Usuarios",
    icon: <AdminPanelSettingsOutlined />,
  },
];

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    
    const [active, setActive] = useState("");
    const router = useRouter();
    
    const [state, setState] = useState({
        left: false,
    });

    const goToPage = (page) => {
        router.push(`/admin/${page}`)
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event).key === 'Tab' ||
            (event).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
   
        <List className="mt-28">    
            {navItems.map(({ text, icon }) => {
                if (!icon) {
                    return (
                        <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }} className="font-semibold">
                            {text}
                        </Typography>
                    );
                }
            
                const lcText = text.toLowerCase();

                return (
                <ListItem key={text} disablePadding>
                    <ListItemButton
                        onClick={() => {
                            goToPage(`${lcText}`)
                            setActive(lcText);
                        }}
                    >
                    <ListItemIcon
                        sx={{
                            ml: "2rem",
                        }}
                    >
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                        {active === lcText && (
                            <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                    </ListItemButton>
                </ListItem>
                );
            })}
        </List>
                    
      );

    return (
        
        <div>
            {(['left']).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                        <HiViewList size={30} />
                    </Button>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                        sx={{
                            width: "250px",
                            "& .MuiDrawer-paper": {
                                boxSixing: "border-box",
                                borderWidth: "2px",
                                width: "250px",
                            },
                        }}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>

    );
};

export default Sidebar;