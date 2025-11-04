import { PrismaClient, OrganizationRole } from '../generated/prisma';
import { randomBytes, scryptSync } from 'crypto';

const prisma = new PrismaClient();

function hash(password: string) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

async function main() {
  // Super Admin
  const superAdmin = await prisma.user.upsert({
    where: { email: 'super@platform.local' },
    update: {},
    create: { email: 'super@platform.local', isSuperAdmin: true, passwordHash: hash('password') },
  });

  // Org and users
  const org = await prisma.organization.upsert({
    where: { name: 'Acme Corp' },
    update: {},
    create: { name: 'Acme Corp', ownerUserId: superAdmin.id },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@acme.local' },
    update: {},
    create: { email: 'admin@acme.local', name: 'Acme Admin', passwordHash: hash('password') },
  });
  await prisma.userOrganizationMembership.upsert({
    where: { userId_organizationId: { userId: admin.id, organizationId: org.id } },
    update: { role: 'ORG_ADMIN' as OrganizationRole },
    create: { userId: admin.id, organizationId: org.id, role: 'ORG_ADMIN' as OrganizationRole },
  });

  const manager = await prisma.user.upsert({
    where: { email: 'manager@acme.local' },
    update: {},
    create: { email: 'manager@acme.local', name: 'Acme Manager', passwordHash: hash('password') },
  });
  await prisma.userOrganizationMembership.upsert({
    where: { userId_organizationId: { userId: manager.id, organizationId: org.id } },
    update: { role: 'ORG_MANAGER' as OrganizationRole },
    create: { userId: manager.id, organizationId: org.id, role: 'ORG_MANAGER' as OrganizationRole },
  });

  const staff = await prisma.user.upsert({
    where: { email: 'staff@acme.local' },
    update: {},
    create: { email: 'staff@acme.local', name: 'Acme Staff', passwordHash: hash('password') },
  });
  await prisma.userOrganizationMembership.upsert({
    where: { userId_organizationId: { userId: staff.id, organizationId: org.id } },
    update: { role: 'ORG_STAFF' as OrganizationRole },
    create: { userId: staff.id, organizationId: org.id, role: 'ORG_STAFF' as OrganizationRole },
  });

  // Minimal domain data
  const supplier = await prisma.supplier.create({
    data: { name: 'Acme Supplier', organizationId: org.id },
  });
  const product = await prisma.product.create({
    data: { organizationId: org.id, supplierId: supplier.id, sku: 'SKU-1', name: 'Widget', price: 9.99, stock: 100 },
  });
  await prisma.customer.create({
    data: { organizationId: org.id, email: 'buyer@customer.local', name: 'Buyer One' },
  });
  await prisma.inventoryLog.create({
    data: { organizationId: org.id, productId: product.id, type: 'IN', quantityChange: 100, reason: 'Initial stock' },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


