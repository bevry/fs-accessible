import { equal } from 'assert-helpers'
import kava from 'kava'

import { accessible, isAccessible, F_OK, R_OK, W_OK, X_OK } from './index.js'

const file = 'README.md'
const dir = '.'

kava.suite('@bevry/fs-access', function (suite, test) {
	test('boolean works as expected', function (done) {
		;(async function () {
			equal(await isAccessible(file), true, 'file is accessible via default')
			equal(await isAccessible(file, F_OK), true, 'file is accessible')
			equal(await isAccessible(file, R_OK), true, 'file is readable')
			equal(await isAccessible(file, W_OK), true, 'file is writable')
			equal(await isAccessible(file, X_OK), false, 'file is not executable')
			equal(await isAccessible(dir), true, 'dir is accessible via default')
			equal(await isAccessible(dir, F_OK), true, 'dir is accessible')
			equal(await isAccessible(dir, R_OK), true, 'dir is readable')
			equal(await isAccessible(dir, W_OK), true, 'dir is writable')
			equal(await isAccessible(dir, X_OK), true, 'dir is executable')

			equal(
				await isAccessible([file, dir]),
				true,
				'file and dir are both accessible via default'
			)
			equal(
				await isAccessible([file, dir], F_OK),
				true,
				'file and dir are both accessible'
			)
			equal(
				await isAccessible([file, dir], R_OK),
				true,
				'file and dir are both readable'
			)
			equal(
				await isAccessible([file, dir], W_OK),
				true,
				'file and dir are both writable'
			)
			equal(
				await isAccessible([file, dir], X_OK),
				false,
				'file and dir are not both executable'
			)

			equal(
				await isAccessible('missing'),
				false,
				'missing is not accessible via default'
			)
			equal(
				await isAccessible('missing', F_OK),
				false,
				'missing is not accessible'
			)
			equal(
				await isAccessible('missing', R_OK),
				false,
				'missing is not readable'
			)
			equal(
				await isAccessible('missing', W_OK),
				false,
				'missing is not writable'
			)
			equal(
				await isAccessible('missing', X_OK),
				false,
				'missing is not executable'
			)
		})()
			.then(() => done())
			.catch((err: any) => done(err))
	})
	test('throw works as expected (part 1)', function (done) {
		;(async function () {
			await accessible(file)
			await accessible(file, F_OK)
			await accessible(file, R_OK)
			await accessible(file, W_OK)
			await accessible(dir)
			await accessible(dir, F_OK)
			await accessible(dir, R_OK)
			await accessible(dir, W_OK)
			await accessible(dir, X_OK)
			await accessible([file, dir])
			await accessible([file, dir], F_OK)
			await accessible([file, dir], R_OK)
			await accessible([file, dir], W_OK)
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
	test('throw works as expected (part 3)', function (done) {
		;(async function () {
			await accessible([file, dir], X_OK)
		})()
			.then(() => done(new Error('failed to fail')))
			.catch(() => done())
	})
})
