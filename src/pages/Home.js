import React, { useEffect, useState } from "react";
import {getDocs, collection, deleteDoc,query, doc, orderBy} from "firebase/firestore";
import moment from "moment"
import { db } from "../firebase-config";
import {Card} from "react-bootstrap";
import {Button} from "react-bootstrap";

function Home({ user }) {
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");
    const  q= query(postsCollectionRef,orderBy("timestamp","desc"))

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(q);
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getPosts().then(r => r);
    }, [q]);

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
    };
    return (
        <div className="homePage">
            {postLists.map((post,index) => {
                return (
                    <Card className="d-flex" key={index}>
                        <Card.Body className="d-flex flex-column">
                            <Card.Title className="d-flex justify-content-between align-items-baseline mb-2">
                           <span className="fs-2">{post.title}</span>
                                {user && post.author.id === user.id &&
                                                 <Button
                                                     onClick={() =>
                                                         deletePost(post.id)
                                                     }
                                                 >
                                                    &#128465;
                                           </Button>
                                }
                             </Card.Title>
                             <Card.Text className="ml-4">
                                 {post.postText}
                             </Card.Text>
                             <Card.Subtitle className="d-flex justify-content-between align-items-baseline mb-2">
                                 <h4 className="fs-2">@{post.author.name}</h4>
                                 <h4>{moment(post.timestamp.toDate()).calendar()}</h4>
                             </Card.Subtitle>


                         </Card.Body>
                     </Card>

                 );
            })}

        </div>
    );
}

export default Home;