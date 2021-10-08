import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import db from "./../api/firebaseAPI";
import { useSelector } from "react-redux";

const Noob = ({ data }) => {
  const [marked, setMarked] = useState(false);
  const cUser = useSelector((state) => state.users.user);
  console.log("cuser22", cUser);

  useEffect(() => {
    console.log("cuser333", cUser);
    const fetchTest = async () => {
      console.log("cuser11", cUser);
      const userRef = db.collection("users").doc(cUser?.id);
      //   const fevourateRef = userRef.collection("favouritePosts");

      try {
        const fevCollection = userRef.collection("favouritePosts");
        try {
          const snapShots = await fevCollection.get();
          console.log("fvcollec", snapShots.docs);

          snapShots.docs.map((doc) => {
            console.log("doc-id", doc.id);

            setMarked(true);
          });
        } catch (error) {
          console.log("err", error);
        }
      } catch (error) {
        console.log("err>>", error);
      }
    };
    if (cUser) {
      fetchTest();
    }
    // setTimeout(() => {
    //   setMarked(true);
    // }, 2000);
  }, [data, cUser]);

  return (
    <Container>
      <div> {data}</div>
      <div>{marked ? "true" : "false"}</div>
    </Container>
  );
};

const Test = () => {
  const list = [1, 2];

  return (
    <div>
      {list.map((item) => (
        <Noob key={item} data={item} />
      ))}
    </div>
  );
};

export default Test;
