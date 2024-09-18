"use client";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { ArrowRight, BriefcaseBusiness, LogIn, LogOut, Mail, Menu as MenuLucide, Plus } from 'lucide-react';
import { Avatar, Divider, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { lightBlue } from '@mui/material/colors';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import useLogout from '@/hooks/auth/useLogout';

export const Navbar = () => {
  const [anchorElAvatar, setAnchorElAvatar] = useState<HTMLElement | null>(null);
  const openAvatar = Boolean(anchorElAvatar);

  const [anchorElMenu, setAnchorElMenu] = useState<HTMLElement | null>(null);
  const openMenu = Boolean(anchorElMenu);

  const { isAdmin, isLogged, username, id } = useAuth()
  const logout = useLogout();

  const handleLogout = () => {
    logout();
    setAnchorElAvatar(null);
    router.push("/")
  };

  const handleClickAvatar = (event: MouseEvent<HTMLElement>) => {
    setAnchorElAvatar(event.currentTarget);
  };
  const handleCloseAvatar = () => {
    setAnchorElAvatar(null);
  };

  const handleClickMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  const router = useRouter();

  const handleAddBlog = () => {
    router.push('/criar-blog');
  };

  return (
    <>
      <div style={{ height: "58px" }} />
      <AppBar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            px: "1rem",
            py: "0.5rem",
            maxWidth: "1680px",
            width: "100%",
            margin: "auto",
          }}
        >
          <div>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClickAvatar}
                  size="small"
                  aria-controls={openAvatar ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openAvatar ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }} />
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorElAvatar}
              id="account-menu"
              open={openAvatar}
              onClose={handleCloseAvatar}
              onClick={handleCloseAvatar}
              disableScrollLock
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  position: "absolute",
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 16,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'left', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleCloseAvatar} component={Link} href={isLogged? `/user/${id}` : `/auth/login`}>
                <Avatar /> {isLogged ? username : "Profile"}
              </MenuItem>
              <Divider />
              {
                !isLogged ? (
                  <MenuItem onClick={handleCloseAvatar} component={Link} href="/auth/login">
                    <ListItemIcon>
                      <LogIn size={20} />
                    </ListItemIcon>
                    Login
                  </MenuItem>
                ) : (
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogOut size={20} />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                )
              }
            </Menu>
          </div>
          <div>
            {
              isAdmin && (
                <Button
                  variant="contained"
                  color="secondary"
                  size='small'
                  onClick={handleAddBlog}
                  sx={{ mr: 2 }}
                  startIcon={<Plus/>}
                >
                  Blog
                </Button>
              )
            }
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleClickMenu}
              aria-controls={openMenu ? 'menu-options' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
            >
              <MenuLucide />
            </IconButton>
            <Menu
              anchorEl={anchorElMenu}
              id="menu-options"
              open={openMenu}
              onClose={handleCloseMenu}
              onClick={handleCloseMenu}
              disableScrollLock
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  position: "absolute",
                  width: "150px",
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 16,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleCloseMenu} component={Link} href="/" sx={{ color: lightBlue[800] }}>
                <ListItemIcon sx={{ color: lightBlue[800] }}>
                  <ArrowRight size={20} />
                </ListItemIcon>
                Home
              </MenuItem>
              <MenuItem onClick={handleCloseMenu} component={Link} href="/galeria" sx={{ color: lightBlue[800] }}>
                <ListItemIcon sx={{ color: lightBlue[800] }}>
                  <ArrowRight size={20} />
                </ListItemIcon>
                Galeria
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleCloseMenu} component="a" href="#contato">
                <ListItemIcon>
                  <Mail size={20} />
                </ListItemIcon>
                Contato
              </MenuItem>
              <MenuItem onClick={handleCloseMenu} component="a" href="https://diegocardoso.vercel.app/" target="_blank">
                <ListItemIcon>
                  <BriefcaseBusiness size={20} />
                </ListItemIcon>
                Portfólio
              </MenuItem>
            </Menu>
          </div>
        </Box>
      </AppBar>
    </>
  );
};
