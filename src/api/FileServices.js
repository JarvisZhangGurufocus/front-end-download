export default class FileService {
  constructor (ctx) {
    this.$axios = ctx.$axios
  }

  WorldMapJson (cancelKey = 'world_map_json') {
    return this.$axios({
      url: '/_api/files/world.json',
      method: 'get',
      cancelKey
    })
  }

  IndustryJson (cancelKey = 'industry_json') {
    return this.$axios({
      url: '/_api/files/industry.json',
      method: 'get',
      cancelKey
    })
  }

  getImages () {
    return this.$axios({
      url: '/_api/files/images',
      method: 'get'
    })
  }

  uploadImage (dataUrl) {
    const file = this.dataURLtoFile(dataUrl)
    const data = new FormData()
    data.append('file', file)

    return this.$axios({
      url: '/_api/files/images',
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: data,
      clearCache: '{/_api/files/images}'
    })
  }

  deleteImage (id) {
    return this.$axios({
      url: '/_api/files/images/' + id,
      method: 'delete',
      clearCache: '{/_api/files/images}'
    })
  }

  dataURLtoFile (dataurl, filename) {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n) {
      u8arr[n - 1] = bstr.charCodeAt(n - 1)
      n -= 1 // to make eslint happy
    }
    return new File([u8arr], filename, { type: mime })
  }
}
