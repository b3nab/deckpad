import prompts from 'prompts'
import semver from 'semver'
import { buildManifest, initExtension } from './helpers'

const init = async (inputs) => {
  const folder = inputs[0] || null
  let extType, extName
  const namePrefix = (prev, values) => `@deckpad/${values.type}-${values.ext_name}`
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
      type: prev => prev == 'plugin' ? 'text' : null,
      name: 'ext_name',
      message: '🧑‍💻 name for your plugin fn:',
      validate: val => Boolean(val),
    },
    {
      type: prev => {
        extType = prev
        return 'text'
      },
      name: 'package_name',
      message: `🧰 name for your extension (for npm package.json):`,
      initial: namePrefix,
      validate: val => Boolean(val),
    },
    {
      type: 'text',
      name: 'description',
      message: `🧰 Write a description (for npm package.json):`,
      initial: '',
    },
    {
      type: 'text',
      name: 'version',
      message: 'Insert starting version:',
      initial: '0.0.1',
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
      type: 'text',
      name: 'github_user',
      message: 'Insert github username:',
      initial: prev => prev || '',
    },
    {
      type: 'text',
      name: 'github_repo',
      message: 'Insert github repo name:',
      initial: inputs[0] || '',
    },
    {
      type: 'select',
      name: 'license',
      message: 'Choose a license:',
      choices: [
        { title: 'MIT', value: 'MIT' },
        { title: 'ISC', value: 'ISC' },
        { title: 'APACHE', value: 'APACHE' },
        { title: 'none', value: '' },
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
  const validAnswers = [
    'type',
    'package_name',
    'description',
    'version',
    'email',
    'author',
    'github_user',
    'license'
  ].reduce((res, k) => res && answers.hasOwnProperty(k), true)

  validAnswers && initExtension(buildManifest(answers), folder)
}
export default init