import React, { Suspense } from "react";
import Skeleton from "@/components/commons/Skeleton";
import { Locale } from "@/i18n.config";
import Footer from "@/components/layout/Footer";

function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <Suspense>
      {/*{children}*/}
      <Footer lang={params.lang} />
    </Suspense>
  );
}
export default Layout;
