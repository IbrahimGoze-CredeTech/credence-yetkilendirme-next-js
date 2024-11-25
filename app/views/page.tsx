import { GetKisiAccessibleRoutes, GetRoleAccessibleRoutes } from '@/actions/views'
import React from 'react'
import ViewsClient from './views-client';

async function ViewsData() {
  const [kisiAccessibleRoutes, roleAccessibleRoutes] = await Promise.all([
    GetKisiAccessibleRoutes(),
    GetRoleAccessibleRoutes()
  ]);

  return (
    <ViewsClient kisiAccessibleRoutes={kisiAccessibleRoutes} roleAccessibleRoutes={roleAccessibleRoutes} />
  )
}

export default async function ViewPage() {
  await GetKisiAccessibleRoutes();
  return (
    <div>
      <ViewsData />
    </div>
  )
}
