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

const Home: NextPage = () => {
  const [itemName, setItemName] = useState<string>("");
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

  }, [itemName, partialQuery]);

  const insertOne = useCallback(() => {
    if (itemName === "") return;

    insertMutation.mutate({
      note: itemName,
    });

    setItemName("");
  }, [itemName, insertMutation]);

  const deleteOne = useCallback((noteId: number) => {
    if (list?.length) {
      deleteAllMutation.mutate({
        ids: [noteId],
      });
    }
  }, [list, deleteAllMutation]);

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
                <ListItem key={item.id} item={item} deleteNote={deleteOne}/>
              ))}
            </List>
          </CardContent>
          <CardForm
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            submit={insertOne}
          />
        </Card>
      </main>
    </>
  );
};

export default Home;
