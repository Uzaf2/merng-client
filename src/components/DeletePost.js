import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function DeletePost({postId})
{
    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        variables: { postId: postId
        },
        update (proxy){
          const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
          const newData = data.getPosts.filter((p) => p.id !== postId);
          proxy.writeQuery({  query: FETCH_POSTS_QUERY, data: { getPosts: [...newData], }, });
        }
      });
    return (
        <Button size= "small"  color="white" startIcon={<DeleteIcon/>} variant="contained" onClick={deletePost} 
        >
        </Button>
    )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeletePost;