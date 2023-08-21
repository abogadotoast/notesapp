import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";
import { trpc } from "@/utils/trpc";

import {
  Card,
  CardContent,
  CardForm,
  CardHeader,
  List,
  ListItem,
} from "../components/Card";

import {
  NoteItem
} from "../components/Note";
import {
  CreateNewNote
} from "../components/CreateNewNote"
const Home: NextPage = () => {
  const [searchStr, setSearchStr] = useState<string>("");

  const partialQuery : any = trpc.useQuery(["findAllMatching", {searchStr}], {
    onSuccess: () => refetch(),
  });

  const { refetch, data: list } = partialQuery;

  const insertMutation = trpc.useMutation(["insertOne"], {
    onSuccess: () => refetch(),
  });
  const deleteAllMutation = trpc.useMutation(["deleteAll"], {
    onSuccess: () => refetch(),
  });
  const updateOneMutation = trpc.useMutation(["updateOne"], {
    onSuccess: () => refetch(),
  });

  const searchForNote = useCallback((searchStr : string) => {
    setSearchStr(searchStr);

  }, [searchStr, partialQuery]);

  const insertOne = useCallback((note : string) => {
    insertMutation.mutate({
      note: note,
    });
  }, [list, insertMutation]);

  const deleteOne = useCallback((noteId: number) => {
    if (list?.length) {
      deleteAllMutation.mutate({
        ids: [noteId],
      });
    }
  }, [list, deleteAllMutation]);

  const editOne = useCallback((id: number, note: string) => {
    if (id) {
      updateOneMutation.mutate({
        note,
        id
      });
    }
  }, [list, updateOneMutation]);

  const clearAll = useCallback(() => {
    if (list?.length) {
      deleteAllMutation.mutate({
        ids: list.map((item) => item.id),
      });
    }
  }, [list, deleteAllMutation]);

  return (
    <>

      <Head>
        <title>Note List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Card>
          <CardContent>
            <CardHeader
              note="Note List"
              listLength={list?.length ?? 0}
              clearAllFn={clearAll}
              value={searchStr}
              onChange={(e) => searchForNote(e.target.value)}
            />
            <List>
              {list?.map((item) => (
                <NoteItem key={item.id} item={item} editNote={editOne} deleteNote={deleteOne} />
                //<ListItem key={item.id} item={item} deleteNote={deleteOne}/>
              ))}
            </List>
          </CardContent>
          <CreateNewNote insertNote={insertOne}></CreateNewNote>
        </Card>
      </main>
    </>
  );
};

export default Home;
