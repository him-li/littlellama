import { useState, type MouseEvent } from "react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "@mui/material/styles";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@/src/ui/mui";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PetsRoundedIcon from "@mui/icons-material/PetsRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import littleLlama from "../../assets/littleLlama.png";
import type { User } from "../../types/models";

export default function Navbar({ user }: { user: User | null }) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const { mode, systemMode, setMode } = useColorScheme();
  const darkMode = (mode === "system" ? systemMode : mode) === "dark";
  const [navAnchor, setNavAnchor] = useState<HTMLElement | null>(null);
  const [adminAnchor, setAdminAnchor] = useState<HTMLElement | null>(null);
  const pages = [
    {
      label: t("link-home"),
      href: "/",
      icon: <HomeRoundedIcon fontSize="small" />,
    },
    {
      label: t("text-search"),
      href: "/search",
      icon: <SearchRoundedIcon fontSize="small" />,
    },
    {
      label: user ? t("link-mypets") : t("link-pets"),
      href: user ? "/mypets" : "/pets",
      icon: <PetsRoundedIcon fontSize="small" />,
    },
  ];
  const navigate = (href: string) => {
    setNavAnchor(null);
    setAdminAnchor(null);
    router.push(href);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(var(--mui-palette-background-paperChannel) / .92)",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
        backdropFilter: "blur(18px)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ minHeight: { xs: 50, md: 60 }, gap: 1.5 }}
        >
          <Stack
            component={NextLink}
            href="/"
            direction="row"
            sx={{
              gap: 1.25,
              textDecoration: "none",
              flexShrink: 0,
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={littleLlama.src}
              alt="Little Llama"
              sx={{
                width: { xs: 50, md: 60 },
                height: { xs: 50, md: 60 },
                objectFit: "contain",
              }}
            />
            <Typography
              variant="h5"
              sx={{
                color: "primary.main",
                display: { xs: "none", sm: "block" },
                lineHeight: 1,
              }}
            >
              {t("heading-little-llama")}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            sx={{
              gap: 0.5,
              marginInlineStart: "auto",
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.href}
                component={NextLink}
                href={page.href}
                startIcon={page.icon}
                color="inherit"
                sx={{
                  bgcolor: pathname === page.href
                    ? "rgba(var(--mui-palette-primary-mainChannel) / .14)"
                    : "transparent",
                  color: "text.primary",
                  "&:hover": pathname === page.href
                    ? {
                        bgcolor:
                          "rgba(var(--mui-palette-primary-mainChannel) / .22)",
                      }
                    : undefined,
                }}
              >
                {page.label}
              </Button>
            ))}
          </Stack>

          {user?.admin && (
            <>
              <Tooltip title={t("admin-pages")}>
                <IconButton
                  onClick={(event: MouseEvent<HTMLElement>) =>
                    setAdminAnchor(event.currentTarget)
                  }
                  sx={{
                    marginInlineStart: { xs: "auto", md: 1 },
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 34,
                      height: 34,
                      bgcolor: "secondary.main",
                      color: "secondary.contrastText",
                    }}
                  >
                    <AdminPanelSettingsRoundedIcon fontSize="small" />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={adminAnchor}
                open={Boolean(adminAnchor)}
                onClose={() => setAdminAnchor(null)}
              >
                <MenuItem onClick={() => navigate("/addpet")}>
                  <ListItemIcon>
                    <AddCircleOutlineRoundedIcon fontSize="small" />
                  </ListItemIcon>
                  {t("link-addpet")}
                </MenuItem>
                <MenuItem onClick={() => navigate("/dashboard")}>
                  <ListItemIcon>
                    <DashboardRoundedIcon fontSize="small" />
                  </ListItemIcon>
                  {t("link-dashboard")}
                </MenuItem>
              </Menu>
            </>
          )}

          <IconButton
            aria-label={t("open-navigation")}
            onClick={(event: MouseEvent<HTMLElement>) =>
              setNavAnchor(event.currentTarget)
            }
            sx={{
              marginInlineStart: user?.admin ? 0 : "auto",
              display: { md: "none" },
            }}
          >
            <MenuRoundedIcon />
          </IconButton>
          <Menu
            anchorEl={navAnchor}
            open={Boolean(navAnchor)}
            onClose={() => setNavAnchor(null)}
            PaperProps={{ sx: { minWidth: 210, mt: 1 } }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.href}
                selected={pathname === page.href}
                onClick={() => navigate(page.href)}
              >
                <ListItemIcon>{page.icon}</ListItemIcon>
                {page.label}
              </MenuItem>
            ))}
          </Menu>
          <Tooltip
            title={t(darkMode ? "theme-switch-to-light" : "theme-switch-to-dark")}
          >
            <IconButton
              aria-label={t(
                darkMode ? "theme-switch-to-light" : "theme-switch-to-dark",
              )}
              onClick={() => setMode(darkMode ? "light" : "dark")}
              sx={{ flexShrink: 0 }}
            >
              {darkMode ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
