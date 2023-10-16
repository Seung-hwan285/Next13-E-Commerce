"use server";
import React from "react";

import { Locale } from "@/i18n.config";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  // const { page } = await getDictionary(lang);
  // console.log(page.about);

  return <></>;
}
