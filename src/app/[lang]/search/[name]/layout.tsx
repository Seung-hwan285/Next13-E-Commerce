import React, { Suspense } from "react";
import { Locale } from "@/i18n.config";
import Footer from "@/components/layout/Footer";
import Skeleton from "@/components/commons/Skeleton";

function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <>
      <Suspense fallback={<Skeleton name={params.name} lang={params.lang} />}>
        {/*{children}*/}
      </Suspense>
      <Footer lang={params.lang} />
    </>
  );
}
export default Layout;
