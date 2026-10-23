import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@/src/ui/mui";
import { getAuthToken, getWebSocketUrl, POST } from "../../../utils/api";
import type { Conversation, ChatMessage, User } from "../../../types/models";

export default function ChatWidget({ user }: { user: User }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const socket = useRef<WebSocket | null>(null);
  useEffect(() => {
    if (!open || conversation) return;
    void POST<Conversation>("/chat/conversations").then((item) => {
      setConversation(item);
      setMessages(item.messages);
    });
  }, [open, conversation]);
  useEffect(() => {
    if (!conversation) return;
    const ws = new WebSocket(
      `${getWebSocketUrl(`/chat/ws/${conversation.id}`)}?token=${encodeURIComponent(getAuthToken())}`,
    );
    ws.onmessage = (event) =>
      setMessages((current) => [...current, JSON.parse(event.data)]);
    socket.current = ws;
    return () => ws.close();
  }, [conversation]);
  const send = () => {
    if (draft.trim() && socket.current?.readyState === WebSocket.OPEN) {
      socket.current.send(draft.trim());
      setDraft("");
    }
  };
  return (
    <Box
      sx={{ position: "fixed", insetInlineEnd: 24, bottom: 24, zIndex: 1200 }}
    >
      {open ? (
        <Card
          sx={{
            width: { xs: "calc(100vw - 32px)", sm: 380 },
            height: 480,
            display: "flex",
            flexDirection: "column",
            boxShadow: 8,
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minHeight: 0,
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center", mb: 2 }}>
              <ChatRoundedIcon color="primary" />
              <Typography variant="h6" sx={{ ml: 1 }}>
                {t("chat-title")}
              </Typography>
              <Box sx={{ flex: 1 }} />
              <IconButton
                aria-label={t("chat-close")}
                onClick={() => setOpen(false)}
              >
                <CloseRoundedIcon />
              </IconButton>
            </Stack>
            <Stack spacing={1} sx={{ flex: 1, overflowY: "auto", mb: 2 }}>
              {messages.map((message) => (
                <Paper
                  key={message.id}
                  sx={{
                    p: 1.25,
                    maxWidth: "82%",
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
                label={t("chat-message")}
                value={draft}
                onChange={(event: any) => setDraft(event.target.value)}
                onKeyDown={(event: any) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    send();
                  }
                }}
              />
              <IconButton color="primary" onClick={send}>
                <SendRoundedIcon />
              </IconButton>
            </Stack>
          </CardContent>
        </Card>
      ) : (
        <Button
          variant="contained"
          startIcon={<ChatRoundedIcon />}
          onClick={() => setOpen(true)}
        >
          {t("chat-open")}
        </Button>
      )}
    </Box>
  );
}
