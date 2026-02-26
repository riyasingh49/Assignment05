import Button from '../ui/Button'

export default function DeleteConfirm({ user, onConfirm, onCancel, loading }) {
  return (
    <div>
      <div>🗑️</div>
      <p>
        Delete <strong>{user.firstName} {user.lastName}</strong>? This cannot be undone.
      </p>
      <div>
        <Button variant="ghost"  onClick={onCancel}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          {loading ? 'Deleting…' : 'Delete'}
        </Button>
      </div>
    </div>
  )
}