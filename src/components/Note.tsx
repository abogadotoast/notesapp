import React, { memo, useCallback, useState } from "react";
import type { NextPage } from "next";
import { NoteList } from "@prisma/client";
import { trpc } from "@/utils/trpc";

interface NoteProps {
  item: NoteList;
  onUpdate?: (item: NoteList) => void;
  editNote: (id: number, note: string) => void;
  deleteNote: (noteId: number) => void;
}

const NoteComponent: NextPage<NoteProps> = ({ item, editNote, deleteNote }) => {
    const handleEdit = (inputValue: string, item : NoteList, editNote : (id: number, note: string) => void) => {
        item.note = inputValue;
        // change the item note
        editNote(item.id, item.note);
    }
    const handleDelete = async (item : NoteList, deleteNote: any  ) =>  {
      deleteNote(item.id);
    }
  return (
    <div className="h-12 border-b flex items-center justify-start px-3">
                <input
          className="w-full py-4 pl-3 pr-16 text-sm rounded-lg"
          type="text"
          placeholder="Add a note :)..."
          onChange={(e) => handleEdit(e.target.value, item, editNote)}
          value={item.note}
        />
              <button
          className="absolute p-2 text-white bg-red-600 rounded-full right-4"
          type="button"
          onClick={() => handleDelete(item, deleteNote)}
        >
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
    </div>
  );
};

export const NoteItem = memo(NoteComponent);