import { GetKisiAccessibleRoutes, GetKisiYetkisView, GetRoleAccessibleRoutes, GetRoleYetkisView } from '@/actions/views'
import React from 'react'
import ViewsClient from './views-client';

async function ViewsData() {
  const [kisiAccessibleRoutes, roleAccessibleRoutes, rolYetkiView, kisiYetkiView] = await Promise.all([
    GetKisiAccessibleRoutes(),
    GetRoleAccessibleRoutes(),
    GetRoleYetkisView(),
    GetKisiYetkisView()
  ]);

  return (
    <ViewsClient kisiAccessibleRoutes={kisiAccessibleRoutes} roleAccessibleRoutes={roleAccessibleRoutes} roleYetkiView={rolYetkiView} kisiYetkiView={kisiYetkiView} />
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
