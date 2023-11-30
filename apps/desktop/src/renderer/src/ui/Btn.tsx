export const Btn = (props): JSX.Element => (
  <button
    {...props}
    className={`flex gap-2 items-center text-white ${
      props.primary ? 'text-sm bg-indigo-600' : 'text-xs bg-cyan-600'
    } rounded-full p-3`}
  >
    {props.children}
  </button>
)
