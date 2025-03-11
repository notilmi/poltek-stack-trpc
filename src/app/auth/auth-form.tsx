"use server";
import { signIn } from "@/auth";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Divider from "@mui/material/Divider";
import Image from "next/image";

async function handleSendMagicLink(formData: FormData) {
  "use server";
  await signIn("resend", formData);
}

async function handleGoogleLogin() {
  "use server";
  await signIn("google");
}

export async function AuthForm() {
  return (
    <Stack direction="column" spacing={2} sx={{ minWidth: 200 }}>
      <Typography variant="h4" sx={{ fontWeight: 500 }}>
        Welcome Back!
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 400 }}>
        Please login with your email address or Google account.
      </Typography>
      <form action={handleGoogleLogin}>
        <Button
          type="submit"
          variant="outlined"
          fullWidth
          startIcon={
            <Image src="/static/google.webp" alt="" width={24} height={24} />
          }
          sx={{
            text: "gray",
            color: "black",
            borderColor: "lightgray",
          }}
        >
          Login with Google
        </Button>
      </form>
      <Divider>
        <Typography>Or</Typography>
      </Divider>
      <form action={handleSendMagicLink}>
        <Stack direction="column" spacing={2}>
          <TextField
            fullWidth
            name="email"
            variant="outlined"
            label="Email"
            helperText="We'll send you a magic link to login."
          />

          <Button type="submit" variant="contained" startIcon={<SendIcon />}>
            Send Magic Link
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
