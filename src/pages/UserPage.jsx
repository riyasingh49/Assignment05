import { useState } from 'react'
import { useUsers }      from '../hooks/useUsers'
import { useCreateUser } from '../hooks/useCreateUser'
import { useUpdateUser } from '../hooks/useUpdateUser'
import { useDeleteUser } from '../hooks/useDeleteUser'
import UserCard             from '../components/users/UserCard'
import UserForm             from '../components/users/UserForm'
import DeleteConfirm        from '../components/users/DeleteConfirm'
import { UserCardSkeleton } from '../components/ui/Skeleton'
import Modal                from '../components/ui/Modal'
import Button               from '../components/ui/Button'

const LIMIT = 10

export default function UsersPage({ onViewUser }) {
  const [page, setPage]   = useState(1)
  const [modal, setModal] = useState(null)

  const { data, isLoading, isError, error } = useUsers({ page, limit: LIMIT })
  const createMutation = useCreateUser()
  const updateMutation = useUpdateUser()
  const deleteMutation = useDeleteUser()

  const totalPages = data ? Math.ceil(data.total / LIMIT) : 1
  const close = () => setModal(null)

  return (
    <div>

      <div>
        <div>
          <h1>Users</h1>
          <p>{data ? `${data.total} total users` : 'Loading…'}</p>
        </div>
        <Button onClick={() => setModal({ type:'create' })}>+ New User</Button>
      </div>

      {isError && (
        <div>⚠️ {error?.message}</div>
      )}

      <div>
        {isLoading
          ? Array(LIMIT).fill(0).map((_, i) => <UserCardSkeleton key={i} />)
          : data?.users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onView={onViewUser}
              onEdit={(u)   => setModal({ type:'edit',   user: u })}
              onDelete={(u) => setModal({ type:'delete', user: u })}
            />
          ))
        }
      </div>

      {data && (
        <div>
          <Button variant="ghost" size="sm" disabled={page===1} onClick={() => setPage(1)}>«</Button>
          <Button variant="ghost" size="sm" disabled={page===1} onClick={() => setPage(p => p-1)}>‹</Button>

          {/* Show up to 5 page buttons, centered around the current page */}

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const start = Math.max(1, Math.min(page - 2, totalPages - 4))
            const p = start + i
            return p <= totalPages ? (
              <Button
                key={p}
                variant={p === page ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            ) : null
          })}

          <Button variant="ghost" size="sm" disabled={page===totalPages} onClick={() => setPage(p => p+1)}>›</Button>
          <Button variant="ghost" size="sm" disabled={page===totalPages} onClick={() => setPage(totalPages)}>»</Button>
        </div>
      )}

      <Modal open={modal?.type==='create'} onClose={close} title="New User">
        <UserForm
          onSubmit={(d) => createMutation.mutate(d, { onSuccess: close })}
          loading={createMutation.isPending}
        />
      </Modal>

      <Modal open={modal?.type==='edit'} onClose={close} title={`Edit ${modal?.user?.firstName ?? ''}`}>
        {modal?.user && (
          <UserForm
            initial={modal.user}
            onSubmit={(d) => updateMutation.mutate({ id: modal.user.id, ...d }, { onSuccess: close })}
            loading={updateMutation.isPending}
          />
        )}
      </Modal>

      <Modal open={modal?.type==='delete'} onClose={close} title="Confirm Delete">
        {modal?.user && (
          <DeleteConfirm
            user={modal.user}
            loading={deleteMutation.isPending}
            onConfirm={() => deleteMutation.mutate(modal.user.id, { onSuccess: close })}
            onCancel={close}
          />
        )}
      </Modal>

    </div>
  )
}