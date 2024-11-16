import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useEffect, useRef } from 'react';

interface props {
    response:string;
    setResponse: React.Dispatch<React.SetStateAction<string>>;
}
export default function Outputsection({response,setResponse}:props) {
    const editorRef:any = useRef()

    useEffect(()=>{
       const editor = editorRef.current.getInstance();
       editor.setMarkdown(response)
    },[response])
    return (
        <div className='bg-white overflow-hidden'>
        <div>
           <Editor
                ref={editorRef}
                initialValue="Your response will show here"
                previewStyle="vertical"
                height="700px"
                padding="4px"
                initialEditType="markdown"
                useCommandShortcut={true}
                onChange={() => {
                    const markdown = editorRef.current?.getInstance().getMarkdown();
                    if (markdown !== undefined) {
                        setResponse(markdown);
                    }
                }}
            />
        </div>
        </div>
    )
}