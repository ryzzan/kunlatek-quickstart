export async function fileListToBase64(fileList: any[]) {
    // create function which return resolved promise
    // with data:base64 string
    function getBase64(file: File) {
        const reader = new FileReader()
        return new Promise(resolve => {
            reader.onload = ev => {
                resolve(ev!.target!.result)
            }
            reader.readAsDataURL(file)
        })
    }
    // here will be array of promisified functions
    const promises = []

    // loop through fileList with for loop
    for (let i = 0; i < fileList.length; i++) {
        promises.push(getBase64(fileList[i]))
    }

    // array with base64 strings
    return await Promise.all(promises)
}