import {Editor, EditorState} from 'draft-js'
import { useState } from 'react'

const RichtextEditor = () => {
  const [editorState, setEditorState] = useState(()=> EditorState.createEmpty())
  return (
    <div>
      <Editor editorState={editorState} onChange={setEditorState}/>
    </div>
  )
} 

export default RichtextEditor
