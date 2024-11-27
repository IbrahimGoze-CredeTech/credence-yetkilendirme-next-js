import { GetKisiAccessibleRoutes, GetRoleAccessibleRoutes, GetRoleYetkisView } from '@/actions/views'
import React from 'react'
import ViewsClient from './views-client';

async function ViewsData() {
  const [kisiAccessibleRoutes, roleAccessibleRoutes, rolYetkiView] = await Promise.all([
    GetKisiAccessibleRoutes(),
    GetRoleAccessibleRoutes(),
    GetRoleYetkisView()
  ]);

  return (
    <ViewsClient kisiAccessibleRoutes={kisiAccessibleRoutes} roleAccessibleRoutes={roleAccessibleRoutes} roleYetkiView={rolYetkiView} />
  )
}

export default async function ViewPage() {
  // await GetKisiAccessibleRoutes();
  return (
    <div>
      <ViewsData />
    </div>
  )
}
