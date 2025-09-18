import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery,
  useTheme,
  SvgIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useLocation } from "react-router-dom";
import { PATH_WEBPAGE } from "../routes/paths";

// Map paths -> tab index
const getTabIndex = (path) => {
  if (path.startsWith(PATH_WEBPAGE.general.experience)) return 1;
  if (path.startsWith(PATH_WEBPAGE.general.playground)) return 2;
  return 0; // Home
};

// Playground icon
const PlaygroundSlideIcon = (props) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path d="M6 3v10" stroke="currentColor" strokeWidth="1" fill="none" />
    <path d="M8 3v10" stroke="currentColor" strokeWidth="1" fill="none" />
    <path d="M6 7h4" stroke="currentColor" strokeWidth="1" fill="none" />
    <path d="M10 13c2-1 6-3 9-6v3c-3 3-6 5-8 6-1 0-2 0-3-1" stroke="currentColor" strokeWidth="1" fill="none" />
    <path d="M3 20h18v1H3z" fill="currentColor" />
  </SvgIcon>
);

// Experience icon
const ExperienceEIcon = (props) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <rect x="3" y="4" width="14" height="16" rx="0" ry="0" fill="currentColor" />
    <rect x="6" y="7" width="8" height="2" fill="#000" />
    <rect x="6" y="11" width="8" height="2" fill="#000" />
    <rect x="6" y="15" width="8" height="2" fill="#000" />
  </SvgIcon>
);

const Navbar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [value, setValue] = useState(getTabIndex(location.pathname));
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setValue(getTabIndex(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDrawer = () => setMobileOpen((s) => !s);

  const items = [
    { label: "Home", key: "home", icon: <HomeIcon fontSize="small" /> },
    {
      label: "Experience",
      key: "experience",
      icon: <ExperienceEIcon fontSize="small" />,
    },
    {
      label: "Playground",
      key: "playground",
      icon: <PlaygroundSlideIcon fontSize="small" />,
    },
  ];

  // Wrapper sx for desktop/mobile alignment toggle
  const wrapperSx = isMobile
    ? {
        position: "fixed",
        top: 12,
        right: 12,
        zIndex: 1300,
        pointerEvents: "none",
        transform: "none",
      }
    : {
        position: "fixed",
        top: "50%",
        right: 12,
        transform: "translateY(-50%)",
        zIndex: 1300,
        pointerEvents: "none",
      };

  return (
    <Box component="nav" sx={wrapperSx}>
      <Stack
        direction="column"
        spacing={1}
        sx={{ pointerEvents: "none" }}
        alignItems="center"
      >
        <Box
          sx={{
            pointerEvents: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            bgcolor: scrolled ? "rgba(15,15,15,0.95)" : "rgba(15,15,15,0.85)",
            px: 1,
            py: 1,
            border: "3px solid #2b2b2b",
            boxShadow: "6px 6px 0 rgba(0,0,0,0.6)",
            borderRadius: 0,
            alignItems: "center",
          }}
        >
          {!isMobile ? (
            items.map((it, idx) => {
              const active = value === idx;
              return (
                <Tooltip key={it.key} title={it.label} placement="left">
                  <IconButton
                    component={Link}
                    to={PATH_WEBPAGE.general[it.key]}
                    aria-label={it.label}
                    onClick={() => setValue(idx)}
                    disableRipple
                    sx={{
                      width: 48,
                      height: 48,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: active ? "#0b0b0b" : "transparent",
                      color: active ? "#fff" : "rgba(245,245,245,0.85)",
                      border: active ? "2px solid #000" : "2px solid transparent",
                      boxShadow: active
                        ? "0 0 0 2px #fff inset, 0 0 0 2px #000"
                        : "none",
                      fontFamily: '"Press Start 2P", monospace',
                      borderRadius: 0,
                      px: 0.5,
                      "&:hover": {
                        bgcolor: "#111",
                        color: "#fff",
                        transform: "translateX(-2px)",
                      },
                    }}
                  >
                    {idx === 1 ? (
                      <ExperienceEIcon sx={{ width: 22, height: 22, color: active ? "#7fffd4" : "inherit" }} />
                    ) : idx === 2 ? (
                      <PlaygroundSlideIcon sx={{ width: 22, height: 22, color: active ? "#7fffd4" : "inherit" }} />
                    ) : (
                      <HomeIcon sx={{ width: 20, height: 20, color: active ? "#7fffd4" : "inherit" }} />
                    )}
                  </IconButton>
                </Tooltip>
              );
            })
          ) : (
            <IconButton
              aria-label="menu"
              onClick={toggleDrawer}
              edge="start"
              sx={{
                color: "#fff",
                border: "2px solid #000",
                boxShadow: "0 0 0 2px #fff inset, 0 0 0 2px #000",
                borderRadius: 0,
                width: 44,
                height: 44,
                background: scrolled ? "#0b0b0b" : "transparent",
              }}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
          )}

          <Box sx={{ mt: 0.5 }}>
            <Link
              to="https://github.com/CutlassTM"
              target="_blank"
              rel="noopener noreferrer"
              style={{ outline: "none", display: "inline-flex" }}
            >
              <img
                src="/githubIcon.png"
                alt="GitHub"
                width={18}
                height={18}
                style={{ cursor: "pointer" }}
              />
            </Link>
          </Box>
        </Box>
      </Stack>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            bgcolor: "#0d0d0d",
            color: "#fff",
            width: 260,
            borderLeft: "2px solid #000",
            boxShadow: "0 0 0 2px #fff inset, 0 0 0 2px #000",
            borderRadius: 0,
          },
        }}
      >
        <List sx={{ py: 1 }}>
          {items.map((it, idx) => {
            const active = value === idx;
            return (
              <ListItem
                key={it.key}
                button
                component={Link}
                to={PATH_WEBPAGE.general[it.key]}
                onClick={() => {
                  setValue(idx);
                  toggleDrawer();
                }}
                sx={{
                  borderBottom: "2px solid #000",
                  bgcolor: active ? "#111" : "transparent",
                  "&:hover": { bgcolor: "#161616" },
                  px: 2,
                  py: 1.25,
                  borderRadius: 0,
                }}
              >
                <ListItemIcon sx={{ color: active ? "#7fffd4" : "inherit" }}>{it.icon}</ListItemIcon>
                <ListItemText
                  primary={it.label}
                  primaryTypographyProps={{
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: 12,
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;
