
export default class IntroService {
  constructor (ctx) {
    this.$axios = ctx.$axios
    this.$cancelQueue = {}
  }

  getIntros (page, cancelKey = 'get_intros') {
    return this.$axios({
      url: '/_api/intros/' + page,
      method: 'get',
      cancelKey: `${cancelKey}:${page}`
    })
  }
}
