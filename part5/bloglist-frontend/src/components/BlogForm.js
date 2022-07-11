const BlogForm = (props) => {

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={props.addBlog}>
        <div>Title: <input value={props.newTitle} onChange={props.handleTitleChange} /></div>
        <div>Author: <input value={props.newAuthor} onChange={props.handleAuthorChange} /></div>
        <div>Url: <input value={props.newUrl} onChange={props.handleUrlChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
    </div>
  )
}

export default BlogForm
