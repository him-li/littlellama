import { useEffect, useState, type SyntheticEvent } from "react";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Snackbar,
  Stack,
  Typography,
} from "@/src/ui/mui";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PetsList from "../pet/components/PetsList";
import ProfileSettings from "./components/ProfileSettings";
import { GET } from "../../utils/api";
import heroImage from "../../assets/your-pet-included.jpg";
import type { Pet, User } from "../../types/models";
import { dottedHeroContentSx, dottedHeroSx } from "../../utils/styles";

export default function Home({ user }: { user: User | null }) {
  const { t } = useTranslation();
  const [petsData, setPetsData] = useState<Pet[]>([]);
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    void GET<Pet[]>("/pet").then(setPetsData).catch(console.error);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("USER");
    setOpenSuccess(true);
    window.setTimeout(() => window.location.reload(), 700);
  };
  const closeAlert = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason !== "clickaway") setOpenSuccess(false);
  };

  return (
    <>
      <Signup open={openSignup} handleClose={() => setOpenSignup(false)} />
      <Login open={openLogin} handleClose={() => setOpenLogin(false)} />
      {user && openProfile && (
        <ProfileSettings
          open
          handleClose={() => setOpenProfile(false)}
          user={user}
        />
      )}

      <Box
        component="section"
        sx={{
          ...dottedHeroSx,
          py: { xs: 7, md: 11 },
        }}
      >
        <Container maxWidth="lg" sx={dottedHeroContentSx}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "minmax(0,1.08fr) minmax(360px,.92fr)",
              },
              alignItems: "center",
              gap: { xs: 5, md: 8 },
            }}
          >
            <Stack spacing={2.5} sx={{ alignItems: "flex-start" }}>
              <Chip
                icon={<FavoriteRoundedIcon />}
                label={t("chip-adopt")}
                sx={{
                  bgcolor: "rgba(255,255,255,.14)",
                  color: "white",
                  "& .MuiChip-icon": { color: "secondary.main" },
                }}
              />
              <Typography variant="h1" sx={{ maxWidth: 680 }}>
                {user
                  ? `${t("heading-hey")} ${user.firstname ?? user.firstName}!`
                  : t("heading-little-llama")}
              </Typography>
              <Typography variant="h4" sx={{ color: "secondary.light" }}>
                {user ? t("heading-welcome") : t("heading-pet-adoption")}
              </Typography>
              <Typography
                sx={{
                  maxWidth: 610,
                  color: "rgba(255,255,255,.8)",
                }}
              >
                {t("para-home")}
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{ gap: 1.5, pt: 1, width: { xs: "100%", sm: "auto" } }}
              >
                {user ? (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<ManageAccountsRoundedIcon />}
                      onClick={() => setOpenProfile(true)}
                    >
                      {t("profile-settings")}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<LogoutRoundedIcon />}
                      onClick={handleLogout}
                      sx={{
                        color: "white",
                        borderColor: "rgba(255,255,255,.5)",
                      }}
                    >
                      {t("button-logout")}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setOpenSignup(true)}
                      endIcon={<ArrowForwardRoundedIcon />}
                    >
                      {t("button-signup")}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<LoginRoundedIcon />}
                      onClick={() => setOpenLogin(true)}
                      sx={{
                        color: "white",
                        borderColor: "rgba(255,255,255,.5)",
                      }}
                    >
                      {t("button-login")}
                    </Button>
                  </>
                )}
              </Stack>
            </Stack>
            <Box
              sx={{
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: { xs: -12, md: -18 },
                  border: "1px solid rgba(255,255,255,.22)",
                  borderRadius: "32px",
                  transform: "rotate(3deg)",
                },
              }}
            >
              <Box
                component="img"
                src={heroImage.src}
                alt="A happy adopted pet with its family"
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 330, md: 500 },
                  objectFit: "cover",
                  borderRadius: "26px",
                  boxShadow: "0 28px 70px rgba(0,0,0,.3)",
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{
              gap: 2,
              mb: 4,
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "flex-end" },
            }}
          >
            <Box>
              <Typography
                color="primary.main"
                fontWeight={800}
                sx={{ mb: 0.5 }}
              >
                {t("heading-meet-friend")}
              </Typography>
              <Typography variant="h2">{t("heading-petlist-home")}</Typography>
            </Box>
            <Button
              component={NextLink}
              href="/search"
              variant="outlined"
              startIcon={<SearchRoundedIcon />}
            >
              {t("text-search")}
            </Button>
          </Stack>
          <PetsList petsData={petsData.slice(0, 6)} hide user={user} />
        </Container>
      </Box>
      <Snackbar open={openSuccess} autoHideDuration={4000} onClose={closeAlert}>
        <Alert onClose={closeAlert} severity="success">
          {t("message-logout-success")}
        </Alert>
      </Snackbar>
    </>
  );
}
