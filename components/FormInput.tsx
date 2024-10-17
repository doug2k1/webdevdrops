export function FormInput({
  id,
  name,
  type,
}: {
  id: string
  name: string
  type: string
}) {
  const className =
    'block w-full max-w-sm border border-solid border-gray-400 rounded p-2 mb-4 dark:bg-gray-700'

  if (type === 'textarea') {
    return (
      <textarea
        className={className}
        name={name}
        id={id}
        rows={8}
        required
      ></textarea>
    )
  }

  return (
    <input className={className} type={type} name={name} id={id} required />
  )
}
