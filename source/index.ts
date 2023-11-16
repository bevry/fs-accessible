// as we are a low-level compatibility layer, do what is compatible with tree shaking
// [node >= 14] import { access } from 'node:fs/promises' // compatible with tree-shaking but breaks older versions
// [node < 14] import { promises } from 'fs'; const { access } = promises // breaks tree-shaking
import { access as _access } from 'fs'

/** Is the path visible to the calling process? */
export const F_OK = 0 // constants?.F_OK

/** Is the path readable to the calling process? */
export const R_OK = 4 // constants?.R_OK

/** Is the path writable to the calling process? */
export const W_OK = 2 // constants?.W_OK

/** Is the path executable to the calling process? */
export const X_OK = 1 // constants?.X_OK

/** Returns a Promise that rejects with an error if the path is not accessible. */
export function accessible(
	path: string | Array<string>,
	mode: number = F_OK
): Promise<void> {
	if (Array.isArray(path)) {
		return Promise.all(path.map((i) => accessible(i, mode))).then(() => {})
	}
	return new Promise((resolve, reject) => {
		_access(path, mode, (err) => {
			if (err) reject(err)
			else resolve()
		})
	})
}

/** Returns a Promise that resolves to a boolean indicating if the path is accessible or not. */
export function isAccessible(
	path: string | Array<string>,
	mode: number = F_OK
): Promise<boolean> {
	return accessible(path, mode)
		.then(() => true)
		.catch(() => false)
}
