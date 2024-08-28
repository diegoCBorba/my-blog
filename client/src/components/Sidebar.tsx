"use client";

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { Box, useMediaQuery, Skeleton } from '@mui/material';
import { ListItemLinks } from './ListItemLinks';
import { useGroupedBlogs } from '@/hooks/blog/useGroupedBlogs';

export const Sidebar = () => {
  const isXlOrAbove = useMediaQuery('(min-width:1200px)');
  const { data, isLoading, error } = useGroupedBlogs();

  if (!isXlOrAbove) {
    return null;
  }

  if (isLoading) {
    return (
      <Box sx={{ maxWidth: 290 }}>
        <Skeleton variant="rectangular" width="290px" height={30} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" height={30} sx={{ ml: 4, mb: 1 }} />
        <Skeleton variant="rectangular" height={30} sx={{ ml: 4, mb: 1 }} />
      </Box>
    );
  }

  if (error) {
    return <div>Error loading blogs</div>;
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
            sx={{ bgcolor: "transparent", position: "initial" }}
          >
            Blog&apos;s disponíveis
          </ListSubheader>
        }
      >
        {data?.map((link, index) => (
          <ListItemLinks key={index} dataLink={link} />
        ))}
      </List> 
    </Box>
  );
}
