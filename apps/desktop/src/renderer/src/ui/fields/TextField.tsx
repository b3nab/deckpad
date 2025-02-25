export const TextField = (props) => {
  console.log('TextField props: ', props)
  const {
    field: { name, value, onChange, onBlur }
  } = props
  return (
    <input
      className="rounded-lg bg-black p-2"
      id={props.id}
      type={props.type}
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={props.label}
    />
  )
}
