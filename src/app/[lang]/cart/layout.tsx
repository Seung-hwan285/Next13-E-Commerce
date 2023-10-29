import React, { Suspense } from "react";
import Footer from "@/components/layout/Footer";
import { Locale } from "@/i18n.config";
import Skeleton from "@/components/commons/Skeleton";

function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <Suspense fallback={<Skeleton />}>
      {/*{children}*/}
      <Footer lang={params.lang} />
    </Suspense>
  );
}
export default Layout;
