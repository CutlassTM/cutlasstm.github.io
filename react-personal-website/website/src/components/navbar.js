// Navbar.js
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Stack,
  Tab,
  Tabs,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import { PATH_WEBPAGE } from "../routes/paths";

/** Map paths -> tab index */
const getTabIndex = (path) => {
  if (path.startsWith(PATH_WEBPAGE.general.experience)) return 1;
  if (path.startsWith(PATH_WEBPAGE.general.playground)) return 2;
  if (path.startsWith(PATH_WEBPAGE.general.contact)) return 3;
  return 0; // Home
};

const Navbar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Only render on experience / playground / contact
  const visible = useMemo(() => {
    const allowed = [
      PATH_WEBPAGE.general.experience,
      PATH_WEBPAGE.general.playground,
      PATH_WEBPAGE.general.contact,
    ];
    return allowed.some((p) => location.pathname.startsWith(p));
  }, [location.pathname]);

  const [value, setValue] = useState(getTabIndex(location.pathname));
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Keep selected tab in sync with the URL
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
    { label: "Home", key: "home" },
    { label: "Experience", key: "experience" },
    { label: "Playground", key: "playground" },
    { label: "Contact", key: "contact" },
  ];

  if (!visible) return null;

  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        top: 10,
        left: 0,
        width: "100vw",
        zIndex: 1100,
        pointerEvents: "none",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ pointerEvents: "none" }}
      >
        <Box
          // 8-bit pixel card
          sx={{
            pointerEvents: "auto",
            px: 1.5,
            py: 0.5,
            bgcolor: scrolled ? "rgba(12,12,12,0.9)" : "rgba(12,12,12,0.7)",
            color: "#fff",
            border: "2px solid #1f1f1f",
            boxShadow:
              "0 0 0 2px #000 inset, 0 0 0 0 rgba(0,0,0,0.0), 0 2px 0 0 #000",
            borderRadius: 0,
            transform: "translateX(6vw)",
            transition: "background-color 200ms ease",
            height: 44,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {!isMobile ? (
            <Tabs
              value={value}
              onChange={(_, nv) => setValue(nv)}
              aria-label="site navigation"
              TabIndicatorProps={{ style: { height: 4 } }}
              sx={{
                minHeight: 0,
                "& .MuiTabs-flexContainer": {
                  gap: 0.5,
                },
                "& .MuiTabs-indicator": {
                  background: "#fff",
                  boxShadow: "0 0 0 2px #000",
                },
              }}
            >
              {items.map((it, idx) => (
                <Tab
                  key={it.key}
                  label={it.label}
                  component={Link}
                  to={PATH_WEBPAGE.general[it.key]}
                  disableRipple
                  sx={{
                    minHeight: 0,
                    minWidth: 0,
                    px: 1.25,
                    py: 0.25,
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: 11,
                    lineHeight: 1.2,
                    textTransform: "none",
                    letterSpacing: 0,
                    color: value === idx ? "#fff" : "rgba(255,255,255,0.75)",
                    "&.Mui-selected": {
                      color: "#fff",
                      textShadow: "0 0 0 #000",
                    },
                    "&:hover": { color: "#fff", opacity: 0.95 },
                    border: "2px solid transparent",
                    ...(value === idx && {
                      borderColor: "#000",
                      boxShadow: "0 0 0 2px #fff inset, 0 0 0 2px #000",
                    }),
                    borderRadius: 0,
                  }}
                />
              ))}
            </Tabs>
          ) : (
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                aria-label="menu"
                onClick={toggleDrawer}
                edge="start"
                sx={{
                  color: "#fff",
                  border: "2px solid #000",
                  boxShadow: "0 0 0 2px #fff inset, 0 0 0 2px #000",
                  borderRadius: 0,
                  width: 36,
                  height: 36,
                }}
              >
                <MenuIcon fontSize="small" />
              </IconButton>

              <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={toggleDrawer}
                PaperProps={{
                  sx: {
                    bgcolor: "#0d0d0d",
                    color: "#fff",
                    width: 260,
                    borderRight: "2px solid #000",
                    boxShadow: "0 0 0 2px #fff inset, 0 0 0 2px #000",
                    borderRadius: 0,
                  },
                }}
              >
                <List sx={{ py: 0.5 }}>
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
            </Stack>
          )}

          {/* Optional: tiny GitHub icon on the right (kept minimal) */}
          <Box sx={{ ml: 1, display: "flex", alignItems: "center" }}>
            <Link
              to="https://github.com/CutlassTM"
              target="_blank"
              rel="noopener noreferrer"
              style={{ outline: "none", display: "inline-flex" }}
            >
              <img
                src="/githubIcon.png"
                alt="GitHub"
                width={20}
                height={20}
                style={{
                  // filter: "invert(1)",
                  // imageRendering: "pixelated",
                  cursor: "pointer",
                }}
              />
            </Link>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Navbar;
