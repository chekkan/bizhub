import rename from "gulp-rename"
import { CLIOptions } from "aurelia-cli"
import gulp from "gulp"
import fs from "fs"
import through from "through2"
import project from "../aurelia.json"

function configureEnvironment() {
    const env = CLIOptions.getEnvironment()

    return gulp.src(`aurelia_project/environments/${env}${project.transpiler.fileExtension}`)
    .pipe(rename(`environment${project.transpiler.fileExtension}`))
    .pipe(gulp.dest(project.paths.root))
    .pipe(through.obj((file, enc, cb) => {
      // https://github.com/webpack/watchpack/issues/25#issuecomment-287789288
        const now = Date.now() / 1000
        const then = now - 10
        fs.utimes(file.path, then, then, (err) => { if (err) throw err })
        cb(null, file)
    }))
}

export default configureEnvironment
