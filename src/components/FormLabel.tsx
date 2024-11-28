export function FormLabel({ id, label }: { id: string; label: string }) {
  return (
    <label className="block" htmlFor={id}>
      {label}
    </label>
  )
}
