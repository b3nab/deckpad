export const Status = (props): JSX.Element => (
  <div className={`text-white p-3 flex gap-2 items-center`}>
    {props.children}
    <span
      className={`${props.status ? 'bg-success' : 'bg-error'} inline-block w-4 h-4 rounded-full`}
    />
  </div>
)
