import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@/src/ui/mui";
import { GET, PUT } from "../../../utils/api";
import type { Notification } from "../../../types/models";

export default function NotificationCenter() {
  const { t } = useTranslation();
  const [items, setItems] = useState<Notification[]>([]);
  useEffect(() => {
    void GET<Notification[]>("/notifications").then(setItems);
  }, []);
  if (!items.length) return null;
  const unread = items.filter((item) => !item.read).length;
  const markAllRead = async () => {
    await PUT("/notifications/read-all");
    setItems((current) => current.map((item) => ({ ...item, read: true })));
  };
  return (
    <Box component="section" sx={{ py: 4 }}>
      <Card sx={{ maxWidth: 1200, mx: "auto" }}>
        <CardContent>
          <Stack direction="row" sx={{ alignItems: "center", gap: 1.5, mb: 2 }}>
            <NotificationsRoundedIcon color="primary" />
            <Typography variant="h5">{t("notifications-title")}</Typography>
            {unread > 0 && (
              <Chip
                size="small"
                color="secondary"
                label={t("notifications-new", { count: unread })}
              />
            )}
            <Box sx={{ flex: 1 }} />
            {unread > 0 && (
              <Button
                size="small"
                startIcon={<DoneAllRoundedIcon />}
                onClick={markAllRead}
              >
                {t("notifications-mark-all")}
              </Button>
            )}
          </Stack>
          <Stack spacing={1}>
            {items.slice(0, 5).map((item) => (
              <Alert
                key={item.id}
                severity={item.read ? "info" : "success"}
                variant={item.read ? "outlined" : "standard"}
              >
                {item.kind === "pet.created" ? (
                  t("notification-new-pet", { name: item.pet_name })
                ) : (
                  <>
                    <strong>{item.title}</strong> — {item.message}
                  </>
                )}
              </Alert>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
