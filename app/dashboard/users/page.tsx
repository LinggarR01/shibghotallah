import { connection } from 'next/server';
import { redirect } from 'next/navigation';
import PageHeader from '@/components/cms/PageHeader';
import { Badge, Card, CardContent, Table, Td, Th } from '@/components/cms/ui';
import { users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { requireSession } from '@/lib/auth';
import { formatDate } from '@/lib/utils';

export default async function UsersPage() {
  await connection();

  const session = await requireSession();

  if (session.user.role !== 'admin') {
    redirect('/dashboard');
  }

  const userRows = await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users);

  return (
    <div>
      <PageHeader
        title="User Management"
        description="Daftar user CMS tanpa menampilkan password atau hash."
      />
      <Card>
        <CardContent className="p-0">
          <Table>
            <thead>
              <tr>
                <Th>Username</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Dibuat</Th>
              </tr>
            </thead>
            <tbody>
              {userRows.map((user) => (
                <tr key={user.id}>
                  <Td className="font-semibold text-gray-950">
                    {user.username}
                  </Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <Badge variant="published" className="capitalize">
                      {user.role}
                    </Badge>
                  </Td>
                  <Td>{formatDate(user.createdAt)}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
