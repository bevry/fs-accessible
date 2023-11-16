import { equal } from 'assert-helpers'
import kava from 'kava'

import { accessible, isAccessible, F_OK, R_OK, W_OK, X_OK } from './index.js'

const file = 'README.md'
const dir = '.'

kava.suite('@bevry/fs-access', function (suite, test) {
	test('boolean works as expected', function (done) {
		;(async function () {
			equal(await isAccessible(file, F_OK), true, 'file exists')
			equal(await isAccessible(file, R_OK), true, 'file is readable')
			equal(await isAccessible(file, W_OK), true, 'file is writable')
			equal(await isAccessible(file, X_OK), false, 'file is not executable')
			equal(await isAccessible(dir, X_OK), true, 'dir is executable')

			equal(
				await isAccessible(file + 'missing', F_OK),
				false,
				'missing file does not exist'
			)
			equal(
				await isAccessible(file + 'missing', R_OK),
				false,
				'missing file is not readable'
			)
			equal(
				await isAccessible(file + 'missing', W_OK),
				false,
				'missing file is not writable'
			)
			equal(
				await isAccessible(file + 'missing', X_OK),
				false,
				'missing file is not executable'
			)
		})()
			.then(() => done())
			.catch((err: any) => done(err))
	})
	test('throw works as expected (part 1)', function (done) {
		;(async function () {
			await accessible(file, F_OK)
			await accessible(file, R_OK)
			await accessible(file, W_OK)
			await accessible(dir, X_OK)
		})()
			.then(() => done())
			.catch((err: any) => done(err))
	})
	test('throw works as expected (part 2)', function (done) {
		;(async function () {
			await accessible(file, X_OK)
		})()
			.then(() => done(new Error('failed to fail')))
			.catch(() => done())
	})
})
