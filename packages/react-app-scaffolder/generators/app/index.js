const Generator = require('yeoman-generator')
const { promisify } = require('util')
const process = require('process')
const exec = promisify(require('child_process').exec)
const spawn = require('child_process').spawn
const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const mergePackageJson = require('merge-package-json')
const yosay = require('yosay')

module.exports = class extends Generator {
  _installAndExport() {
    return new Promise(async (resolve, reject) => {
      const { isFoundation } = this.answers

      this.log(yosay('Installing dependencies... this may take a minute!'))

      if (!isFoundation) {
        await exec(`yarn`)
      }

      const prettierConfigPath = path.resolve(__dirname, '../../../../.prettierrc.js')
      await exec(`yarn prettier --write ./package.json`)
      await exec(`yarn prettier '**/*.ts' '**/*.tsx' --write`)
      this.log(yosay('App installed successfully!'))

      this._pushToGithub()

      this.log(
        yosay(`
          Compiling your app now - server shortly available at http://localhost:8080
        `),
      )

      spawn('yarn', ['start:dev'], { maxBuffer: 1024 * 2048 })
        .stdout.on('data', data => this.log(data.toString()))
        .on('error', err => {
          this.log(err)
          reject(err)
        })
    })
  }

  async _pushToGithub() {
    const { repo, githubPush, name } = this.answers
    if (repo && githubPush) {
      this.log(yosay('Pushing your app to Github...'))

      await exec(`git init`)
      await exec(`git remote add origin ${repo}`)

      await exec(`git add . && git commit -m "Project . - Initial commit" && git push origin master`)

      this.log(yosay('Successfully pushed app to Github!'))
    }
    return true
  }

  _mergePackageJson(additionalPackages) {
    const current = this.destinationPath(`./package.json`)
    const dst = fs.readFileSync(current)
    const src = fs.readFileSync(this.templatePath(additionalPackages))

    const output = mergePackageJson(dst, src)
    fs.writeFileSync(current, output)
  }

  _addWebpack() {
    const { stylesSolution, name, isFoundation } = this.answers

    if (isFoundation) {
      return
    }

<<<<<<< HEAD
    if (stylesSolution === 'sass') {
      this.fs.copy(this.templatePath('sass/_webpack-dev.sass.js'), this.destinationPath('./src/scripts/webpack-dev.js'))
=======
    if (sass) {
>>>>>>> update
      this.fs.copy(
        this.templatePath('base-is-sass'),
        this.destinationPath(),
      )
    } else {
      this.fs.copy(
        this.templatePath('base-is-not-sass'),
        this.destinationPath(),
      )
    }
  }

  _addStyleSolution() {
    const { stylesSolution, name, isFoundation } = this.answers

    /**
     * use styled components
     */
    if (stylesSolution === 'styledComponents') {
      if (!isFoundation) {
        this._mergePackageJson('styled-components/_package.styled-components.json')
      }
      this.fs.copy(this.templatePath('styled-components/**/src/**/*'), this.destinationPath())
    }
    /**
     * use scss Copy base styles
     */
    if (stylesSolution === 'sass') {
      if (!isFoundation) {
        this._mergePackageJson('sass/_package.sass.json')
      }

      this.fs.copy(
        this.templatePath('sass/_purgecss-loader.js'),
        this.destinationPath(`./src/scripts/purgecss-loader.js`),
      )
      this.fs.copy(
        this.templatePath('sass/_purgecss-loader.js'),
        this.destinationPath(`./src/scripts/purgecss-loader.js`),
      )
      this.fs.copy(this.templatePath('./css'), this.destinationPath('./src/'))
    }

    /**
     * interpolate by styling solution
     * pages that need a different styled-components version
     */
    ;['login'].forEach(page => {
      this.log({
        message: 'loop file',
        file: page,
      })
      /**
       * Delete the file to be interpolated
       * Else we will get a conflict message which is annoying
       */
      this.fs.delete(this.destinationPath(`/src/components/pages/${page}.tsx`))

      this.fs.copyTpl(
        this.templatePath(`${this.projectTypePath}/src/components/pages/${page}.tsx`),
        this.destinationPath(`./src/components/pages/${page}.tsx`),
        { stylesSolution, name },
      )
    })
  }

  _addAzure() {
    const { name, azure } = this.answers
    if (azure) {
      this.fs.copy(this.templatePath('redu'), this.destinationPath(`./azure-pipelines.yml`))
    }
  }

  _addRedux() {
    const { name, redux, isFoundation } = this.answers
    if (redux && isFoundation) {
      this._mergePackageJson('redux/_package.redux.json')
    }
  }

  constructor(args, opts) {
    super(args, opts)
    this.log(yosay('Welcome to Reapit App Scaffolder!'))
  }

  async writeBaseFiles() {
    return new Promise((resolve, reject) => {
<<<<<<< HEAD
      const { name, repo, description, author, isFoundation, stylesSolution } = this.answers
      const { redux, graphql, noRedux } = this
      const configFiles = ['jest.config.js']
=======
      const { name, repo, description, author, isFoundation, styledComponents } = this.answers
      const { redux, graphql } = this
>>>>>>> update

      /**
       * settings destination path
       * for non isFoundation: it will be the folder where the scaffolder is executed
       * for isFoundation: we have to deter
       */

      this.fs.copyTpl(this.templatePath('_README.md'), this.destinationPath('./README.md'), {
        name,
      })

      this.fs.copyTpl(this.templatePath('./base'), this.destinationPath('./'), {
        name,
        redux,
        graphql,
        styledComponents,
      })

      if (isFoundation) {
        // Any any additional base files specialized for non-foundation project will need to uncomment this like
        // Select recursively dot files
        // glob isn't really smart at the moment. In the future, when need to add non dot files, uncomment this
        // this.fs.copyTpl(this.templatePath('./base-is-foundation/**/.*'), this.destinationPath('./'), {
        //   name,
        //   repo,
        //   description,
        //   author,
        // })
        this.fs.copyTpl(this.templatePath('./base-is-foundation/*'), this.destinationPath('./'), {
          name,
          repo,
          description,
          author,
        })
      } else {
        this.fs.copyTpl(this.templatePath('./base-is-not-foundation/**/.*'), this.destinationPath('./'), {
          name,
          repo,
          description,
          author,
        })
        this.fs.copyTpl(this.templatePath('./base-is-not-foundation/**/*'), this.destinationPath('./'), {
          name,
          repo,
          description,
          author,
        })
      }

<<<<<<< HEAD
      this.log({
        name,
        redux,
<<<<<<< HEAD
        noRedux,
        graphql,
        stylesSolution: stylesSolution === 'sass' ? 'Sass/CSS' : 'Styled Components',
=======
        graphql,
        styledComponents,
>>>>>>> temp
      })
=======
>>>>>>> update
      this.fs.copyTpl(this.templatePath(this.projectTypePath), this.destinationPath('./'), {
        name,
        redux,
<<<<<<< HEAD
        noRedux,
        graphql,
        stylesSolution,
=======
        graphql,
        styledComponents,
>>>>>>> temp
      })

<<<<<<< HEAD
      this.fs.copyTpl(this.templatePath('./index.tsx'), this.destinationPath('./src/core/index.tsx'), {
        redux,
<<<<<<< HEAD
        noRedux,
        graphql,
        stylesSolution,
=======
        graphql,
        styledComponents,
>>>>>>> temp
      })

=======
>>>>>>> update
      this.fs.commit([], () => {
        this._addWebpack()
        this._addStyleSolution()
<<<<<<< HEAD
=======
        this._addSass()
>>>>>>> temp
        this._addAzure()
        this._addRedux()
        this.fs.commit([], () => {
          this._installAndExport()
            .then(resolve)
            .catch(reject)
        })
      })
    })
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter your React app name (kebab-case)',
        default: 'app-name',
      },
      {
        type: 'input',
        name: 'repo',
        message: 'Enter the GitHub repo for your project',
        default: 'git@github.com:reapit/app-name.git',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter a description for the project',
        default: 'Description',
      },
      {
        type: 'input',
        name: 'author',
        message: 'Enter the author of the project',
        default: 'Author',
      },
      {
        type: 'confirm',
        name: 'isFoundation',
        message: 'Is this project for internal use (mono-repo)',
        default: true,
      },
      {
<<<<<<< HEAD
        type: 'list',
        name: 'stylesSolution',
        message: 'Pick project styles solution',
        choices: ['Styled Components', 'Sass/CSS'],
=======
        type: 'confirm',
        name: 'styledComponents',
        message: 'Would you like Styled Components?',
>>>>>>> temp
      },
      {
        type: 'list',
        name: 'stateManagementStyle',
        message: 'Pick project type',
        choices: ['Redux', 'No Redux', 'Apollo GraphQL'],
      },
      {
        type: 'list',
        name: 'stateManagementStyle',
        message: 'Pick project type',
        choices: ['Redux', 'No Redux', 'Apollo GraphQL'],
      },
      {
        type: 'confirm',
        name: 'azure',
        message: 'Would you like an Azure Pipeline?',
        default: false,
      },
      {
        type: 'confirm',
        name: 'githubPush',
        message: 'Would you like your app immediately pushed to Github remote?',
        default: false,
      },
    ])

<<<<<<< HEAD
    const { stateManagementStyle, stylesSolution } = this.answers
=======
    const { stateManagementStyle } = this.answers
>>>>>>> temp
    if (stateManagementStyle === 'Redux') {
      this.projectTypePath = 'redux'
      this.redux = true
    }

    if (stateManagementStyle === 'No Redux') {
      this.projectTypePath = 'no-redux'
<<<<<<< HEAD
      this.noRedux = true
=======
>>>>>>> temp
    }

    if (stateManagementStyle === 'Apollo GraphQL') {
      this.projectTypePath = 'apollo'
      this.graphql = true
    }

<<<<<<< HEAD
    if (stylesSolution === 'Styled Components') {
      this.answers.stylesSolution = 'styledComponents'
    }

    if (stylesSolution === 'Sass/CSS') {
      this.answers.stylesSolution = 'sass'
    }

=======
>>>>>>> temp
    /**
     * Destination path
     * isFoundation ->./package/{appName}
     * else current path
     */
    if (this.answers.isFoundation) {
      this.packagePath = path.resolve(__dirname, `../../../${this.answers.name}`)
      /**
       * create directory if not
       */
      if (!fs.existsSync(this.packagePath)) {
        fs.mkdirSync(this.packagePath)
      }
      /**
       * change destination path, cwd to package path
       */
      process.chdir(this.packagePath)
      this.destinationRoot(this.packagePath)
    }
  }
}
