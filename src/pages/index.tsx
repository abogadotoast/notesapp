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

  const { data: list, refetch } = trpc.useQuery(["findAll"]);
  const insertMutation = trpc.useMutation(["insertOne"], {
    onSuccess: () => refetch(),
  });
  const deleteAllMutation = trpc.useMutation(["deleteAll"], {
    onSuccess: () => refetch(),
  });
  const updateOneMutation = trpc.useMutation(["updateOne"], {
    onSuccess: () => refetch(),
  });

  const insertOne = useCallback(() => {
    if (itemName === "") return;

    insertMutation.mutate({
      note: itemName,
    });

    setItemName("");
  }, [itemName, insertMutation]);

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
        <meta name="description" content="Visit www.mosano.eu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Card>
          <CardContent>
            <CardHeader
              note="Note List"
              listLength={list?.length ?? 0}
              clearAllFn={clearAll}
            />
            <List>
              {list?.map((item) => (
                <ListItem key={item.id} item={item} />
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
