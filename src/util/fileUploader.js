module.exports = {
	fileUploader(file, location, filename) {
		let ext = file.name.split('.').pop()
		ext = '.' + ext.toLowerCase()
		const filePath = location + Date.now() + '_' + filename + ext
		file.mv(filePath)
		return filePath
	},
	validateFile(file, maxSize, fileType) {
		if (!file) {
			return ({ error: 'No File Uploaded' })
		}
		if (file.size > maxSize) {
			return ({ error: 'File is too large' })
		}
		let ext = file.name.split('.').pop()
		ext = ext.toLowerCase()
		console.log(ext);
		console.log(fileType);
		if (ext != fileType) {
			return ({ error: 'File type is not supported' })
		}
	}
}