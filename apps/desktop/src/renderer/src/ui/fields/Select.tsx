import { Listbox } from '@headlessui/react'

export const Select = (props) => {
  console.log('Select props: ', props)
  const {
    field: { name, value },
    form: { setFieldValue },
    options
  } = props
  const changeProxy = (changes) => setFieldValue(name, changes)
  return (
    <Listbox name={name} value={value} onChange={changeProxy}>
      <Listbox.Button className="flex bg-black rounded-lg p-2">
        {options.find((o) => o.value === value)?.label || value || 'Choose an option..'}
      </Listbox.Button>
      <Listbox.Options className="bg-black rounded-lg p-1">
        {options?.map((option) => (
          <Listbox.Option key={option.value} value={option.value} className="rounded-lg bg-black">
            {({ selected }) => (
              <>
                <span
                  className={`block truncate rounded-lg p-1 hover:bg-indigo-700 ${
                    selected ? 'font-medium bg-indigo-900' : 'font-normal'
                  }`}
                >
                  {selected ? <span className="text-success">{' > '}</span> : ''}
                  {option.label}
                </span>
              </>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}
