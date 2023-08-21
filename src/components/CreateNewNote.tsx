import React, { memo, useCallback, useState } from "react";
import type { NextPage } from "next";
import { NoteList } from "@prisma/client";

import {
    CardForm
  } from "../components/Card";

  interface CreateNoteProps {
    insertNote: (note: string) => void;
  }

const CreateNoteComponent: NextPage<CreateNoteProps> = ({ insertNote }) => {
 const [note, setNote] = useState<string>("");
 const handleInsert = ( insertNote : (note: string) => void ) =>  {
    if (note === "") return;
    insertNote(note);
    setNote("");
 };

 return (
            <CardForm
            value={note}
            onChange={(e) => setNote(e.target.value)}
            submit={() => handleInsert(insertNote)}
          />
  );
};

export const CreateNewNote = memo(CreateNoteComponent);