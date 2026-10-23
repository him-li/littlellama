import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import DynamicFeedRoundedIcon from "@mui/icons-material/DynamicFeedRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@/src/ui/mui";
import { GET, PUT, getAuthToken, getWebSocketUrl } from "../../utils/api";
import type {
  Activity,
  ChatMessage,
  Conversation,
  Inquiry,
  Pet,
  User,
} from "../../types/models";
import { dottedHeroContentSx, dottedHeroSx } from "../../utils/styles";
import PetsList from "../pet/components/PetsList";

function ActivityFeed() {
  const { t } = useTranslation();
  const [items, setItems] = useState<Activity[]>([]);
  useEffect(() => {
    void GET<Activity[]>("/activity").then(setItems);
  }, []);
  return (
    <Stack spacing={1.5}>
      {!items.length && <Alert severity="info">{t("admin-no-activity")}</Alert>}
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent>
            <Stack direction="row" sx={{ gap: 1.5 }}>
              <DynamicFeedRoundedIcon color="primary" />
              <Box>
                <Typography fontWeight={700}>{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(item.created_at).toLocaleString()} ·{" "}
                  {item.event_type}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}

function InquiryList() {
  const { t } = useTranslation();
  const [items, setItems] = useState<Inquiry[]>([]);
  useEffect(() => {
    void GET<Inquiry[]>("/contact").then(setItems);
  }, []);
  const change = async (item: Inquiry, next: Inquiry["status"]) => {
    const updated = await PUT<Inquiry>(`/contact/${item.id}`, { status: next });
    setItems((all) =>
      all.map((entry) => (entry.id === item.id ? updated : entry)),
    );
  };
  return (
    <Stack spacing={1.5}>
      {!items.length && (
        <Alert severity="info">{t("admin-no-inquiries")}</Alert>
      )}
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent>
            <Stack direction={{ xs: "column", sm: "row" }} sx={{ gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">{item.subject}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.name} · {item.email}
                </Typography>
                <Typography sx={{ mt: 1 }}>{item.message}</Typography>
              </Box>
              <TextField
                select
                size="small"
                label={t("admin-status")}
                value={item.status}
                onChange={(event: any) => void change(item, event.target.value)}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="open">{t("status-open")}</MenuItem>
                <MenuItem value="in_progress">
                  {t("status-in-progress")}
                </MenuItem>
                <MenuItem value="resolved">{t("status-resolved")}</MenuItem>
              </TextField>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}

function SupportInbox({ user }: { user: User }) {
  const { t } = useTranslation();
  const [items, setItems] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const socket = useRef<WebSocket | null>(null);
  useEffect(() => {
    void GET<Conversation[]>("/chat/conversations").then((data) => {
      setItems(data);
      setSelected(data[0] ?? null);
      setMessages(data[0]?.messages ?? []);
    });
  }, []);
  useEffect(() => {
    if (!selected) return;
    const ws = new WebSocket(
      `${getWebSocketUrl(`/chat/ws/${selected.id}`)}?token=${encodeURIComponent(getAuthToken())}`,
    );
    ws.onmessage = (event) =>
      setMessages((all) => [...all, JSON.parse(event.data)]);
    socket.current = ws;
    return () => ws.close();
  }, [selected]);
  const send = () => {
    if (draft.trim() && socket.current?.readyState === WebSocket.OPEN) {
      socket.current.send(draft.trim());
      setDraft("");
    }
  };
  const chooseConversation = (item: Conversation) => {
    setSelected(item);
    setMessages(item.messages);
  };
  if (!items.length)
    return <Alert severity="info">{t("chat-no-conversations")}</Alert>;
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "280px 1fr" },
        gap: 2,
      }}
    >
      <Stack spacing={1}>
        {items.map((item) => (
          <Button
            key={item.id}
            variant={selected?.id === item.id ? "contained" : "outlined"}
            onClick={() => chooseConversation(item)}
            sx={{ justifyContent: "flex-start" }}
          >
            {t("admin-user-short", { id: item.user_id.slice(0, 8) })}
          </Button>
        ))}
      </Stack>
      <Card>
        <CardContent>
          <Stack spacing={1} sx={{ height: 440 }}>
            <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
              <SupportAgentRoundedIcon color="primary" />
              <Typography variant="h6">{t("admin-live-support")}</Typography>
              <Chip size="small" label={selected?.status} />
            </Stack>
            <Divider />
            <Stack spacing={1} sx={{ flex: 1, overflow: "auto" }}>
              {messages.map((message) => (
                <Paper
                  key={message.id}
                  sx={{
                    p: 1.25,
                    maxWidth: "80%",
                    alignSelf:
                      message.sender_id === user.id ? "flex-end" : "flex-start",
                    bgcolor:
                      message.sender_id === user.id
                        ? "primary.main"
                        : "background.default",
                    color:
                      message.sender_id === user.id
                        ? "primary.contrastText"
                        : "text.primary",
                  }}
                >
                  {message.body}
                </Paper>
              ))}
            </Stack>
            <Stack direction="row" sx={{ gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                label={t("chat-reply")}
                value={draft}
                onChange={(event: any) => setDraft(event.target.value)}
              />
              <IconButton color="primary" onClick={send}>
                <SendRoundedIcon />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

function UserManagement({ currentUser }: { currentUser: User }) {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    void GET<User[]>("/user").then(setUsers);
  }, []);
  const changeRole = async (user: User, role: User["role"]) => {
    const updated = await PUT<User>(`/user/${user.id}/role`, { role });
    setUsers((all) =>
      all.map((entry) => (entry.id === user.id ? updated : entry)),
    );
  };
  return (
    <Stack spacing={1.5}>
      {users.map((user) => (
        <Card key={user.id}>
          <CardContent>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              sx={{ gap: 2, alignItems: { sm: "center" } }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">
                  {user.firstname} {user.lastname}
                </Typography>
                <Typography color="text.secondary">{user.email}</Typography>
              </Box>
              <TextField
                select
                size="small"
                label={t("admin-role")}
                value={user.admin ? "admin" : (user.role ?? "user")}
                disabled={user.id === currentUser.id}
                onChange={(event: any) =>
                  void changeRole(user, event.target.value)
                }
                sx={{ minWidth: 160 }}
              >
                <MenuItem value="user">{t("role-user")}</MenuItem>
                <MenuItem value="support">{t("role-support")}</MenuItem>
                <MenuItem value="admin">{t("role-admin")}</MenuItem>
              </TextField>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}

function PetManagement({ user }: { user: User }) {
  const [pets, setPets] = useState<Pet[]>([]);
  useEffect(() => {
    void GET<Pet[]>("/pet").then(setPets);
  }, []);
  return <PetsList petsData={pets} user={user} />;
}

export default function Dashboard({ user }: { user: User }) {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const isAdmin = user.admin || user.role === "admin";
  const sections = isAdmin
    ? ["activity", "inquiries", "chat", "users", "pets"]
    : ["inquiries", "chat"];
  const section = sections[tab];
  return (
    <>
      <Box sx={{ ...dottedHeroSx, py: 6 }}>
        <Container maxWidth="lg" sx={dottedHeroContentSx}>
          <Typography variant="h1">{t("admin-dashboard-title")}</Typography>
          <Typography sx={{ color: "rgba(255,255,255,.8)", mt: 1 }}>
            {t("admin-dashboard-description")}
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Tabs
          value={tab}
          onChange={(_: unknown, value: number) => setTab(value)}
          variant="scrollable"
        >
          {isAdmin && <Tab label={t("admin-activity")} />}
          <Tab label={t("admin-inquiries")} />
          <Tab label={t("admin-live-chat")} />
          {isAdmin && <Tab label={t("users")} />}
          {isAdmin && <Tab label={t("pets")} />}
        </Tabs>
        <Box sx={{ pt: 3 }}>
          {section === "activity" && <ActivityFeed />}
          {section === "inquiries" && <InquiryList />}
          {section === "chat" && <SupportInbox user={user} />}
          {section === "users" && <UserManagement currentUser={user} />}
          {section === "pets" && <PetManagement user={user} />}
        </Box>
      </Container>
    </>
  );
}
