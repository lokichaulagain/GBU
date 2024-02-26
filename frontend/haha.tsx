"use client";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

export default function Haha() {
  // Creates a new editor instance.
  const editor: BlockNoteEditor = useBlockNote({});

//   //   Executes a callback whenever the editor contents change.
//   editor.onContentChange(() => {
//     // Get and log all top-level, i.e. non-nested blocks in the editor.
//     const blocks = editor.topLevelBlocks;
//     console.log("Content was changed:", blocks);
//   });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={"light"}
      />
    </div>
  );
}
