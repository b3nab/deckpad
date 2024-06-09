export const Btn = (props): JSX.Element => (
  <button
    {...props}
    className={`flex gap-1 items-center text-white ${
      props.primary ? 'text-sm bg-indigo-600' : 'text-xs bg-cyan-600'
    } rounded-xl p-2`}
  >
    {props.children}
  </button>
)
