import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import ContactSupportRoundedIcon from "@mui/icons-material/ContactSupportRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@/src/ui/mui";
import { POST } from "../../utils/api";
import type { User } from "../../types/models";
import { dottedHeroContentSx, dottedHeroSx } from "../../utils/styles";

export default function Contact({ user }: { user: User | null }) {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);
    const form = new FormData(event.currentTarget);
    try {
      await POST("/contact", Object.fromEntries(form));
      setSent(true);
      event.currentTarget.reset();
    } catch {
      setError(true);
    }
  };
  return (
    <>
      <Box sx={{ ...dottedHeroSx, py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md" sx={dottedHeroContentSx}>
          <ContactSupportRoundedIcon
            sx={{ color: "secondary.main", fontSize: 48 }}
          />
          <Typography variant="h1">{t("contact-title")}</Typography>
          <Typography sx={{ color: "rgba(255,255,255,.82)", mt: 2 }}>
            {t("contact-description")}
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Card>
          <CardContent>
            <Stack component="form" spacing={2} onSubmit={submit}>
              {sent && <Alert severity="success">{t("contact-success")}</Alert>}
              {error && <Alert severity="error">{t("contact-error")}</Alert>}
              <TextField
                required
                name="name"
                label={t("para-name")}
                defaultValue={
                  user
                    ? `${user.firstname ?? ""} ${user.lastname ?? ""}`.trim()
                    : ""
                }
              />
              <TextField
                required
                type="email"
                name="email"
                label={t("para-email")}
                defaultValue={user?.email ?? ""}
              />
              <TextField
                required
                name="subject"
                label={t("contact-subject")}
                inputProps={{ minLength: 3 }}
              />
              <TextField
                required
                multiline
                minRows={5}
                name="message"
                label={t("contact-message")}
                inputProps={{ minLength: 10, maxLength: 5000 }}
              />
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendRoundedIcon />}
              >
                {t("contact-send")}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
