import { type Navigation } from "@toolpad/core/AppProvider";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { signIn, signOut } from "next-auth/react";

export const NAVIGATION: Navigation = [
  {
    segment: "",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
];

export const AUTHENTICATION = {
  signIn,
  signOut,
};
