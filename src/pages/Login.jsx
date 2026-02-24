import React from "react";
import { Box, Button, Typography, Divider, IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeMode } from "../helper/ThemeContext.jsx";
import { useGoogleLogin, } from "@react-oauth/google";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function Login() {
  const { mode, toggleMode } = useThemeMode();

  const navigate = useNavigate();
 const login = useGoogleLogin({
  flow: "auth-code",   // 🔥 ADD THIS
  scope: "https://www.googleapis.com/auth/youtube.upload",
  onSuccess: (codeResponse) => {
    console.log(codeResponse);
    navigate("/upload");
  },
  onError: (error) => {
    toast.error("Login Failed. Please try again.");
    console.log(error);
  }
});

  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        display: "flex", 
        bgcolor: "background.default", 
        color: "text.primary",
        position: "relative" // Allows absolute positioning of the button
      }}
    >
      {/* --- Toggle Button Top Right --- */}
      <IconButton 
        onClick={toggleMode} 
        color="inherit" 
        sx={{ 
          position: "absolute", 
          top: 20, 
          right: 20, 
          border: "1px solid", 
          borderColor: "divider",
          bgcolor: "background.paper", // Adds a slight background so it's visible over content
          "&:hover": { bgcolor: "action.hover" }
        }}
      >
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>

      {/* Left Section */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", px: { xs: 4, md: 10 } }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          YT Uploader
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth={440}>
          Upload, manage, and organize your YouTube content in one place.
        </Typography>
      </Box>

      {/* Right Section */}
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box minWidth={280} sx={{ bgcolor: "background.paper", p: 4, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h6" fontWeight={500} mb={2} textAlign="center">
            Sign in to continue
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Button 
            startIcon={<GoogleIcon />} 
            size="large" 
            variant="outlined" 
            fullWidth 
            onClick={() => login() }
          >
            Login with Google
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;