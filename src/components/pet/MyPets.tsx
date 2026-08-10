import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Container, Tab, Tabs, Typography } from "@/src/ui/mui";
import { GET } from "../../utils/api";
import PetsList from "./components/PetsList";
import type { Pet, User } from "../../types/models";
import { dottedHeroContentSx, dottedHeroSx } from "../../utils/styles";

interface PetCollections {
  owned_pets: Pet[];
  saved_pets: Pet[];
}

const emptyCollections: PetCollections = { owned_pets: [], saved_pets: [] };

export default function MyPets({ user }: { user: User | null }) {
  const { t } = useTranslation();
  const [collections, setCollections] =
    useState<PetCollections>(emptyCollections);
  const [tab, setTab] = useState(0);
  useEffect(() => {
    if (!user?.id) return;
    void GET<PetCollections>(`/pet/user/${user.id}`)
      .then(setCollections)
      .catch(console.error);
  }, [user?.id]);
  if (!user)
    return (
      <Container maxWidth="md" sx={{ py: 12, textAlign: "center" }}>
        <Typography variant="h2">{t("mypets-login-required")}</Typography>
      </Container>
    );
  const displayedPets =
    tab === 0 ? collections.owned_pets : collections.saved_pets;
  return (
    <Box>
      <Box sx={{ ...dottedHeroSx, py: { xs: 5, md: 7 } }}>
        <Container maxWidth="lg" sx={dottedHeroContentSx}>
          <Typography color="secondary.light" fontWeight={800}>
            {t("mypets-kicker")}
          </Typography>
          <Typography variant="h1">
            {t("mypets-welcome", { name: user.firstname ?? user.firstName })}
          </Typography>
          <Typography sx={{ mt: 1, color: "rgba(255,255,255,.75)" }}>
            {collections.owned_pets.length
              ? t("mypets-has-pets")
              : t("mypets-no-pets")}
          </Typography>
        </Container>
      </Box>
      <Box
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="lg">
          <Tabs value={tab} onChange={(_event, value: number) => setTab(value)}>
            <Tab label={t("tab-my-pets")} />
            <Tab label={t("tab-saved-pets")} />
          </Tabs>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        <PetsList
          petsData={displayedPets}
          status
          user={user}
          emptyTitle={
            tab === 0 ? t("mypets-empty-title") : t("saved-pets-empty-title")
          }
          emptyBody={
            tab === 0 ? t("mypets-no-pets") : t("saved-pets-empty-body")
          }
        />
      </Container>
    </Box>
  );
}
