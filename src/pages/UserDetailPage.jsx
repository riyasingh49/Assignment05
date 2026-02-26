import { useState } from 'react'
import { useUser }       from '../hooks/useUser'
import { useUpdateUser } from '../hooks/useUpdateUser'
import { UserDetailSkeleton } from '../components/ui/Skeleton'
import Modal    from '../components/ui/Modal'
import Button   from '../components/ui/Button'
import UserForm from '../components/users/UserForm'

function InfoRow({ label, value }) {
  if (!value) return null
  return (
    <div>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}

export default function UserDetailPage({ userId, onBack }) {
  const [editOpen, setEditOpen] = useState(false)
  const { data: user, isLoading, isError, error } = useUser(userId)
  const updateMutation = useUpdateUser()

  if (isLoading) return <UserDetailSkeleton />

  if (isError) return (
    <div>
      <Button variant="ghost" size="sm" onClick={onBack}>← Back</Button>
      <div>⚠️ {error?.message}</div>
    </div>
  )

  return (
    <div>
      <Button variant="ghost" size="sm" onClick={onBack}>← Back to Users</Button>

      <div>
        <img src={user.image} alt={user.firstName} />
        <div>
          <h1>{user.firstName} {user.lastName}</h1>
          <div>@{user.username}</div>
          <Button size="sm" onClick={() => setEditOpen(true)}>✏️ Edit Profile</Button>
        </div>
      </div>

      <div>
        <InfoRow label="Email"       value={user.email} />
        <InfoRow label="Phone"       value={user.phone} />
        <InfoRow label="Age"         value={user.age} />
        <InfoRow label="Gender"      value={user.gender} />
        <InfoRow label="Birth Date"  value={user.birthDate} />
        <InfoRow label="Blood Group" value={user.bloodGroup} />
        <InfoRow label="University"  value={user.university} />
        <InfoRow label="Company"     value={user.company?.name} />
        <InfoRow label="Role"        value={user.company?.title} />
        <InfoRow label="Department"  value={user.company?.department} />
        <InfoRow label="City"        value={user.address ? `${user.address.city}, ${user.address.country}` : null} />
        <InfoRow label="IP Address"  value={user.ip} />
        <InfoRow label="MAC"         value={user.macAddress} />
      </div>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Profile">
        <UserForm
          initial={user}
          loading={updateMutation.isPending}
          onSubmit={(d) => updateMutation.mutate({ id: user.id, ...d }, { onSuccess: () => setEditOpen(false) })}
        />
      </Modal>
    </div>
  )
}