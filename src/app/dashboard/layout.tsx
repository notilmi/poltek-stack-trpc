import React from "react";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout slots={{}}>
      <PageContainer>{children}</PageContainer>
    </DashboardLayout>
  );
}

export default Layout;
