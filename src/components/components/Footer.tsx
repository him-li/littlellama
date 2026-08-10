import { useState, type ChangeEvent } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  Box,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@/src/ui/mui";
import i18n from "../../utils/i18n";

export default function Footer() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "en");
  const chooseLanguage = (event: ChangeEvent<HTMLInputElement>) => {
    void i18n.changeLanguage(event.target.value);
    setLanguage(event.target.value);
  };
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 3.5,
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={{
            gap: 2,
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h5" color="primary.main">
              {t("heading-little-llama")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()}{" "}
              <Link href="https://xin-li.vercel.app/" target="_blank">
                {t("para-xin")}
              </Link>
            </Typography>
          </Box>
          <TextField
            select
            size="small"
            value={language}
            onChange={chooseLanguage}
            label={t("language")}
            sx={{ minWidth: 170 }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="zh_hans">简体中文</MenuItem>
            <MenuItem value="zh_hant">正體中文</MenuItem>
            <MenuItem value="he">עברית</MenuItem>
            <MenuItem value="ar">العربية</MenuItem>
          </TextField>
        </Stack>
      </Container>
    </Box>
  );
}
