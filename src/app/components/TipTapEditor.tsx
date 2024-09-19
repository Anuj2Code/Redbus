"use client"
import { Button } from "@/components/ui/button";
import { EditorContent, JSONContent, useEditor, type Editor } from "@tiptap/react"
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'

export const Menubar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) return null;

    return (
        <div className="flex flex-wrap gap-5 mt-5">
            <Button type="button"
                className="bg-zinc-400"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                variant={
                    editor.isActive("heading", { level: 1 }) ? "default" : "secondary"
                }
            >
                H1
            </Button>
            <Button
                type="button"
                className="bg-zinc-400"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                variant={
                    editor.isActive("heading", { level: 2 }) ? "default" : "secondary"
                }
            >
                H2
            </Button>
            <Button
                type="button"
                className="bg-zinc-400"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                variant={
                    editor.isActive("heading", { level: 3 }) ? "default" : "secondary"
                }
            >
                H3
            </Button>
            <Button
                type="button"
                className="bg-zinc-400"
                onClick={() => editor.chain().focus().toggleBold().run()}
                variant={editor.isActive("bold") ? "default" : "secondary"}
            >
                Bold
            </Button>
            <Button
                type="button"
                className="bg-zinc-400"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                variant={editor.isActive("italic") ? "default" : "secondary"}
            >
                Italic
            </Button>
            <Button
                type="button"
                className="bg-zinc-400"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                variant={editor.isActive("strike") ? "default" : "secondary"}
            >
                Strike
            </Button>
            <Button
                type="button"
                className="bg-zinc-400"
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                variant={editor.isActive("italic") ? "default" : "secondary"}
            >
                Highlight
            </Button>
            <Button
                type="button"
                className="bg-zinc-400"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                variant={editor.isActive("italic") ? "default" : "secondary"}
            >
                Bullet list
            </Button>
            <Button
                type="button"
                className="bg-zinc-400"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                variant={editor.isActive("italic") ? "default" : "secondary"}
            >
                Ordered list
            </Button>
            <Button
                type="button"
                className="bg-zinc-400"
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                variant={editor.isActive("italic") ? "default" : "secondary"}
            >
                Left
            </Button>
            <Button
                type="button"
                className="bg-zinc-400"
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                variant={editor.isActive("italic") ? "default" : "secondary"}
            >
                Center
            </Button>
            <Button
                type="button"
                className="bg-zinc-400"
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                variant={editor.isActive("italic") ? "default" : "secondary"}
            >
                Right
            </Button>
            <Button
                type="button"
                className="bg-zinc-400"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                variant={editor.isActive("italic") ? "default" : "secondary"}
            >
                Code block
            </Button>
        </div>
    )
}

export function TipTapEditor({setJson,json}:{setJson:any,json:JSONContent | null}) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight,
        ],
        content: json ?? "<p>Hello world</p>",
        editorProps: {
            attributes: {
                class: "prose",
            }
        },
        onUpdate:({editor})=>{
          const json = editor.getJSON();
          console.log(json,'143');
          setJson(json)
        },
        immediatelyRender: false,
    })
    return (
        <div className="">
            <Menubar editor={editor} />
            <EditorContent editor={editor} className="rounded-lg border p-2 min-h-[150px] mt-2 text-white" />
        </div>
    )
}