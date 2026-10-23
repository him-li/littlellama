import { Box, Card, CardContent, Skeleton, Stack } from "@/src/ui/mui";

export function PetGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <Box
      aria-busy="true"
      aria-label="Loading pets"
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2,minmax(0,1fr))",
          lg: "repeat(3,minmax(0,1fr))",
        },
        gap: { xs: 2, md: 3 },
      }}
    >
      {Array.from({ length: count }, (_, index) => (
        <Card key={index} elevation={0} sx={{ overflow: "hidden" }}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ aspectRatio: "4 / 3", height: "auto" }}
          />
          <CardContent sx={{ p: 2.5 }}>
            <Stack direction="row" sx={{ gap: 2, alignItems: "center" }}>
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="58%" height={38} />
                <Skeleton variant="text" width="78%" height={24} />
              </Box>
              <Skeleton variant="rounded" width={44} height={44} />
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export function PanelListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <Stack aria-busy="true" aria-label="Loading content" spacing={1.5}>
      {Array.from({ length: rows }, (_, index) => (
        <Card key={index}>
          <CardContent>
            <Stack direction="row" sx={{ gap: 2, alignItems: "center" }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ flex: 1 }}>
                <Skeleton
                  variant="text"
                  width={`${70 - index * 5}%`}
                  height={28}
                />
                <Skeleton variant="text" width="42%" height={20} />
              </Box>
              <Skeleton variant="rounded" width={120} height={40} />
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}

export function FormSkeleton() {
  return (
    <Stack
      aria-busy="true"
      aria-label="Loading form"
      spacing={2}
      sx={{ width: "100%" }}
    >
      <Skeleton variant="text" width="38%" height={48} />
      <Skeleton variant="rounded" height={56} />
      <Skeleton variant="rounded" height={56} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
        }}
      >
        <Skeleton variant="rounded" height={56} />
        <Skeleton variant="rounded" height={56} />
      </Box>
      <Skeleton variant="rounded" height={120} />
      <Skeleton
        variant="rounded"
        width={150}
        height={44}
        sx={{ alignSelf: "flex-end" }}
      />
    </Stack>
  );
}

export function PetDetailsSkeleton() {
  return (
    <Box
      aria-busy="true"
      aria-label="Loading pet details"
      sx={{
        maxWidth: 1120,
        width: "100%",
        mx: "auto",
        px: { xs: 2, md: 4 },
        py: 3,
      }}
    >
      <Skeleton variant="text" width="35%" height={64} />
      <Skeleton variant="text" width="22%" height={28} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: ".9fr 1.1fr" },
          gap: 4,
          mt: 2,
        }}
      >
        <Skeleton
          variant="rounded"
          sx={{ width: "100%", aspectRatio: "4 / 3", height: "auto" }}
        />
        <Stack spacing={2}>
          <Skeleton variant="text" width="30%" height={26} />
          <Skeleton variant="text" />
          <Skeleton variant="text" width="88%" />
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {Array.from({ length: 6 }, (_, index) => (
              <Stack key={index} direction="row" sx={{ gap: 1 }}>
                <Skeleton variant="rounded" width={38} height={38} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="65%" />
                </Box>
              </Stack>
            ))}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
