"use client";

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { Box, useMediaQuery, Theme } from '@mui/material';
import { dataLinks } from '@/utils/data';
import { ListItemLinks } from './ListItemLinks';

export const Sidebar = () => {
  const isXlOrAbove = useMediaQuery('(min-width:1200px)');

  if (!isXlOrAbove) {
    return null;
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 290, pr: "1rem" }}>
      <List
        sx={{ 
          maxHeight: "calc(100vh - 58px - 8rem)", 
          position: "sticky", 
          top: "4rem", 
          overflowY: "auto"
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader 
            component="div" 
            id="nested-list-subheader" 
            sx={{ bgcolor: "transparent", position: "initial"}}
          >
            Blog&apos;s disponíveis
          </ListSubheader>
        }
      >
        {
          dataLinks.map((link, index) => (
            <ListItemLinks key={index} dataLink={link}/>
          ))
        }
      </List> 
    </Box>
  );
}
