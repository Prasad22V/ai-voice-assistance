import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminDashbClient from "./AdminDashbClient";
const AdminPage = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  const adminEmail = process.env.ADMIN_EMAIL;
  const userEmail = user.emailAddresses[0]?.emailAddress;
  if (!adminEmail || userEmail !== adminEmail) redirect("/dashboard");

  return <AdminDashbClient />;
};

export default AdminPage;
