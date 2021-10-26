import prompts from 'prompts'
import semver from 'semver'
import { buildManifest, initExtension } from './helpers'

const init = async (inputs) => {
  let extType, extName
  const namePrefix = () => `deckpad-${extType}-`
  const questions = [
    {
      type: 'select',
      name: 'type',
      message: '🧑‍💻 Select the extension\'s type',
      choices: [
        { title: 'Plugin', description: 'This option has a description.', value: 'plugin' },
        { title: 'Theme', value: 'theme', disabled: true },
        { title: 'Icon Bundle', value: 'icons', disabled: true },
      ]
    },
    {
      type: prev => {
        extType = prev
        return 'text'
      },
      name: 'name',
      message: `🧰 name for your extension:`,
      initial: prev => `deckpad-${prev}-`,
      validate: val => Boolean(val),
    },
    {
      type: 'text',
      name: 'description',
      message: `🧰 Write a description:`,
      initial: '',
    },
    {
      type: 'text',
      name: 'version',
      message: 'Insert starting version:',
      initial: '1.0.0',
      format: v => semver.clean(v),
      validate: val => Boolean(semver.valid(val)),
    },
    {
      type: 'text',
      name: 'email',
      message: 'Insert email to use in package.json:',
      initial: '',
    },
    {
      type: 'text',
      name: 'author',
      message: 'Insert author\'s name (or nickname) to use in package.json:',
      initial: '',
    },
    {
      type: val => Boolean(val) ? 'text' : null,
      name: 'github_user',
      message: 'Insert github username:',
      initial: '',
    },
    {
      type: val => Boolean(val) ? 'text' : null,
      name: 'github_repo',
      message: 'Insert github repo name:',
      initial: inputs[0] || '',
    },
    {
      type: 'select',
      name: 'license',
      message: 'Choose a license:',
      choices: [
        { title: 'none', value: '' },
        { title: 'MIT', value: 'MIT' },
        { title: 'ISC', value: 'ISC' },
        { title: 'APACHE', value: 'APACHE' },
      ]
    },
    // {
    //   type: 'toggle',
    //   name: 'confirmed',
    //   active: 'yes',
    //   inactive: 'no',
    //   message: (p, values) => {
    //     console.log(values)
    //     return 'Can you confirm?'
    //   }
    // }
  ]

  const answers = await prompts(questions)
  const folder = inputs[0] || null
  initExtension(buildManifest(answers), folder)
}
export default init