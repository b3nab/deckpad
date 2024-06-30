import { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
// import { Checkbox, Select, TextField, ToggleButtonGroup } from 'formik-mui'
// import {
//   RadioButtonUnchecked as CircleIcon,
//   CheckBoxOutlineBlank as SquareIcon,
//   Block as NoneIcon
// } from '@mui/icons-material'
import { DeckBtn } from './DeckBtn'
import { useDeckPad } from '@renderer/hooks/useDeckPad'
import { Btn, ColorField, ImageField, PathField, TextField, Select } from '@renderer/ui'

const ipc = window.electron.ipcRenderer || false

const Checkbox = (props) => {
  return (
    <div className="">
      <input {...props} />
    </div>
  )
}
const ToggleButtonGroup = (props) => {
  return <div className="flex flex-row justify-between">{props.children}</div>
}
const ToggleButton = (props) => {
  return <div className="">{props.children}</div>
}

export const BtnConfig = () => {
  const { btn, saveBtn, plugins } = useDeckPad()

  console.log('btn config btn: ', btn)

  const missingPluginOrAction = (values) => {
    // console.log(`missingPluginOrAction - values:`, values)
    // console.log('"plugin=>action" input value is there ? ', values.action.plugin)
    const [plugin, action] = values?.action?.plugin?.split('=>') || [null, null]
    // const [plugin, action] = values?.action?.plugin
    let pluginMissing = false
    let actionMissing = false
    if (!!values?.action?.plugin && !!plugin && !!action) {
      pluginMissing = !Object.keys(plugins).includes(plugin)
      actionMissing = !Object.keys(plugins[plugin]).includes(action)
    }
    // console.log('pluginMissing ? ', pluginMissing)
    // console.log('actionMissing ? ', actionMissing)
    // console.log('action input value is there ? ', !!action)
    // if(!pluginMissing && !!values?.action?.type) {
    // }
    return pluginMissing || actionMissing
  }

  const buildActionInputs = (pluginAction) => {
    const [plugin, action] = pluginAction.split('=>')
    const inputs = plugins[plugin][action].inputs

    const buildInput = (v): JSX.Element => {
      switch (v.type) {
        case 'textarea':
          return wrapInput(TextField, v.key, null, {
            type: v.type,
            label: v.label,
            multiline: true,
            rows: 4
          })
        case 'text':
        case 'number':
        case 'url':
        case 'email':
        case 'password':
          return wrapInput(TextField, v.key, null, { type: v.type, label: v.label })
        case 'checkbox':
          return wrapInput(Checkbox, v.key, v.label, { type: v.type })
        case 'color':
          return wrapInput(ColorField, v.key, v.label)
        case 'select':
          // const childs =
          //   v.extra && v.extra.options
          //     ? v.extra.options.map((opt) => (
          //         <option key={opt.value} value={opt.value}>
          //           {opt.label}
          //         </option>
          //       ))
          //     : null
          return wrapInput(Select, v.key, v.label, v.extra)
        case 'path':
          return wrapInput(PathField, v.key, v.label, { openFolder: v.extra?.folder })
        default:
          return <p className="text-white">UNKNOWN FIELD</p>
        // return wrapInput(TextField, v.key, 'DEFAULT CASE INPUT', null, null)
      }
    }

    const wrapInput = (
      Comp: React.FC,
      key: string,
      label: string | null,
      fieldExtras: any = null,
      childs: any = null
    ) => (
      <div className="flex flex-col flex-1" key={key}>
        {label && <label htmlFor={`action.options.${key}`}>{label}</label>}
        <Field
          component={Comp}
          label={label}
          name={`action.options.${key}`}
          id={`action.options.${key}`}
          {...fieldExtras}
        >
          {childs}
        </Field>
      </div>
    )

    // console.log(`inputs =>`,inputs)

    let actionInputs: JSX.Element[] = []
    inputs &&
      inputs.map((inp) => {
        actionInputs.push(buildInput(inp))
      })

    // console.log(`outputs =>`, actionInputs)

    return actionInputs
  }

  return (
    <div className="flex flex-col flex-wrap bg-boxBack rounded-2xl mt-4 text-white">
      {btn ? (
        <Formik
          enableReinitialize
          initialValues={btn.settings}
          onSubmit={(values, { setSubmitting }) => {
            // console.info(JSON.stringify(values, null, 2))
            saveBtn(values)
            setSubmitting(false)
            // close()
          }}
        >
          {({ submitForm, isSubmitting, values, resetForm }) => (
            <Form>
              <div className="p-4">
                <h3 className="font-bold">Button Preview</h3>

                <div className="flex gap-2">
                  <div className="flex flex-col gap-2 items-center justify-start">
                    <DeckBtn
                      {...values}
                      clickAction={() => {
                        if (ipc) {
                          ipc.send('open-image')
                        }
                      }}
                    />
                    <Field component={ImageField} name="image" type="text" label="Image" />
                    <Field
                      component={ToggleButtonGroup}
                      // id="shape"
                      name="shape"
                      type="checkbox"
                      label="Shape"
                      exclusive="true"
                    >
                      <ToggleButton value="circle" aria-label="circle">
                        {/* <CircleIcon /> */}
                        <p>Circle</p>
                      </ToggleButton>
                      <ToggleButton value="square" aria-label="square">
                        {/* <SquareIcon /> */}
                        <p>Square</p>
                      </ToggleButton>
                      <ToggleButton value="none" aria-label="none">
                        {/* <NoneIcon /> */}
                        <p>None</p>
                      </ToggleButton>
                    </Field>
                  </div>
                  <div className="flex flex-col gap-2 items-center justify-start relative">
                    <Field
                      component={TextField}
                      name="label"
                      type="text"
                      label="Button Label"
                      autoFocus
                      fullWidth
                    />
                    <Field
                      component={ColorField}
                      name="bgColor"
                      type="text"
                      label="Background Color"
                    />
                    <Field
                      component={ColorField}
                      name="labelColor"
                      type="text"
                      label="Text Color"
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-grow justify-start">
                    {missingPluginOrAction(values) ? (
                      <div className="flex flex-col grow justify-start items-center absolute top-0 w-full">
                        <h5>Missing plugin</h5>
                      </div>
                    ) : (
                      <>
                        {plugins && (
                          <Field
                            component={Select}
                            name="action.plugin"
                            label="Plugin"
                            id="action.plugin"
                            options={[
                              ...Object.entries(plugins)
                                .map(([namePlugin, plugin]) => [
                                  ...Object.entries(plugin).map(([nameAction, action]) => ({
                                    // id: nameAction,
                                    value: `${namePlugin}=>${nameAction}`,
                                    label: action.label
                                  }))
                                  // <option key={nameAction} value={`${namePlugin}=>${nameAction}`}>
                                  //   {action.label}
                                  // </option>
                                  // ))
                                ])
                                .flat()
                            ]}
                          >
                            {/* {Object.entries(plugins).map(([namePlugin, plugin]) => [
                              <div className="uppercase" key={namePlugin}>
                                {namePlugin}
                              </div>,
                              ...Object.entries(plugin).map(([nameAction, action]) => (
                                <option key={nameAction} value={`${namePlugin}=>${nameAction}`}>
                                  {action.label}
                                </option>
                              ))
                            ])} */}
                          </Field>
                        )}
                        {values.action.plugin && buildActionInputs(values.action.plugin)}
                      </>
                    )}
                  </div>
                </div>

                {isSubmitting && <p>Submitting Button Config...</p>}
                <div className="flex gap-4 justify-end">
                  <Btn onClick={resetForm}>RESET</Btn>
                  <Btn type="submit" disabled={isSubmitting} primary>
                    SAVE
                  </Btn>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="flex p-8">
          <h2>Click a Button to start editing</h2>
        </div>
      )}
    </div>
  )
}
