import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import gmjml from 'gulp-mjml';
import babel from 'gulp-babel';
import gutil from 'gulp-util';
import gtap from 'gulp-tap';
import watch from 'gulp-watch';
import { exec } from 'child_process';

const SRC_PATH = 'src';
const COMPONENTS_SRC = SRC_PATH + '/components/**.jsx';
const TEMPLATES_SRC = SRC_PATH + '/templates/**.mjml';
const BUILD_PATH = 'build';
const COMPONENTS_DEST_PATH = `${ BUILD_PATH }/components`;
const TEMPLATES_DEST_PATH = `${ BUILD_PATH }/templates`;

const buildComponents = () => {
	let mjmlConf = {
		packages: []
	};

	return gulp.src(COMPONENTS_SRC)
		.pipe( babel() )
		.on('error', gutil.log)
		.pipe(
			gulp.dest(COMPONENTS_DEST_PATH)
		)
		.pipe(
			gtap(file => {
				mjmlConf.packages.push(
					`./${ COMPONENTS_DEST_PATH }/${ path.basename(file.path) }`
				);
			})
		)
		.on('end', () => {
			fs.writeFileSync('.mjmlconfig', `${ JSON.stringify(mjmlConf) }\n`, { encoding: 'utf8' });

			console.log('> Components were successfuly builded.');
			console.log(`> Check the result in "${ COMPONENTS_DEST_PATH }" directory.`);
		});
};

gulp.task('build-components', buildComponents);

const buildHTML = () =>
	gulp.src(TEMPLATES_SRC)
		// .pipe(gtap( file => { console.log('\n\n', file.path, '\n\n') } ))
		.pipe( gmjml() )
		.on('error', gutil.log)
		.pipe(
			gulp.dest(TEMPLATES_DEST_PATH)
		)
		.on('end', () => {
			console.log('> HTML files were successfuly created.');
			console.log(`> Check the result in "${ TEMPLATES_DEST_PATH }" directory.`);
		});

gulp.task('build-html', buildHTML);

const buildAll = () => {
	buildComponents();
	buildHTML();
};

gulp.task('watch', () => {
	buildAll();

	return watch([
		COMPONENTS_SRC,
		TEMPLATES_SRC
	], buildAll);
});
