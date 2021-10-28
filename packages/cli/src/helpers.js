import path from 'path'
import rc from 'recursive-copy'
import thr from 'through2'
import template from 'es6-template-strings'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const templatesDir = (extType) => path.join(__dirname, '..', 'templates', `extension-${extType}`)

const options = manifest => ({
	overwrite: true,
	dot: true,
  rename: function(path) {
    if(path.endsWith('src/__plugin__.js')) {
      return path.replace('__plugin__', manifest.ext_name)
    }
    return path
  },
  transform: function(src, dest, stats) {
		return thr(function(chunk, enc, done)  {
			done(null, template(chunk.toString(), manifest))
		})
	}
})

export const initExtension = (manifest, extFolder) => {
  const folder = extFolder ? path.join('./', extFolder) : './'
  rc(templatesDir(manifest.type), folder, options(manifest))
    /*
      copy.events.ERROR	function(error, ErrorInfo)
      copy.events.COMPLETE	function(Array<CopyOperation>)
      copy.events.CREATE_DIRECTORY_START	function(CopyOperation)
      copy.events.CREATE_DIRECTORY_ERROR	function(error, CopyOperation)
      copy.events.CREATE_DIRECTORY_COMPLETE	function(CopyOperation)
      copy.events.CREATE_SYMLINK_START	function(CopyOperation)
      copy.events.CREATE_SYMLINK_ERROR	function(error, CopyOperation)
      copy.events.CREATE_SYMLINK_COMPLETE	function(CopyOperation)
      copy.events.COPY_FILE_START	function(CopyOperation)
      copy.events.COPY_FILE_ERROR	function(error, CopyOperation)
      copy.events.COPY_FILE_COMPLETE	function(CopyOperation)
    */
    .on(rc.events.CREATE_DIRECTORY_START, function(copyOperation) {
      console.info('Generating directory...')
    })
    .on(rc.events.COPY_FILE_START, function(copyOperation) {
      console.info('Generating file...')
    })
    .on(rc.events.COPY_FILE_COMPLETE, function(copyOperation) {
      console.info('Copied to ' + copyOperation.dest)
    })
    .on(rc.events.ERROR, function(error, copyOperation) {
      console.error('Unable to copy ' + copyOperation.dest)
    })
    .on(rc.events.COMPLETE, function(copyOperations) {
      console.log('Generated:')
      console.log(copyOperations.map(op => ` - ${op.dest}`).join('\n'))
    })
    .then(function(results) {
      console.info(results.length + ' total operations')
      console.log('All good! Your extension is ready to dev.')
    })
    .catch(function(error) {
      return console.error('Copy failed: ' + error)
    })
}

export const buildManifest = answers => ({
  ...answers,
  github_repo: answers.author ? `https://github.com/${answers.author}/${answers.name}` : 'https://github.com/AUTHOR/${answers.name}',
})
