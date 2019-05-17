
export default class NoteService {
  constructor (ctx) {
    this.$axios = ctx.$axios
  }

  // note
  getNotes (params) {
    return this.$axios({
      url: '/_api/notes',
      method: 'get',
      params: params
    })
  }

  createNote (note) {
    return this.$axios({
      url: '/_api/notes',
      method: 'post',
      data: note,
      clearCache: '{/_api/notes}'
    })
  }

  updateNote (note) {
    return this.$axios({
      url: '/_api/notes/' + note.id,
      method: 'put',
      data: note,
      clearCache: '{/_api/notes}'
    })
  }

  deleteNote (id) {
    return this.$axios({
      url: '/_api/notes/' + id,
      method: 'delete',
      clearCache: '{/_api/notes}'
    })
  }

  // noteable
  updateNoteable (data) {
    return this.$axios({
      url: '/_api/notes/noteable',
      method: 'put',
      data: data,
      clearCache: '/_api/notes/noteable'
    })
  }

  getNoteable (type, id) {
    return this.$axios({
      url: '/_api/notes/noteable',
      method: 'get',
      params: {
        id: id,
        noteable_type: type
      }
    })
  }

  // Tag
  searchTags (q, cancelKey = 'search_tag') {
    return this.$axios({
      url: '/_api/note_tags',
      method: 'get',
      params: { q: q },
      cancelKey
    })
  }

  attachNoteTags (noteId, tags, cancelKey = 'attach_note_tags') {
    return this.$axios({
      url: '/_api/notes/' + noteId + '/tags',
      method: 'put',
      params: { tags: tags },
      cancelKey: `${cancelKey}:${noteId}`
    })
  }

  detachNoteTags (noteId, tagId, cancelKey = 'detach_note_tags') {
    return this.$axios({
      url: '/_api/notes/' + noteId + '/tags/' + tagId + '/',
      method: 'delete',
      cancelKey: `${cancelKey}:${noteId}:${tagId}`
    })
  }

  createNoteTag (name, noteID, cancelKey = 'create_note_tag') {
    return this.$axios({
      url: '/_api/note_tags',
      method: 'post',
      data: { name: name, note_id: noteID },
      cancelKey: `${cancelKey}:${noteID}:${name}`,
      clearCache: '{/_api/note_tags}'
    })
  }

  deleteNoteTag (id, cancelKey = 'delete_note_tag') {
    return this.$axios({
      url: '/_api/note_tags/' + id,
      method: 'delete',
      cancelKey: `${cancelKey}:${id}`,
      clearCache: '{/_api/note_tags}'
    })
  }
}
