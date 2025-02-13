import React from 'react'
import { GetKisiAccessibleRoutes, GetKisiYetkisView, GetRoleAccessibleRoutes, GetRoleYetkisView } from '@/actions/views'
import ViewsClient from './views-client';

async function ViewsData() {
  const [kisiAccessibleRoutes, roleAccessibleRoutes, rolYetkiView, kisiYetkiView] = await Promise.all([
    GetKisiAccessibleRoutes(),
    GetRoleAccessibleRoutes(),
    GetRoleYetkisView(),
    GetKisiYetkisView()
  ]);

  return (
    <ViewsClient kisiAccessibleRoutes={kisiAccessibleRoutes} kisiYetkiView={kisiYetkiView} roleAccessibleRoutes={roleAccessibleRoutes} roleYetkiView={rolYetkiView} />
  )
}

export default async function ViewPage() {
  // await GetKisiYetkisView();
  return (
    <div>
      <ViewsData />
    </div>
  )
}
