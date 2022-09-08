import React, {useEffect, useState} from 'react';
import {addDoc,collection,serverTimestamp} from "firebase/firestore"
import {auth, db} from "../firebase-config";
import {Button, Form} from "react-bootstrap"
import {useNavigate} from "react-router-dom";
const CreatePost = ({user}) => {
    const [title,setTitle]=useState("")
    const [postText,setPostText]=useState("")
    const postsCollectionRef = collection(db , "posts")
    let navigate= useNavigate()
    const createPost = async ()=>{
        await addDoc(postsCollectionRef,
            {title,postText,
                timestamp:serverTimestamp(),
                author: {name: auth.currentUser.displayName,
                    id: auth.currentUser.uid}})
        navigate("/")
    }
    useEffect(()=>{
        if (!user){
            navigate("/login")
        }
    },[navigate,user])
    return (
        <div className="d-flex justify-content-center flex-column">
                <h1 className="align-self-center">Create A Post</h1>
                <Form.Group className="mb-3">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control placeholder="Title..." onChange={(e) => {
                        setTitle(e.target.value)
                    }}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Post:</Form.Label>
                    <Form.Control as="textarea" rows={8} placeholder="Post..." onChange={(e)=>{
                        setPostText(e.target.value)
                    }}/>
                </Form.Group>
                <Button variant="outline-success" onClick={createPost}>Submit Post</Button>
            </div>
    );
};

export default CreatePost;